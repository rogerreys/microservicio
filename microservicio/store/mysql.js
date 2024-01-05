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

function get(table, data, join) {
    return new Promise((resolve, reject) => {
        let val_join = "";
        if (join) {
            const table = Object.keys(join)[0];
            const key = join[table] //join[key]
            const val = [Object.keys(key)[0]]

            val_join = `JOIN ${table} ON ${val}=${table}.id`
        }
        connection.query(`SELECT * FROM ${table} ${val_join} WHERE ?`, data, (err, result) => {
            if (err) {
                console.error("[ERROR LIST] " + err);
                return reject(err);
            } else {
                resolve(result)
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
    connection.query(`SELECT * FROM ${table} WHERE ?`, data.id, (err, reslt) => {
        if (err) {
            console.error("[ERROR LIST] " + err);
            return reject(err);
        } else {
            if (reslt == null && (reslt[0] && reslt[0].id)) {
                this.update(table, data);
            } else {
                this.insert(table, data);
            }
        }
    });
}

module.exports = { list, get, insert, update, upsert }