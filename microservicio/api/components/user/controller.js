// const store = require("../../../store/dummy");
let nanoid;
import('nanoid').then(module => {
    nanoid = module.nanoid;
    // el resto de tu código donde necesitas nanoid
}).catch(error => {
    console.error("Error al cargar nanoid:", error);
});

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
    function upsert(body){
        const data = {
            user: body.name
        }
        data.id = (body.id) ? body.id : nanoid();

        return store.upsert(TABLA, data)
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