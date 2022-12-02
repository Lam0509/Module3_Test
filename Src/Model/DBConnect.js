const mysql = require("mysql");
const DBConfig = require("../Config/DBConfig")

const connection = mysql.createConnection({
    host: DBConfig.host,
    user: DBConfig.user,
    password: DBConfig.password,
    database: DBConfig.database,
    port: DBConfig.port
});

module.exports = connection;