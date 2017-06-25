/**
 * Created by DELL on 2017/3/12.
 */
const express = require('express'),
   //ejs = require('ejs'),
    sql = require('../module/mysql'),
    router = express.Router();


    router.get('/',(req,res) => {
        res.locals.admin = req.session.admin;
        sql('SELECT * FROM `article` order by id desc limit 0,10',(err ,data) => {
            sql('SELECT * FROM article where recommend = 1 limit 0,3',(err,data1) => {
                res.render('index.ejs',{articledata:data,recData:data1});
            })
        });
    });

    router.get('/nav',(req,res) => {
        res.render('nav',{ navdata: req.session.navdata})
    })

    router.get('/logout',(req,res) => {
        res.clearCookie('login');
        res.redirect('/reg');
})

    //删除
    router.get('/reg1',(req,res) => {
        console.log(req.param)
        sql('DELETE FROM `free` WHERE `id`= ?',[req.query.id])
    })

    router.get('/post',(req,res) => {
        sql('SELECT * FROM `free`',(err ,data) => {
         res.render('post.ejs',{data : data});
         //console.log(data)
})
    })

    router.get('/search',(req,res) => {
        sql('SELECT * FROM `article` where title like ?',['%'+req.query.keyWords+'%'],(err ,data) => {
            res.render('article.ejs',{checkData:data});
        });
    })

router.use('/admin',require('./admin'));
router.use('/reg',require('./reg.js'));
router.use('/login',require('./login.js'));
router.use('/article',require('./article'));
module.exports=router;