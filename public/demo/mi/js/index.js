window.onload=function(){
/*header*/
	(function(){
		var $shopcar = $('#header .h_m_right .shopCar');
		var $shopcarA = $shopcar.find('a');
		var $shopcarC = $shopcar.find('.s_con');
		$shopcar.hover(function(){
			$shopcarA.addClass('hover');
			$shopcarC.stop().slideDown(300);
		},function(){
			$shopcarC.stop().slideUp(300,function(){
				$shopcarA.removeClass('hover');
			});
		});
	})();
/*nav_menu*/
	(function(){
		var $ul = $('#nav .n_menu .n_m_list');
		var $mune = $('#nav .n_menu');
		var $li = $('#nav .n_con .goods li.product');
		$ul.each(function(j){
			for (var i=0;i<6 ;i++ )
			{
				var oLi = document.createElement('li');
				var oDiv = document.createElement('div');
				var oA1 = document.createElement('a');
					oA1.innerHTML = "<img src='img/nav/"+(j+1)+"/"+(i+1)+".jpg'/>";
				oDiv.appendChild(oA1);
				var oP1 = document.createElement('p');
					oP1.className = "name";
				var oA2 = document.createElement('a');
					oA2.innerHTML= "小米Note2";
				oP1.appendChild(oA2);
				var oP2 = document.createElement('p');
					oP2.className = "price";
				var oA3 = document.createElement('a');
					oA3.innerHTML= "2799元起";
				oP2.appendChild(oA3);
				oLi.appendChild(oDiv);
				oLi.appendChild(oP1);
				oLi.appendChild(oP2);
				$(this).append($(oLi));
			}
		});
		$li.hover(function(){
			var index = $(this).index();
			$mune.stop().slideDown(400);
			$ul.eq(index-1).show().siblings().hide();
		},function(){
			$mune.stop().slideUp(400);
		});
		$mune.hover(function(){
			$(this).stop().slideDown(400);
		},function(){
			$(this).stop().slideUp(400);
		});
	})();
/*nav_search*/
	(function(){
		var $input = $('#nav .n_con .search input');
		var $btn = $('#nav .n_con .search .s_btn');
		var $list = $('#nav .s_list');
		$input.on('focus blur',function(){
			$input.toggleClass('focus');
			$btn.toggleClass('focus');
			$list.fadeToggle(100);
		});
	})();
/*banner*/
	(function(){
		var $b_main = $('#banner .b_main');
		var $picli = $('#banner .b_main .b_m_pic li');
		var $tab = $('#banner .b_main .b_m_tab li');
		var $btn = $('#banner .b_main .b_m_btn span');
		var length = $tab.length;
		var index = 0;
		var timer = null;
		var nowDate = 0;
		$tab.eq(0).addClass('active');
		$picli.eq(0).show();
		$tab.click(function(){
			if ( new Date() - nowDate > 800 && index != $(this).index() )
			{
				banner(function(){
					index=$(this).index();
				}.bind(this));
			};
		});
		$btn.click(function(){
			if ( new Date() - nowDate > 800 )
			{
				nowDate = new Date();
				var i = $(this).index();
				banner(function(){
					if ( i )
					{
						index++;
						index%=length;
					}else{
						index--;
						if ( index<0 )index=length-1;
					};
				});
			};
		});
		$b_main.hover(function(){clearInterval(timer)},autoplay);

		autoplay();
		function autoplay(){
			timer = setInterval(function(){
				banner(function(){
					index++;
					index%=length;
				});
			},3000);
		};
		function banner(fn){
			$picli.eq(index).fadeOut(800);
			$tab.eq(index).removeClass('active');
			fn();
			$picli.eq(index).fadeIn(800);
			$tab.eq(index).addClass('active');
		};
	})();
/*banner commedity*/
	(function(){
		var $b_n_position = $('#banner .b_nav .b_n_position ');
		var $listLi = $('#banner .b_nav .b_n_list li');
		$b_n_position.each(function(){
			var $li = $(this).find('ul li');
			var width = $li.width();
			var height = $li.height();
			var length = $li.length;
			var cols = Math.ceil(length/6);
			$(this).find('ul').css('width',(cols*width)+'px');
			$li.each(function(i){
				var x = Math.floor(i/6);
				var y = i%6;
				$(this).css({
					left: x*width + 'px',
					top: y*height + 'px'
				});
			});
		});
		$listLi.hover(function(){
			var index = $(this).index();
			$b_n_position.eq(index).show();
		},function(){
			var index = $(this).index();
			$b_n_position.eq(index).hide();
		});
		$b_n_position.hover(function(){
			$(this).show();
		},function(){
			$(this).hide();
		});
	})();
/*star*/
	(function(){
		var $s_banner = $('#star  .s_banner');
		var $btn = $('#star .s_btn span');
		var width = $s_banner.parent().width();
		var index = false;
		var timer =null;
		$btn.click(function(){
			var i = $(this).index();
			if ( i != index )
			{
				$btn.eq(index).addClass('able').siblings().removeClass('able');
				$s_banner.stop().animate({
					marginLeft: -i*	width + 'px'
				},500);
				index=i;
			};
		}).hover(function(){
			clearInterval(timer);
		},function(){
			autoplay();
		});
		autoplay();
		function autoplay(){
			timer = setInterval(function(){
				index = !index;
				var num = index-0;
				$btn.eq(num).removeClass('able').siblings().addClass('able');
				$s_banner.stop().animate({
					marginLeft: -num* width + 'px'
				},500);
			},4000);
		};
	})()
/*match && around*/
	+function(){
		fn('#match');
		fn('#around');
		function fn(obj){
			var $ul = $(obj + ' .m_c_right ul');
			var $li = $(obj +' .m_title ul li');
			var $conLi = $(obj +' .m_c_right ul li');
			var $review = $(obj +' .m_c_right li p.comments .review');
			$ul.eq(0).show();
			$li.mouseenter(function(){
				$(this).addClass('on').siblings().removeClass('on');
				$ul.eq($(this).index()).show().siblings().hide();
			});
			$review.each(function(i){
				var conHeight = $(this).height();
				if ( conHeight <= 20 )
					{
						$(this).css('height' , '20px');
					}else if ( conHeight >= 40 )
					{
						$(this).css('height','40px')
						$(this).addClass('hidden');
					}
				}	
			);
			$conLi.hover(function(){
				$(this).find('p.comments').stop().animate({
					bottom: '0px'
				});
			},function(){
				$(this).find('p.comments').stop().animate({
					bottom: '-80px'
				});
			});
		};
	}();
/*content*/
	(function(){
		var $cLi = $('#content .c_d_ul li.c_li');
		var $tab = $('#content li.c_li .tab');
		var $link = $('#content li.c_li ul.list a.link');
		var $h4 = $('#content .c_d_ul li.c_li h4');
		var liWidth = $cLi.find('ul.list li').width();
		var cLiW = $cLi.width();
		$cLi.hover(function(){
			$(this).find('.btn span').fadeIn(500);
		},function(){
			$(this).find('.btn span').fadeOut(500);
		});
		$tab.each(function(){
			var $tabLi = $(this).find('.tabLi');
			var $btnSpan = $(this).parent('.c_li').find('.btn span');
			var index=0;
			var date = 0;
			$tabLi.eq(0).addClass('active');
			$tabLi.hover(function(){
					$(this).css('background-color','#f60');
				},function(){
					$(this).hasClass('active')?$(this).css('background-color','#fff'):$(this).css('background-color','#b0b0b0');
			}).click(function(){
				index = $(this).index();
				$(this).css('background-color','#fff').siblings().css('background-color','#b0b0b0');
				$(this).addClass('active').siblings().removeClass('active');
				$(this).parents('li.c_li').find('ul.list').stop().animate({
					marginLeft: -index*liWidth + 'px'
				},400);
			});
			$btnSpan.click(function(){
				if ( new Date() - date >= 400 )
				{
					date = new Date();
					$tabLi.eq(index).css('background-color','#b0b0b0');
					var i = $(this).index();
					i?index++:index--;
					index = Math.min(index,$tabLi.length-1);
					index = Math.max(0,index);
					$tabLi.eq(index).addClass('active').siblings().removeClass('active');
					$tabLi.parents('li.c_li').find('ul.list').stop().animate({
						marginLeft: -index*liWidth + 'px'
					},400);
				};
			}).each(function(){
				this.onselectstart = function(){return false};
			});
		});
		//每个轮播图最后一张文字a链接的样式
		$link.each(function(i){
			var linkW = $(this).outerWidth();
			var color = $(this).parents('.c_li').css('border-color');
			$(this).css({
				margin:	'10px '+(cLiW-linkW)/2+'px 0px ',
				color:	color,
				border:	'1px solid '+ color
			})
			$h4.eq(i).css('color',color);
			$(this).hover(function(){
			$(this).css({
					backgroundColor: color,
					color: '#fff'
				});
			},function(){
				$(this).css({
					backgroundColor: '#fff',
					color: color
				});
			});
		});
	})();
/*video*/
	(function(){
		var $play = $('#video .v_content ul li a.v_img');
		var $cover = $('#video .cover');
		$play.click(function(){
			$cover.show();
			$cover.append('<div class="c_main">'+
					'<div class="c_title">'+
						'小米MIX 概念手机背后的故事'+
						'<span>×</span>'+
					'</div>'+
					'<div class="c_video">'+
						'<embed src="http://player.video.qiyi.com/67089aea6e02f74444e51af14f7aca7f/0/0/w_19rqpqie4d.swf-albumId=1803006609-tvId=1803006609-isPurchase=0-cnId=21" allowFullScreen="true" quality="high" width="800" height="540" align="middle" allowScriptAccess="always" type="application/x-shockwave-flash"></embed>'
					+'</div>'+
				'</div>');
			$cover.find('.c_main').css({
				marginTop: '-600px',
				opacity: 0
			}).stop().animate({
				opacity : 1,
				marginTop : '-0px'		
			});
		});
		
		$cover.on('click','.c_title span',function(){
			$(this).parent().parent().animate({
				marginTop: '-600px',
				opacity: 0
			},300,function(){
				$cover.find('.c_main').remove();
				$cover.hide();
			});
			
		})
	})();
};
