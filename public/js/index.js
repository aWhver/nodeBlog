/**
 * Created by DELL on 2017/3/21.
 */
window.onload=function() {
    //导航
    (function () {
        var $nav_a = $('.nav .nav_list li'),
         $hasList = $('.nav .nav_list .hasList'),
         index = 0;
        $nav_a.click(function() {
           $nav_a.eq(index).find('a').removeClass('on');
           index = $(this).index();
           //alert($(this).index());
           $nav_a.eq(index).find('a').addClass('on');
        });

        $hasList.hover(function(){
            $('.dropDown').animate({
                height:'78px'
            })
        },function(){
            $('.dropDown').animate({
                height:'0px'
            })
        })
    })();

    //导航伸缩
    (function(){
        var $nav_btn = $('.nav_btn'),
            bool = true;
        $nav_btn.bind('click',function(){
            if(bool){
                $(' .nav .mobile_nav_list ul').animate({
                    height: '150px'
                },600)
            }else{
                $(' .nav .mobile_nav_list ul').animate({
                    height: '0px'
                },600)
            }
            bool = !bool;
        })
    })();

    //banner
    (function(){
        var $ul = $('#wrap .left1 .banner .pic ul');
        var $tabLi = $('#wrap .left1 .banner .tab li');
        var Width =  $('#wrap .left1 .banner .pic ul li.pic_list').width();
        var index = 0;
        var timer = null;
        $tabLi.on('click',function(){
          change(function(){
              index = $(this).index()
          }.bind(this))
        })
        $ul.hover(function(){
            clearInterval(timer);
        },function(){
            auto();
        })
        auto();
        function auto(){
            timer = setInterval( function(){
                change(function(){
                    index++;
                    if (index>$tabLi.length-1) {
                        index=0;
                    }
                })
            },5000)
        };

        function change(fn){
            $tabLi.eq(index).removeClass('active');
            fn && fn();
            console.log(index);
            $tabLi.eq(index).addClass('active');
            $ul.animate({
                marginLeft: -Width*index+'px'
            },600)
        }
    })();

    //日历
    (function(){
        var tM = document.getElementById('month');
        var tY = document.getElementById('year');
        var changeMonth = document.getElementsByClassName('btn');
        var aSpan,oDate,oUl;
        date();
        var valM = tM.innerText;
        var valY = tY.innerText;
        //点击按钮切换日历
        for (var i=0;i<changeMonth.length ;i++ )
        {
            changeMonth[i].index=i;
            changeMonth[i].onclick=function(){
                var year = valY;
                var month = valM;
                var day = new Date(year,month,1).getDate();
                if ( this.index )
                {
                    valM++;
                    if ( valM > 12 )
                    {
                        valY++;
                        valM=1;
                    }
                    time();
                }else{
                    valM--;
                    if ( valM == 0 )
                    {
                        valY--;
                        valM=12;
                    }
                    time();
                }
            };
        };
        //日历初始化
        function date(){
            //获取当前时间
            var nowDate = new Date();
            var year = nowDate.getFullYear();
            var month = nowDate.getMonth();
            var date = nowDate.getDate();
            //获取当前时间一号的星期数
            var day = new Date(year,month,1).getDay();
            tM.innerHTML = month+1;
            tY.innerHTML = year;

            /*创建存放时间的元素*/
            oDate = document.getElementsByClassName('date')[0];
            oUl = oDate.children[1];
            for (var i=0;i<6 ;i++ )
            {
                var oLi = document.createElement('li');
                for (var j=0;j<7 ;j++ )
                {
                    var oSpan = document.createElement('span');
                    oLi.appendChild(oSpan);
                }
                oUl.appendChild(oLi);
            }
            aSpan = oUl.getElementsByTagName('span');
            //编制日历
            for (var i=0;i<day ;i++ )aSpan[i].innerHTML='';
            var count = new Date(year,month+1,0).getDate();
            //alert(count)
            for (var i=1;i<=count ;i++ )
            {
                aSpan[day-1+i].innerHTML = i;
                if ( aSpan[day-1+i].innerHTML == date )aSpan[day-1+i].className = 'now';
            }
            //没有日期的span隐藏
            for (var i=0;i<aSpan.length ;i++ )
            {
                var inn = aSpan[i].innerHTML;
                if ( inn.length == 0 )	aSpan[i].style.visibility = 'hidden';
            }
        };
        //日历变化
        function time(){
            tM.innerHTML = valM;
            tY.innerHTML = valY;
            var date = new Date().getDate();
            var months = new Date().getMonth();
            var years = new Date().getFullYear();
            var year = valY;
            var month = valM;
            var day = new Date(year,month-1,1).getDay();
            aSpan = oUl.getElementsByTagName('span');
            for (var i=0;i<day ;i++ )aSpan[i].innerHTML='';
            var count = new Date(year,month,0).getDate();
            for (var j=0;j<aSpan.length ;j++ )
            {
                aSpan[j].innerHTML = '';
                aSpan[j].style.visibility = 'visible';
                for (var i=1;i<=count ;i++ )
                {
                    aSpan[day-1+i].innerHTML = i;
                    if ( aSpan[day-1+i].innerHTML != date || month != (months+1) || year != years )
                    {
                        aSpan[day-1+i].className = '';
                    }else if ( aSpan[day-1+i].innerHTML == date && month == (months+1) && year == years )
                    {
                        aSpan[day-1+i].className = 'now';
                    }
                }

                var inn = aSpan[j].innerHTML;
                if ( inn.length == 0 )aSpan[j].style.visibility = 'hidden';
            }
        };
    })();

}

