/**
 * Created by DELL on 2017/4/1.
 */
const http = require('https'),
    fs = require('fs');
    /*options = {
        hostname:'nodejs.cn',
        path:'/api/',
        port:80,
        headers:{ //解决乱码
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }

    };*/

http.get('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1491034454917&di=c8436776ea9e246ab4b8170eb88c928b&imgtype=0&src=http%3A%2F%2Fsoft.luobou.com%2Fbizhi%2Ffengjing%2F1473141512150.jpg',function(res){
    res.setEncoding('binary');//请求图片时设置二进制数据
    let html = '';
    res.on('data',function (data) {
        html += data;
    });
    res.on('end',function(){
        fs.writeFile('./3.jpg',html,'binary');
    })
})