const auth = require(".");
const jwt = require("../../../auth/index")
var bcrypt = require('bcryptjs');

const TABLA = "auth"
module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    async function upsert(data) {
        const authData = {
            id: data.id
        }
        if (data.username) {
            authData.username = data.username;
        }
        if (data.password) {
            bcrypt.genSalt(5, (err, salt) => {
                bcrypt.hash(data.password, salt, (err, hash) => {
                    authData.password = hash
                });
            });
        }

        return store.upsert(TABLA, authData);
    }

    async function login(username, password) {
        const data = await store.query(TABLA, { username: username });
        if (bcrypt.compareSync(password, data.password)) {
            // Generate token
            return jwt.sign(data)
        }
        // return data
    }
    return {
        upsert,
        login
    }
}