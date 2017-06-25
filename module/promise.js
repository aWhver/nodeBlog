/**
 * Created by DELL on 2017/3/28.
 */
const sql = require('./mysql');
let fn = function(mysql){
    return new Promise((resolve,reject) => {
        sql(mysql,(err,data) => {
            resolve(data)
        })
    })
};

module.exports = fn;