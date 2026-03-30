/*!     
        jquery.picZoomer.js
        v 1.0
        David
        http://www.CodingSerf.com
*/

//放大镜控件
;(function($){
	$.fn.picZoomer = function(options){
		var opts = $.extend({}, $.fn.picZoomer.defaults, options), 
			$this = this,
			$picBD = $('<div class="picZoomer-pic-wp"></div>').appendTo($this),
			$pic = $this.children('img').addClass('picZoomer-pic').appendTo($picBD),
			$zoomWP = $('<div class="picZoomer-zoom-wp"><img src="" alt="" class="picZoomer-zoom-pic"></div>').appendTo($this),
			$zoomPic = $zoomWP.find('.picZoomer-zoom-pic'),
			picBDOffset = {
				x: $picBD.offset().left,
				y: $picBD.offset().top
			};

		opts.picWidth = $this.find('img').width();
		opts.picHeight = $this.find('img').height();

		opts.zoomWidth = opts.zoomWidth || opts.picWidth;
		opts.zoomHeight = opts.zoomHeight || opts.picHeight;

		var zoomWPSizeHalf = {
			w: opts.zoomWidth / 2,
			h: opts.zoomHeight / 2
		};

		$zoomPic.css({
			'width': opts.picWidth * opts.scale + 'px',
			'height': opts.picHeight * opts.scale + 'px'
		});

		$picBD.on({
			mouseenter: function () {
					opts.picWidth = $this.find('img').width();
					opts.picHeight = $this.find('img').height();

					opts.zoomWidth = opts.zoomWidth || opts.picWidth;
					opts.zoomHeight = opts.zoomHeight || opts.picHeight;

					zoomWPSizeHalf = {
						w: opts.zoomWidth / 2,
						h: opts.zoomHeight / 2
					};

					$zoomPic.css({
						'width': opts.picWidth * opts.scale + 'px',
						'height': opts.picHeight * opts.scale + 'px'
					});

					$zoomWP.show();
					$zoomPic.attr('src', $pic.attr('src'));
				},

			mouseleave: function () {
					$zoomWP.hide();
				},

			mousemove: function (e) {
					var x = e.pageX - picBDOffset.x,
						y = e.pageY - picBDOffset.y;

					var top = - (y * opts.scale - zoomWPSizeHalf.h);
					var left = - (x * opts.scale - zoomWPSizeHalf.w);

					if ($zoomWP.width() > parseInt(left + $zoomPic.width()))
						left = - $zoomPic.width() + $zoomWP.width();

					if ($zoomWP.height() > parseInt(top + $zoomPic.height()))
						top = - $zoomPic.height() + $zoomWP.height();

					$zoomPic.css({
						'top' : Math.min(top, 0) + 'px',
						'left': Math.min(left, 0) + 'px'
					});
				}
		});

		return $this;
	};

	$.fn.picZoomer.defaults = {
		scale: 2.5,
	};

})(jQuery);