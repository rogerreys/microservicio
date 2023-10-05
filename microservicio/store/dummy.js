const db = {
    'user':[
        {id:"1", name:'Carlos'},
        {id:"2", name:'Pepe'},
        {id:"3", name:'Jose'}
    ]
};

// Convierte en promesa
async function list(table){
    return db[table];
}
async function get(table, id){
    let col = await list(table);
    return col.filter(item => item.id == id)[0] || null;
}
async function upsert(table, data){
    if(!db[table]){
        db[table] = []
    }
    db[table].push(data)
    // if(table=="auth"){
    //     console.log(db["auth"])
    // }
    return get(table, data.id)
}
async function remove(table, id){
    if(table=="user"){
        removed = db.user.find(data=> data.id == id);
        removedIndex = db.user.findIndex(data=> data.id == id);
        // db.user = db.user.find(data=> data.id !== id);
        db.user.splice(removedIndex,1)
    }   
    return removed;
}
async function query(table, data){
    list_query = await list(table);
    key = Object.keys(data)[0]
    return list_query.find(q => q[key] == data[key])
}
module.exports = {
    list, get, upsert, remove, query
}