/**
 * Created by DELL on 2017/3/17.
 */
const express = require('express'),
        sql = require('../module/mysql.js'),
        crypto = require('crypto'),
        router = express.Router();



router.get('/',(req,res) => {
    res.render('reg.ejs');
});

router.post('/',(req,res) => {
    const user = req.body.username,
        pwd = req.body.pwd,
        md5 = crypto.createHash('md5');
   // console.log(req.body)
    sql('SELECT * FROM `nodeuser` WHERE username = ?',[user],(err,data) => {
        if(data == ![]){
            res.json({
                bool:true,
               result: '<p class="reged1">此帐号不存在</p>'
            });
            return
        };
        let newpwd = md5.update(pwd).digest('hex');
        if(data[0].pwd == newpwd){
            res.cookie('login',{name:user},{maxAge:1000*60*60*24});
            req.session.admin = Number(data[0].admin);
            res.json({
                bool:false,
            })
        }else{
            res.send('密码错误')
        }
    })
})




module.exports = router;