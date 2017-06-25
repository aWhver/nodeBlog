/**
 * Created by DELL on 2017/3/28.
 */
const fs = require('fs');

//检测文件是否存在 不存在则创建
/*fs.open('./1.txt','wx',(err,data) => {
    console.log(data);
})*/
//创建文件夹
//fs.mkdir('./free',(err,dta) => {})
//删除文件夹
//fs.rmdir('./free');
//删除文件
//fs.unlink('./2.txt')
//读取文件信息
/*fs.stat('./app1.js',(err,data) => {
    console.log(data);
})*/
//检测文件是否可读
/*fs.access('./app1.js',fs.constants.R_OK | fs.constants.W_OK,(err,data) => {
    console.log(data)
})*/
//追加数据
//fs.appendFile('./app1.js','hellowrod',(err,data) => {})
//读取文件内容
/*fs.readFile('./app1.js','utf8',(err,data) => {
    console.log(data)
})*/
fs.readdir('./views',(err,data) => {

})


<div class="bdsharebuttonbox">
    <a href="#" class="bds_more" data-cmd="more"></a>
    <a href="#" class="bds_qzone" data-cmd="qzone"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina"></a>
    <a href="#" class="bds_tqq" data-cmd="tqq"></a>
    <a href="#" class="bds_renren" data-cmd="renren"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin"></a>
</div>
<script>window._bd_share_config={"common":{"bdSnsKey":{},
    "bdText":"",
    "bdMini":"2",
    "bdPic":"","bdStyle":"0"
    ,"bdSize":"16"},
    "share":{},
    "image":{"viewList":["qzone","tsina","tqq","renren","weixin"],
    "viewText":"分享到：","viewSize":"16"},
    "selectShare":{"bdContainerClass":null,
    "bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};
with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];</script>

