const connection = require("../Model/DBConnect");
const fs = require("fs");

class BaseController {
    querySQL(sql){
        return new Promise((resolve, reject) => {
            connection.query(sql, (err, result) =>{
                if (err){
                    reject(err);
                }
                resolve(result);
            })
        })
    }

    getTemplate(filePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(filePath,'utf8', (err, data) => {
                if (err) {
                    reject(err.message)
                }
                resolve(data)
            })
        })
    }
}

module.exports = BaseController;