function createRemoteDB(host, port) {
    const URL = 'http://' + host + ":" + port;

    function list(table) {
        return req('GET', table)
    }
    function get(table, id) { }
    function upsert(table, data) { }
    function query(table, query, join) { }
    function req(method, table, data) {
        let url = URL + "/" + table;
        let body = {};
        
        return new Promise((resolve, reject) => {
            const requestOptions = {
                method: method,
                headers: {
                    'content-type': 'application/json'
                },
                body: (method != 'GET') ? JSON.stringify(body) : null
            };
            fetch(url, requestOptions)
                .then(response => response.json())
                .then(data => {
                    resolve(data.body)
                })
                .catch(err => {
                    console.error("[ERROR] Error con la base de datos remota", err);
                    return reject(err.message);
                })
        })

    }

    return {
        list
    }
}

module.exports = { createRemoteDB }