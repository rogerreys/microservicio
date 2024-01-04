const auth = require(".");
const jwt = require("../../../auth/index")
var bcrypt = require('bcryptjs');

const TABLA = "auth"
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/mysql');
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            const salt = await bcrypt.genSalt(5);
            const secPass = await bcrypt.hash(data.password, salt);
            authData.password = secPass;
            // bcrypt.genSalt(5, (err, salt) => {
            //     bcrypt.hash(data.password, salt, function (err, hash) {
            //             authData.password = hash
            //     });
            // });
        }
        return store.upsert(TABLA, authData);
    }

    function login(username, password) {
        return new Promise((resolve, reject) => {
            store.get(TABLA, { username: username }).then((result) => {
                if (bcrypt.compareSync(password, result[0].password)) {
                    // Generate token
                    token = jwt.sign({ "id": result[0].id, "username": result[0].username, "password": result[0].password })
                    resolve(token)
                }
            }).catch((err) => {
                return reject(err)
            });
        })
    }
    return {
        upsert,
        login
    }
}