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
    // if(table=="user"){
    //     updateData = db.user.find(data=> data.id == id);
    //     if(updateData){
    //         updateData.name = data;
    //     }
    // }
    // return updateData;
    return db[table].push(data);
}
async function remove(table, id){
    if(table=="user"){
        removed = db.user.find(data=> data.id == id);
        db.user = db.user.find(data=> data.id !== id);
    }   
    return removed;
}

module.exports = {
    list, get, upsert, remove
}