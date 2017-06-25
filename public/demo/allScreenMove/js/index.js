var $part = $("#wrap .part");
var $li = $('#slide ul li');
setTimeout(function(){
	$(document).scrollTop(0);
},100);
//初始化
(function(){
	$li.eq(0).addClass('on');
	$part.append('<div class="logo"></div>');
	$part.each(function(i){
		var str = i!=1?'url(img/'+(i+1)+'.jpg)no-repeat center/cover':'rgb(217, 127, 92)';
		$(this).css('background',str)
	});
})();
//页面滚动
(function(){
	var index=0;
	var nowDate = new Date();
	var wh = $(window).height();
	$(window).resize(function(){
		wh = $(window).height();
	});
	
	$li.click(function(){
		index = $(this).index();
		fn();
	});

	$(document).mousewheel(function(){
		if ( new Date() - nowDate > 500 )
		{
			nowDate = new Date();
			var d = arguments[1];
			index=d<0?( index>=$part.length-1?0:index+1):(index<=0?$part.length-1:index-1);
			fn();
		}
	});
	function fn(){
		$li.eq(index).addClass('on').siblings().removeClass('on');
		$('html,body').animate({
			scrollTop : index*wh + "px"
		},500,function(){
			$part.eq(index).find('.img').addClass('on');
			$part.eq(index).siblings().find('.img').removeClass('on');
		});
	};
})();