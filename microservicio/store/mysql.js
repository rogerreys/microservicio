const mysql = require("mysql")
const config = require("../config")

let dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection;

function handleConnection() {
    connection = mysql.createConnection(dbconfig);
    connection.connect((err) => {
        if (err) {
            console.error("[DB ERROR] " + err);
            setTimeout(handleConnection, 2000);
        } else {
            console.log("---DB CONNECTED---")
        }
    });
    connection.on('error', (err) => {
        console.error("[DB ERROR] " + err);
        if (err.code === "PROTOCOL_CONNECTION_LOST") {
            handleConnection()
        } else {
            throw err;
        }
    });
}

handleConnection();

function list(table){
    return new Promise( (resolve, reject)=>{
        connection.query(`SELECT * FROM ${table}`, (err, data)=>{
            if(err){
                console.error("[ERROR LIST] "+err);
                return reject(err);
            } else {
                resolve(data)
            }      
        });
    } )
}

function get(table, id){
    return new Promise( (resolve, reject)=>{
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data)=>{
            if(err){
                console.error("[ERROR LIST] "+err);
                return reject(err);
            } else {
                resolve(data)
            }      
        });
    } )
}

module.exports = { list, get }