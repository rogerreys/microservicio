
const TABLA = 'post';

module.exports = function (injectedStore) {
    const store = injectedStore;

    if (!store) {
        store = require("../../../store/dummy");
    }

    function list() {
        return store.list(TABLA)
    }

    return {
        list,
    }
}