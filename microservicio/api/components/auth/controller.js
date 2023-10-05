const jwt = require("../../../auth/index")

const TABLA = "auth"
module.exports = function (injectedStore){
    let store = injectedStore;
    if(!store){
        store = require('../../../store/dummy');
    }

    async function upsert(data){
        const authData = {
            id: data.id
        }
        if(data.username){
            authData.username = data.username;
        }
        if(data.password){
            authData.password = data.password;
        }

        return store.upsert(TABLA, authData);
    }

    async function login(username, password){
        const data = await store.query(TABLA, {username: username});
        if(data.password == password){
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