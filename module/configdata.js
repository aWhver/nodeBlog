/**
 * Created by DELL on 2017/3/26.
 */
const app = require('../app1'),
    sql = require('./mysql'),
    navdata = require('./nav');


app.use((req,res,next)=>{
    if( req.cookies['login'] ){
        res.locals.login = req.cookies['login'].name;
    };

    if( res.locals.login && typeof req.session.admin ){
        sql('SELECT * FROM `nodeuser` WHERE username = ?',[res.locals.login],(err,data) => {
            req.session.admin = Number(data[0]['admin']);
            next()
        })
    }else{
        next()
    }
});

app.use(function (req,res,next){
    if(req.session.navdata === undefined){
        navdata(onedata => {
            req.session.navdata = onedata;
            next()
        });
    }else{
        next()
    }
});
