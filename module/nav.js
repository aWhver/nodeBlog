/**
 * Created by DELL on 2017/3/25.
 */
const sql = require('./mysql');

let fn = function(onedata,i){
    return new Promise(function( resolve,reject ){
        sql('SELECT * FROM nav where level = 2 and navid = ?',[onedata[i].navid],(err,twodata) => {
            onedata[i].child=twodata;
            resolve();
        })
    })
};

module.exports=function(cb){
    sql('SELECT * FROM nav where level = 1',(err,onedata) => {
        let arr = [];
        for(let i in onedata){
            arr[i] = fn(onedata,i);
        }
        Promise.all(arr).then(function(){
            cb(onedata)
        })
    })
}