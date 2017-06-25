/**
 * Created by DELL on 2017/3/19.
 */
const express = require('express');
    router = express.Router(),
    sql = require('../module/mysql'),
    fs = require('fs');

    router.use((req,res,next) => {
        if( req.session.admin ){
            next()
        }else{
            res.send('请用管理员帐号登录')
        }
    });
    router.get('/',(req,res) => {
        res.render('admin/admin')
    });

    router.get('/user',(req,res) => {
        sql('SELECT * FROM `nodeuser`',(err,data) => {
            res.render('admin/user',{data:data})
        })
    });

    //删除
    router.post('/user',(req,res) => {
        const id = req.body.id;
        if( typeof id == 'object' ) {
            for (var i = 0; i < id.length; i++) {
                sql('DELETE FROM nodeuser where id = ? ', [id[i]]);
            };
        }else if( typeof id == 'string' ){
            sql('DELETE FROM nodeuser where id = ? ', [id]);
        };
        sql('SELECT * FROM nodeuser',(err,data) => {
            res.render('admin/user',{data:data})
        })
    });

    router.get('/user/update',(req,res) => {
        sql('SELECT * FROM nodeuser where id = ?',[req.query.id],(err,data) => {
            res.render('admin/update',{data:data})
        })
    });

    router.post('/user/update',(req,res) => {
        const user = req.body.user,
            admin = req.body.admin,
            id = req.body.id;
        console.log(req.body)
        sql('update nodeuser set username = ? ,admin = ? where id = ?',[user,admin,id],(err,data) => {
            res.json({
                result:'chenggong'
            })
           // res.render('admin/user',{data:data})
        })
    })

   router.get('/views',(req,res) => {
       let dir = fs.readdirSync(`${process.cwd()}/views`);
       res.render('admin/views',{dirdata:dir})
   });

    router.post('/views',(req,res) => {
        let dirtype = req.body.dirtype,
            dirname = req.body.dirname;
        if(dirtype==='1'){
            fs.readFile(`${process.cwd()}/views/${dirname}`,'utf8',(err,data) => {
               res.json({
                   bool:1,
                   data:data
               });
            })
            return
        };

        if(dirtype==='2'){
            fs.readdir(`${process.cwd()}/views/${dirname}`,(err,data) => {
                res.json({
                    bool:2,
                    dirData:data,
                    dirname:dirname
                })
            })
            return
        };
        let val = req.body.val;
        if(dirtype==='3'){
            fs.writeFile(`${process.cwd()}/views/${dirname}`,val,(err,data) => {
                res.json({
                    result:'success'
                })
            })
        }
    })

    module.exports = router;