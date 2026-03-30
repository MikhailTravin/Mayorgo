window.funopenfade = function openFadeIFrame(data)
{
	$('#fastview .m-cart').html('<iframe src="'+data.url+'" style="min-width: '+data.width+'" width="100%" height="'+data.height+'px">');
};
window.completebuy = function (id,qu){
	if(parseInt(qu)>0) {
		$.post('/catalog/action.php', {ajax: "Y", action: "add", size: id},function (dat){
			var ded = JSON.parse(dat);
			if(ded.status=='OK')
			{
				$('.icon-close').click();
			}else
			{
				alert('Что-то пошло не так');
			}
		});
	}else{

	}

};
window.openpopenzhopne = function (id,color){
	$.post('/bitrix/ajax/sizesbuy.php',{ID:id,CO:color,K:'993d9dkdkk93dk93kd93kd9e9dke9'},function (data){
		var dеx = JSON.parse(data);
		if(dеx.length)
		{
			$('.sizesinnerfortxx').html('');
			for(var io in dеx)
			{
				$('.sizesinnerfortxx').append(BX.create('div', {
					attrs: {
						className: 'choosize',
						onclick: (dеx[io].CATALOG_AVAILABLE=='Y')?'window.completebuy('+dеx[io].ID+',1)':'window.completebuy('+dеx[io].ID+',0)'
					},
					children:[
						BX.create('div', {
							attrs: {
								className: 'choosize-1'
							},
							text: dеx[io].PROPERTY_RAZMER_VALUE
						}),
						BX.create('div', {
							attrs: {
								className: 'choosize-2'
							},
							text: (dеx[io].CATALOG_AVAILABLE=='Y')?'Купить':'Подписаться'
						})
					]
				}));
			}
		}
	});
};
//sizesinnerfortxx
$(document).ready(function () {

	$('.favoritesfor').click(function (e) {
		e.preventDefault();
		var p_id = $(this).attr('id1');
		var name = $(this).attr('id2');
		var dpu = $(this).attr('id3');
		var thisx = $(this);
		$.ajax({
			type: "POST",
			url: "/catalog/action.php?ajax=Y&action=fav",
			data: "p_id=" + p_id + "&name=" + name + "&dpu=" + dpu,
			success: function(html){

				if(html==4)
					thisx.removeClass('checked');
				else
					thisx.addClass('checked');
				//$('#wishcount').html(html);
			}
		});
	});
	var app = new Application ();

	$('a[href="#"]').on('click', function (e) {
		e.preventDefault();
	});

	$('.bv-video').each(function () {
		var backgroundVideo = new BackgroundVideo('.bv-video', {
			src: [
				$(this).data('mp4'),
				$(this).data('webm')
			]
		});
	});

	$('.js-scrollup').on('click', function (e) {
		e.preventDefault();

		$('html, body').animate({ scrollTop: 0 }, 500);
	});

	$('.photo-slider--in').slick({
		dots: true,

		prevArrow: '<span class="slick-arrow slick-prev"><i class="icon-arrow-left"></i></span>',
		nextArrow: '<span class="slick-arrow slick-next"><i class="icon-arrow-right"></i></span>'
	});

	$('.home-slider--in2').slick({
		dots: false,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		adaptiveHeight: true,
		slidesToShow: 4,
		slidesToScroll: 4,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		],
		prevArrow: '<span class="slick-arrow slick-prev slickslide-arr-l"></span>',
		nextArrow: '<span class="slick-arrow slick-next slickslide-arr-r"></span>'
	});
	$('.home-slider--in3').slick({
		dots: false,
		arrows: true,
		autoplay: true,
		autoplaySpeed: 5000,
		adaptiveHeight: true,
		slidesToShow: 3,
		slidesToScroll: 3,
		responsive: [
			{
				breakpoint: 800,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2
				}
			}
		],
		prevArrow: '<span class="slick-arrow slick-prev slickslide-arr-l"></span>',
		nextArrow: '<span class="slick-arrow slick-next slickslide-arr-r"></span>'
	});
	$('.home-slider--in').slick({
		dots: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 5000,
		adaptiveHeight: true
	});

	$('.item--slider-in').slick({
		dots: true,
		arrows: false,
		adaptiveHeight: true
	});
	$('.item--slider-in').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		var curikx = $(this).find("[data-slick-index="+nextSlide+"]");
		if(curikx.hasClass('video'))
		{
			if(window.playerx)
				window.playerx.playVideo();
			else
			{
				window.playerx = new YT.Player('player', {
					height: '100%',
					width: '100%',
					videoId: curikx.find('#player').attr('idd'),
					playerVars: {
						'autoplay': 1,
						'mute': 1,
						'playsinline': 1,
						'autohide': 1,
						'showinfo': 0,
						'rel': 0,
						'controls': 0,
						'loop': 1,
						'modestbranding': 1,
						'playlist': curikx.find('#player').attr('idd')
					},
					events: {
						'onReady': onPlayerReady,
						//'onStateChange': onPlayerStateChange
					}
				});

				function onPlayerReady(event) {
					event.target.playVideo();
				}

				$('.fordrtx').click(function () {
					window.playerx.playVideo();
				});
			}
		}else {
			if(window.playerx)
				window.playerx.stopVideo();
		}
	});

	$('.spoiler--head').on('click', function () {
		var spoiler = $(this).closest('.spoiler');

		spoiler.find('.spoiler--body').slideToggle(300);
		spoiler.toggleClass('is-active');
	});

	$('.catalog--spoiler-h').on('click', function () {
		var spoiler = $(this).closest('.catalog--spoiler');

		spoiler.find('.catalog--spoiler-b').slideToggle(300);
		spoiler.toggleClass('is-active');
	});

	$(window).on('load resize scroll', function () {
		if ($(window).width() >= 768)
			($(window).scrollTop() > $(window).height()) ? $('.tool-btn').fadeIn(300) : $('.tool-btn').fadeOut(300);
		if ($(window).scrollTop() > 5)
			$('.header--info').addClass('backgriob');
		else
		{
			$('.header--info').removeClass('backgriob');
		}
	});

	$('.js-ajax-load').on('click', function (e) {
		e.preventDefault();

		var btn = $(this);
		var url = btn.attr('data-ajax-url');
		var block = btn.attr('data-ajax-block');
		var label = btn.html();

		btn.html('Загрузка...');

		$.get(url, function (result) {
			var data = $(result);
			var items = data.find('.result--items > *');

			items.hide();
			items.insertBefore(block);
			items.fadeIn(500);

			btn.html(label);

			if (data.find('.result--next').length > 0) {
				btn.attr('data-ajax-url', data.find('.result--next').attr('data-url'));
			} else {
				btn.hide();
			}
		});
	});

	$('a.cart--color').on('click', function (e) {
		e.preventDefault();
		var oldActive = $(this).closest('.cart--colors').find('.is-active');

		oldActive.removeClass('is-active');
		$(this).addClass('is-active');
		if($(this).attr('data-item-color'))
		{
			var id = $(this).attr('data-item-color');
			$('.forhiderdoi').hide();
			$('.forx-'+id).show();
			console.log('.forx-'+id);
		}
		if ($(this).is('[data-item-color]')) {
			var item = $(this).closest('.item');
			var id = $(this).attr('data-item-color');
			var hrefmain = $(this).attr('data-item-hrefmain');


			item.attr('data-sel-color', id);

			$.ajax({
				url: item.attr('data-ajax-color'),
				data: {
					item: item.attr('data-item-id'),
					color: id,
				},

				method: 'GET',
				dataType: 'text',

				success: function (r) {
					history.pushState(null, null, hrefmain);
					var data = JSON.parse(r);



					if (data.sizes) {
						//console.log(data.sizes);
						var sizes = $('[data-item-size]');

						sizes.html('');
						var mioncx = false;
						$.each(data.sizes, function () {

								var size = $('<option></option>');

							if(this.selsed)
								size.attr('selected', 'selected');
							size.attr('value', this.id);
							size.attr('data-size', this.size);
							size.attr('data-soldout', this.soldout);


							size.html(this.label);

							sizes.append(size);
						});

						sizes.trigger('live_clear');
					}
					if (data.gallery) {
						var thumbs = $('[data-item-thumbs]');
						thumbs.html('');
						var thumbs_mob = $('.item--slider-in');
						thumbs_mob.slick('unslick');
						thumbs_mob.unbind('beforeChange');
						thumbs_mob.html('');
						var thumb_mob=false;
						var thumb=false;
						$.each(data.gallery, function () {
							if (this.type == 'video')
								thumb_mob = '<div video="true" className="slide item--slide video"><div style="min-height: 600px;position: relative;" class="video-box"><div class="fordrtx" style="width: 100%;z-index:100;height: 100%;position:absolute;top: 0;left: 0;"></div><div idd="'+this.url+'" id="player"></div></div></div>';
							else
								thumb_mob = '<div class="slide item--slide"><img src="' + this.url + '" alt=""></div>';
							thumbs_mob.append(thumb_mob);

							thumb = $('<a href="#" class="item--thumb"></a>');
							if (this.type == 'video')
								thumb.addClass('is-video');
							thumb.attr('data-url', this.url);
							thumb.css('background-image', 'url(' + this.urlThumb + ')');
							thumbs.append(thumb);
						});
						var razik = false;
						thumbs_mob.find('img').eq(0).load(function() {

							if(!razik) {
								razik=true;
								thumbs_mob.slick({
									dots: true,
									arrows: false,
									adaptiveHeight: true
								});
								window.playerx = false;
								thumbs_mob.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
									var curikxx = thumbs_mob.find("[data-slick-index=" + nextSlide+"]");
									console.log(curikxx);
									if (curikxx.attr('video')) {
										if (window.playerx)
											window.playerx.playVideo();
										else {
											window.playerx = new YT.Player('player', {
												height: '100%',
												width: '100%',
												videoId: curikxx.find('#player').attr('idd'),
												playerVars: {
													'autoplay': 1,
													'mute': 1,
													'playsinline': 1,
													'autohide': 2,
													'showinfo': 0,
													'rel': 0,
													'controls': 0,
													'loop': 1,
													'modestbranding': 1,
													'playlist': curikxx.find('#player').attr('idd')
												},
												events: {
													'onReady': onPlayerReady,
													//'onStateChange': onPlayerStateChange
												}
											});

											function onPlayerReady(event) {
												event.target.playVideo();
											}

											$('.fordrtx').click(function () {
												window.playerx.playVideo();
											});
										}
									} else {
										if (window.playerx)
											window.playerx.stopVideo();
									}
								});
								thumbs.find('.item--thumb').first().trigger('click');
							}
						})
					}
				}
			});
		}

		if ($(this).is('[data-cart-color]')) {
			var row = $(this).closest('[data-cart-row]');
			var size = row.find('[data-cart-size]');
			var photo = row.find('[data-cart-photo]');
			var id = $(this).attr('data-cart-color');

			row.attr('data-sel-color', id);

			$.ajax({
				url: row.attr('data-change-url'),
				data: {
					sizes: {
						old: row.attr('data-sel-size'),
						new: row.attr('data-sel-size')
					},

					colors: {
						old: oldActive.attr('data-cart-color'),
						new: $(this).attr('data-cart-color'),
					},

					changed: 'color'
				},

				method: 'GET',
				dataType: 'text',

				success: function (r) {
					var data = JSON.parse(r);

					if (data.photo) {
						photo.css('background-image', 'url(' + data.photo + ')');
					}

					if (data.sizes) {
						size.html('');

						$.each(data.sizes, function () {
							var option = $('<option></option>');

							option.attr('value', this.id);
							option.attr('data-size', this.size);
							option.attr('data-soldout', this.soldout);
							option.html(this.label);

							size.append(option);
						});

						size.trigger('live_clear');
					}
				}
			});
		}
	});

	$('[data-item-size]').on('change', function () {
		var item = $(this).closest('.item');
		var id = $(this).val();
		var idpar = item.attr('data-item-id');

		item.attr('data-sel-size', id);

		$.ajax({
			url: item.attr('data-ajax-size'),
			data: {
				item: item.attr('data-item-id'),
				color: item.attr('data-sel-color'),
				size: id
			},

			method: 'GET',
			dataType: 'text',

			success: function (r) {
				$.ajax({
					url: '/bitrix/components/bitrix/catalog.element/ajax.php',
					method: 'POST',
					data: {
						AJAX: 'Y',
						SITE_ID: 's1',
						PRODUCT_ID: id,
						PARENT_ID: idpar
					},
					success: function(obj) {

					},
					error: function(p1,p2,p3) {
						console.log('ERROR',p1,p2,p3);
					}
				});
					var data = JSON.parse(r);
					if (data.control)
						$('[data-item-control]').html(data.control);
			}
		});
	});


	if(!top.datacartcoun)
		top.datacartcoun = $('[data-cart-count]');



	$(document).on('click', '[data-item-cart]', function (e) {
		e.preventDefault();
		var btn = $(this);
		var item = btn.closest('.item');

		if (btn.hasClass('is-added')) {
			$.ajax({
				url: btn.attr('data-url-delete'),
				data: {
					item: item.attr('data-item-id'),
					size: item.attr('data-sel-size'),
					color: item.attr('data-sel-color')
				},

				method: 'GET',
				dataType: 'text',

				success: function (r) {
					var data = JSON.parse(r);

					btn.addClass('is-dark');
					btn.removeClass('is-added');
					btn.html('В корзину');

					top.datacartcoun.each(function (l) {
						$(this).html(parseInt($(this).html()) - 1);
					});
				}
			});
		} else {
			$.ajax({
				url: btn.attr('data-url-add'),
				data: {
					item: item.attr('data-item-id'),
					size: item.attr('data-sel-size'),
					color: item.attr('data-sel-color')
				},

				method: 'GET',
				dataType: 'text',

				success: function (r) {
					var data = JSON.parse(r);
					btn.removeAttr('data-item-cart');
					btn.removeAttr('data-url-add');
					btn.removeAttr('data-url-del');
					btn.removeClass('is-dark');
					btn.addClass('is-added');
					btn.html('Перейти в корзину');
					btn.unbind('click');
					btn.click(function (){window.parent.location.href='/cart/';});
					top.datacartcoun.each(function (l) {
						$(this).html(parseInt($(this).html()) +1);
					});
				}
			});
		}
	});

	$('.m-select').each(function () {
		LiveSelect ($(this));
	});

	$('.order--tab').on('click', function (e) {
		e.preventDefault();

		$('.order--tabs-b').hide();
		$('.order--tab').removeClass('is-active');

		$('.order--tabs-b[data-box=' + $(this).attr('data-box-id') + ']').show();
		$(this).addClass('is-active');
	});

	$('.js-modals-open').on('click', function (e) {
		e.preventDefault();

		var _t = $(this);

		app.blockScroll();

		var item = $('.modals--item' + $(this).attr('href'));

		(item.hasClass('is-white')) ? $('.modals--overlay').addClass('is-white') : $('.modals--overlay').removeClass('is-white');

		$('.modals').fadeIn(200);
		item.fadeIn(200, function () {
			if ($(this).find('[data-map="true"]').length > 0)
				$(this).find('[data-map="true"]').trigger('refresh');

			if ($(this).find('[data-xs-map="true"]').length > 0) {
				var m = $(this).find('[data-xs-map="true"]');

				m.attr('data-marker', _t.attr('data-marker'));
				m.trigger('refresh');
			}

			if ($(this).find('input[type="text"]').length > 0)
				$(this).find('input[type="text"]').first().focus();
		});
	});

	$('.js-modals-close').on('click', function (e) {
		e.preventDefault();

		app.unBlockScroll();

		$('.modals, .modals--item').fadeOut(200);
	});

	$('.js-curmodal-close').on('click', function (e) {
		e.preventDefault();

		$(this).closest('.modals--item').fadeOut(200);
	});

	$('.account--password-l').on('click', function (e) {
		e.preventDefault();

		var form = $(this).next('.account--password-f');

		$(this).hide();

		form.show();
		form.find('input[type="text"]').first().focus();
	});

	$('.account--address-e').on('click', function (e) {
		e.preventDefault();

		var address = $(this).closest('.account--address');
		var edit = address.next('.account--edit');

		address.hide();
		edit.show();
		edit.find('input[type="text"]').first().focus();
	});

	$('.js-edit-cancel').on('click', function (e) {
		e.preventDefault();

		var edit = $(this).closest('.account--edit');
		var address = edit.prev('.account--address');

		edit.hide();
		address.show();
	});

	$('.account--add-l').on('click', function (e) {
		e.preventDefault();

		var box = $(this).closest('.account--add');

		box.addClass('is-active');
		box.find('input[type="text"]').first().focus();
	});

	$('.js-add-cancel').on('click', function (e) {
		e.preventDefault();

		$(this).closest('.account--add').removeClass('is-active');
	});

	$('.js-orders-filter').on('change', function () {
		var v = $(this).val();

		if (v == 'all') {
			$('[data-order-type]').show();
		} else {
			$('[data-order-type]').hide();
			$('[data-order-type=' + v + ']').show();
		}
	});

	$('.js-recovery').on('click', function (e) {
		e.preventDefault();

		$('.m-auth--login').hide();
		$('.m-auth--recovery').show();
		$('.m-auth--rtitle').addClass('is-shown');

		$('.m-auth--recovery input[type="text"]').first().focus();
	});

	$('.js-auth, .m-auth--rback').on('click', function (e) {
		e.preventDefault();

		$('.m-auth--recovery').hide();
		$('.m-auth--login').show();
		$('.m-auth--rtitle').removeClass('is-shown');

		$('.m-auth--login input[type="text"]').first().focus();
	});

	$('.m-auth--tab').on('click', function (e) {
		e.preventDefault();

		var index = $(this).index() + 1;

		$('.m-auth--tab').removeClass('is-active');
		$(this).addClass('is-active');

		$('.m-auth--box').removeClass('xs-shown');
		$('.m-auth--box:nth-child(' + index + ')').addClass('xs-shown');
	});

	//$('.catalog--masonry').masonry();
	$('.item--tab').on('click', function (e) {
		e.preventDefault();

		var item = $(this).closest('.item');

		item.find('.item--tab').removeClass('is-active');
		item.find('.item--box').removeClass('is-shown');

		$(this).addClass('is-active');
		item.find('.item--box:nth-child(' + ($(this).index() + 1) + ')').addClass('is-shown');
	});

	if ($('.item--photo').length > 0)
		$('.item--photo').picZoomer();

	$(document).on('click', '.item--thumb', function (e) {
		e.preventDefault();

		var item = $(this).closest('.item');
		var url = $(this).attr('data-url');
		var photo = item.find('.item--photo');

		item.find('.item--thumb').removeClass('is-active');
		$(this).addClass('is-active');

		item.find('.item--video').remove();

		if ($(this).hasClass('is-video')) {
			var video = $('<div class="item--video"></div>');
			var videoIn = $('<div class="item--video-in"></div>');
			var iframe = $('<iframe autoplay="autoplay" width="100%" src="https://www.youtube.com/embed/' + url + '?autoplay=1&autohide=2&showinfo=0&rel=0&controls=0&loop=1&modestbranding=1&playsinline=1&playlist=' + url + '" allow="autoplay" frameborder="0" allowfullscreen></iframe>');

			videoIn.append(iframe);
			video.append(videoIn);
			photo.append(video);
		} else {
			item.find('.item--photo-in').attr('src', url);
		}
	});

	/*$('.header--item.is-sub').hoverIntent({
		timeout: 100,
		interval: 20,

		over: function () {
				$(this).find('[data-sub]').stop().fadeIn(300);
			},

		out: function () {
				$(this).find('[data-sub]').stop().fadeOut(300);
			},
	});*/

	// Cookie

	if (!Cookies.get('hide-cookie-box'))
		$('.cookie-box').show();

	$('.cookie-box--close').on('click', function (e) {
		e.preventDefault();

		Cookies.set('hide-cookie-box', 'true', { expires: 365 });

		$('.cookie-box').fadeOut(300);
	});

	$('.scrollbar-inner').scrollbar();
	$('.xs-menu--list a.is-arrow').on('click', function (e) {
		e.preventDefault();

		$(this).parent().toggleClass('is-active');
	});

	$('.header--open').on('click', function (e) {
		e.preventDefault();

		app.blockScroll();

		$('.xs-menu').addClass('is-shown');
		$('.xs-menu--overlay').fadeIn(300);
	});

	$('.xs-menu--overlay').on('click', function (e) {
		e.preventDefault();

		app.unBlockScroll();

		$('.xs-menu').removeClass('is-shown');
		$('.xs-menu--overlay').fadeOut(300);
	});

	$('.brand--tabs a').on('click', function (e) {
		e.preventDefault();

		var index = $(this).index() + 1;

		$('.brand--tabs a').removeClass('is-active');
		$(this).addClass('is-active');

		$('.brand').removeClass('is-active');
		$('.brand[data-brand-index=' + index + ']').addClass('is-active');
	});

	$('.maplist-wrap .maplist--tab').on('click', function (e) {
		e.preventDefault();

		var maplist = $(this).closest('.maplist');
		var toShow = $(this).data('maplist-type');

		maplist.find('.maplist--tab.is-active').removeClass('is-active');
		$(this).addClass('is-active');

		if (toShow == 'all') {
			maplist.find('.maplist--item').show();
		} else {
			maplist.find('.maplist--item').hide();
			maplist.find('.maplist--item[data-maplist-type*=' + toShow + ']').show();
		}
	});


	$('.catalog--xs-l').on('click', function (e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$('.catalog--navi').slideToggle(300);
	});

	// mobile filter

	$('.catalog--xs-o').on('click', function (e) {
		e.preventDefault();

		app.blockScroll();

		$('.filter').addClass('is-shown');
	});

	$('.filter--close').on('click', function (e) {
		e.preventDefault();

		app.unBlockScroll();

		$('.filter').removeClass('is-shown');
	});

});

function Application () {
	var _t = {};

	_t.scrollIsBlocked = false;
	_t.currentScroll = 0;

	// --------

	_t.blockScroll = function () {
		_t.currentScroll = $(window).scrollTop();

		_t.scrollIsBlocked = true;

		$('body').css({
			overflow: 'hidden',
			height: '100%'
		});

		$('body, html').scrollTop(0);
		$('.inner-page').css('margin-top', (-1) * _t.currentScroll);
	}

	_t.unBlockScroll = function () {
		if (_t.scrollIsBlocked) {
			$('body').css({
				overflow: 'auto',
				height: 'auto'
			});

			$('.inner-page').css('margin-top', 0);
			$('body, html').scrollTop(_t.currentScroll);

			_t.scrollIsBlocked = false;
		}
	}

	// --------

	return _t;

};
