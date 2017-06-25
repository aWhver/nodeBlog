const   multer = require('multer');

let storage = multer.diskStorage({
    //文件目录
    destination:`${process.cwd()}/public/images`,//path.join(process.cwd(),'public')
    filename:function(req,file,cb){
        let filename = file.originalname.split('.');
        cb(null,`${Date.now()}.${filename[filename.length-1]}`)
    }
});

let upload = multer({
    storage:storage
});

module.exports = upload;