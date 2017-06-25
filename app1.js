/**
 * Created by DELL on 2017/3/12.
 */
const http = require('http'),
        express = require('express'),
        bodyparser = require('body-parser'), //post方式
        cookieParser = require('cookie-parser'),
        session = require("express-session"),
        sql = require('./module/mysql'),
        ws = require('socket.io'),
    //初始化
    app = express();

    module.exports = app;

    //设置模板引擎的目录
    app.set('views',__dirname+'/views');

    //设置引用那个模板
    app.set('view engine','ejs');

    //加载静态资源 css image js
    app.use(express.static(__dirname+'/public'));

    app.use(bodyparser.json()); //用来接收json数据

    app.use(bodyparser.urlencoded({ extended:true }));//可以接受任何数据类型
    app.use(cookieParser('doublefree'));//密钥
    app.use(session({ secret : "free" })); //密钥
    app.use('/ueditor/ue',require('./ue'));
    require('./module/configdata');
    app.use('/',require('./routor/index.js'));

    let server = http.createServer(app).listen(3000);
    let io = ws(server);
    let userList = {};
    //io.on() 监听浏览器变化
    io.on('connection',socket => {
        socket.on('login',data => {
            userList[data.username] = data.username;
            socket.name = data.username;
            io.emit('login',data);
        })

       socket.on('con',data => {
           io.emit('chat',data);
       });

        socket.on('disconnect',data => {
            io.emit('logout',{logout:socket.name})
        })
       // console.log(socket);
    })