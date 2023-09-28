// const store = require("../../../store/dummy");

const TABLA = 'user';

module.exports = function(injectedStore){
    const store = injectedStore;

    if(!store){
        store = require("../../../store/dummy");
    }
    
    function list() {
        return store.list(TABLA);
    }
    function get(id){
        return store.get(TABLA, id)
    }
    function upsert(id, data){
        return store.upsert(TABLA, id, data)
    }
    function remove(id){
        return store.remove(TABLA, id)
    }
 
    return {
        list,
        get,
        upsert,
        remove
    }
}