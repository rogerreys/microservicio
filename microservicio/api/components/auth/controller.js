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

    async function login(username, password) {
        const data = await store.get(TABLA, { username: username });

        if (bcrypt.compareSync(password, data[0].password)) {
            // Generate token
            return jwt.sign({ "id": data[0].id, "username": data[0].username, "password": data[0].password })
        }
        // return data
    }
    return {
        upsert,
        login
    }
}