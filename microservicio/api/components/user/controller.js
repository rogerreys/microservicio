const auth = require('../auth');

// const store = require("../../../store/dummy");
let nanoid;
import('nanoid').then(module => {
    nanoid = module.nanoid;
    // el resto de tu código donde necesitas nanoid
}).catch(error => {
    console.error("Error al cargar nanoid:", error);
});

const TABLA = 'user';

module.exports = function (injectedStore) {
    const store = injectedStore;

    if (!store) {
        store = require("../../../store/dummy");
    }

    function list() {
        return store.list(TABLA);
    }
    function get(id) {
        return store.get(TABLA, id)
    }
    async function upsert(body) {
        const data = {
            name: body.name,
            nickname: body.username
        }
        data.id = (body.id) ? body.id : nanoid();
        if (body.password || body.username) {
            await auth.upsert({
                id: data.id,
                username: body.username,
                password: body.password
            })
        }
        return store.upsert(TABLA, data)
    }
    function remove(id) {
        return store.remove(TABLA, id)
    }
    function update(data) {
        return store.update(TABLA, data)
    }
    function follow(from, to) {
        return store.insert(TABLA + "_follow", {
            user_from: from,
            user_to: to
        })
    }
    function get_follows(from) {
        join = {}
        join[TABLA] = { "user_to" : from }

        result = store.get(TABLA + "_follow", {
            user_from: from
        }, join)
        return result
    }

    return {
        list,
        get,
        upsert,
        remove,
        update,
        follow,
        get_follows
    }
}