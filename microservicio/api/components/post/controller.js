
const TABLA = 'post';

module.exports = function (injectedStore) {
    const store = injectedStore;

    if (!store) {
        store = require("../../../store/dummy");
    }

    function list() {
        return store.list(TABLA)
    }
    function get(id) {
        return store.get(TABLA, { id: id })
    }
    function insert(data, user) {
        format = {
            id: data.id,
            text_post: data.text_post,
            user: user
        }
        return store.insert(TABLA, format)
    }
    function upsert(data, id_post, id_user) {
        format = {
            id: id_post,
            text_post: data.text_post,
            user: id_user
        }
        return store.update(TABLA, format)
    }

    return {
        list,
        get,
        upsert,
        insert
    }
}