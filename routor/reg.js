/**
 * Created by DELL on 2017/3/16.
 */
const   express = require('express'),
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
        sql('SELECT * FROM `nodeuser` WHERE username = ?',[user],(err,data) => {
            //console.log(data)
            if( data == ![] ){
               // console.log('可以注册');
                let newpwd = md5.update(pwd).digest('hex');
                sql('INSERT INTO `nodeuser` (`id`,`username`,`pwd`,`admin`) VALUES (0,?,?,false)',[user,newpwd]);
            }else{
                // console.log('此号已被注册')
               res.locals.result='<p class="reged">此号已被注册</p>';
               res.render('reg.ejs')
            };

        })
})

module.exports=router;