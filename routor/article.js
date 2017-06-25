/**
 * Created by DELL on 2017/3/21.
 */
const express = require('express'),
    router = express.Router(),
    sql = require('../module/mysql'),
    upload = require('../module/multer'),
    fn = require('../module/promise');

router.get('/',(req,res) => {
        res.render('admin/article')
});
router.get('/list-:page.html',(req,res) => {
    res.locals.page = req.params.page;
    sql('select * from article order by id desc limit ?,2',[(req.params.page-1)*2],(err,limitdata) => {
        sql('select * from article',(err,alldata) => {
            res.render('article_list.ejs',{showdata: limitdata,allData:alldata})
        })
    });
})
router.get('/articleCheck/:id.html',(req,res) => {
    let arr = [
        fn('select * from article where recommend = 1 limit 0,3'),
        fn('select * from article where tag ="刑侦" limit 0,2'),
    ];
    sql('SELECT * FROM article where id = ?',[req.params.id],(err,data1) => {
        if(data1 == ![]){
            res.status(404).render('404');
            return
        }
        sql('SELECT * FROM userComment where cid = ?',[req.params.id],(err,data2) => {
            Promise.all(arr).then(function(data){
                res.render('article',{data:data1,comment:data2,recData:data});
            });
        })

    })
})
router.post('/',upload.array('free',3),(req,res) => {
   let title = req.body.title,
        tag = req.body.tag,
        author = req.body.author,
        cont = req.body.cont,
       image;
   if(req.files == ![]){
       image =  '/img/ueditor/';
   }else{
      image = '/images/demo/'+ req.files[0].filename;
   }
    date = new Date().toLocaleString().substr(0,10);
    if(!title && !tag && !author && !cont){res.send('至少有一项内容不为空');return}
    sql('INSERT INTO article (id,title,tag,author,content,time,image) VALUES (0,?,?,?,?,?,?)',[title,tag,author,cont,date,image],( err,data ) => {
        console.log(err);
        if( err ){
            res.send('失败');
            return
        }
        res.json({
            result:'成功'
        })
    })
})

router.post('/articleCheck/:id.html',(req,res) => {
    let ctime = new Date().toLocaleString().substr(0,10);
    sql('SELECT * FROM article where id = ?',[req.params.id],(err,data) => {
        sql('INSERT INTO userComment (id,uid,cid,content,ctime) VALUES (0,0,?,?,?)',[req.params.id,req.body.cont,ctime],(err,data) => {
            res.json({
                comment:data
            })
        })
    })
})
router.get('/ue',(req,res) => {
    res.render('ue')
})

module.exports = router;