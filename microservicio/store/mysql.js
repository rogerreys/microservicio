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

function list(table) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) {
                console.error("[ERROR LIST] " + err);
                return reject(err);
            } else {
                resolve(data)
            }
        });
    })
}

function get(table, id) {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) {
                console.error("[ERROR LIST] " + err);
                return reject(err);
            } else {
                resolve(data)
            }
        });
    })
}

function insert(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) {
                console.error("[ERROR LIST] " + err);
                return reject(err);
            } else {
                resolve(result)
            }
        });
    })
}

function update(table, data) {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id = ?`, [data, data.id], (err, result) => {
            if (err) {
                console.error("[ERROR LIST] " + err);
                return reject(err);
            } else {
                resolve(result)
            }
        });
    })
}

function upsert(table, data) {
    connection.query(`SELECT * FROM ${table} WHERE id=${data.id}`, (err, reslt) => {
        if (err) {
            console.error("[ERROR LIST] " + err);
            return reject(err);
        } else {
            if (reslt[0] && reslt[0].id) {
                this.update(table, data);
            } else {
                this.insert(table, data);
            }
        }
    });
}

module.exports = { list, get, insert, update, upsert }