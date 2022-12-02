const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "lam050901",
    database: "student_management",
    port: 3306
});

module.exports = connection;