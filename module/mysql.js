/**
 * Created by DELL on 2017/3/14.
 */
const mysql = require('mysql');

module.exports=function(sql,val,callback){
    let config = mysql.createConnection({
        //数据库地址
        host:'localhost',
        user:'root',
        password:'',
        //端口号
        port:'3306',
        //应用哪个数据库
        database:'node'
    });

//开启连接
    config.connect();

//数据库操作 参数1数据库代码 参数2回调

    config.query(sql,val,(err,data) => {
        callback && callback(err,data);
    })


//结束连接
    config.end();
}
