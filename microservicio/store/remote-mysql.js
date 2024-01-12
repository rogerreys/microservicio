const remote = require("./remote");
const config = require("../config");

module.exports = remote.createRemoteDB(config.mysqlService.host, config.mysqlService.port)