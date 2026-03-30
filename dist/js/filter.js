$(document).ready(function () {

	var catalog = $('[data-catalog]');
	var list = $('[data-catalog-list]');
	var filter = $('[data-filter]');
	var pagination = $('[data-pagination]');

	var sortValue = $('[data-sort-value].is-active').data('sort-value');
	var sortDirection = ($('[data-sort-value].is-active').hasClass('is-up')) ? 'asc' : 'desc';
	var itemsCount = $('[data-items-count].is-active').data('items-count');

	var canUpdate = true;

	function updateItems () {
		if (canUpdate) {
			var data = filter.serialize();

			data = 'sortValue=' + sortValue + '&' + data;
			data = 'sortDirection=' + sortDirection + '&' + data;
			data = 'itemsCount=' + itemsCount + '&' + data;
			data = 'page=' + pagination.find('.is-active').text() + '&' + data;

			list.addClass('js-loading');
			pagination.addClass('js-loading');

			$.ajax({
				url: filter.attr('action'),
				method: "GET",
				data: data,

				success: function (result) {
					var d = $(result);

					list.html(d.find('.result--items').html());
					pagination.html(d.find('.result--pagination').html());

					list.removeClass('js-loading');
					pagination.removeClass('js-loading');
				}
			});
		}
	}

	pagination.on('click', 'li a', function (e) {
		e.preventDefault();

		var p = $(this).parent();
		var a = pagination.find('.is-active');

		a.removeClass('is-active');

		if (p.hasClass('is-prev')) {
			a.prev().addClass('is-active');
		} else if (p.hasClass('is-next')) {
			a.next().addClass('is-active');
		} else if (p.hasClass('is-split')) {

		} else {
			p.addClass('is-active');
		}

		//updateItems ();
	});

	$('[data-sort-value]').on('click', function (e) {
		e.preventDefault();

		if ($(this).hasClass('is-active')) {
			window.location.href='?'+$(this).attr("data-sort-value")+'=desc';
			//$(this).toggleClass('is-up is-down');
		} else {
			window.location.href='?'+$(this).attr("data-sort-value")+'=asc';
			//$('[data-sort-value]').removeClass('is-active is-up is-down');
			//$(this).addClass('is-active is-up');
		}

		/*sortValue = $(this).data('sort-value');
		sortDirection = ($(this).hasClass('is-up')) ? 'asc' : 'desc';
		updateItems ();*/
	});

	$('[data-items-count]').on('click', function (e) {
		e.preventDefault();

		$('[data-items-count]').removeClass('is-active');
		$(this).addClass('is-active');

		itemsCount = $(this).data('items-count');

		//updateItems ();
	});

	$('.catalog--filter-l > li.with-sub > a').on('click', function (e) {
		e.preventDefault();

		$(this).parent().toggleClass('is-active');
	});

	function generateName () {
		var text = '';
		var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (var i = 0; i < 5; i++)
			text += possible.charAt(Math.floor(Math.random() * possible.length));

		return text;
	}

	// mobile filter

	$('.js-filter').each(function () {
		var title = $(this).find('.js-filter-t').html();
		var link = $('<a href="#" class="filter--link">' + title + '</a>');

		link.append('<span></span>');

		$('.filter--list').append(link);

		var sub = $('<div class="filter--sub"></div>');

		var subHead = $('<div class="filter--head"></div>');
		var subTitle = $('<div class="filter--title">' + title + '</div>');
		var subBack = $('<a href="#" class="filter--back"></a>');

		subHead.append(subTitle);
		subHead.append(subBack);

		var subBody = $('<div class="filter--body"></div>');
		var subItems = $('<div class="filter--items"></div>');
		var subSave = $('<a href="#" class="filter--save">Применить</a>');

		if ($(this).find('.js-filter-c').length > 0) {
			var items = $(this).find('.checkbox, .radiobox');

			items.each(function () {
				var deskInputs = $(this).find('input');

				deskInputs.each(function () {
					if (!$(this).attr('name'))
						$(this).attr('name', generateName ());
				});

				var box = $('<div class="filter--item"></div>');
				var item = $(this).clone();

				var mobiInputs = item.find('input');

				mobiInputs.each(function () {
					if (!$(this).attr('name'))
						$(this).attr('name', generateName ());

					$(this).attr('name', 'xs-' + $(this).attr('name'));
				});

				box.append(item);

				subItems.append(box);

				function updateLabel () {
					var checks = subItems.find('input:checked');

					if (checks.length > 0) {
						if (checks.length > 1) {
							link.find('span').html('Выбрано: ' + checks.length);
						} else {
							link.find('span').html(checks.next('span').text());
						}
					} else {
						link.find('span').html('');
					}
				}

				deskInputs.on('change', function () {
					mobiInputs.prop('checked', $(this).prop('checked'));

					updateLabel ();
					//updateItems ();
				});

				mobiInputs.on('change', function () {
					deskInputs.click();

					updateLabel ();
					//updateItems ();

					//subSave.show();
				});
			});
		}

		if ($(this).find('.js-filter-r').length > 0) {
			var range = $(this).find('.js-range');
			var rangeBox = range.find('.js-range--box');

			var xsRange = range.clone();
			var xsRangeBox = xsRange.find('.js-range--box');

			xsRange.find('input').each(function () {
				$(this).attr('name', 'xs-' + $(this).attr('name'));
			});

			range.each(function () {
				var start = $(this).find('.js-range--start');
				var end = $(this).find('.js-range--end');

				rangeBox.ionRangeSlider({
					type: "double",

					onStart: function (data) {
						start.val(data.from);
						end.val(data.to);
					},

					onChange: function (data) {
						start.val(data.from);
						end.val(data.to);
					},

					onFinish: function (data) {
						start.val(data.from);
						end.val(data.to);

						var slider = xsRangeBox.data('ionRangeSlider');
						smartFilter.keyup(document.getElementById(start.attr('id')));
						slider.update({
							from: data.from,
							to: data.to
						});

						//updateItems ();
					},

					onUpdate: function (data) {
						start.val(data.from);
						end.val(data.to);

						//updateItems ();
					},
				});
			});

			xsRange.each(function () {
				var start = $(this).find('.js-range--start');
				var end = $(this).find('.js-range--end');

				xsRangeBox.ionRangeSlider({
					type: "double",

					onStart: function (data) {
						start.val(data.from);
						end.val(data.to);
					},

					onChange: function (data) {
						start.val(data.from);
						end.val(data.to);
					},

					onFinish: function (data) {
						var slider = rangeBox.data('ionRangeSlider');

						slider.update({
							from: data.from,
							to: data.to
						});

						updateLabel ();
						var slider = xsRangeBox.data('ionRangeSlider');
						smartFilter.keyup(document.getElementById(start.attr('id')));
						slider.update({
							from: data.from,
							to: data.to
						});
						//subSave.show();
					},

					onUpdate: function (data) {
						start.val(data.from);
						end.val(data.to);

						updateLabel ();
					},
				});
			});

			function updateLabel () {
				var values = xsRangeBox.prop('value').split(';');

				if ((values[0] == xsRangeBox.data('min')) && (values[1] == xsRangeBox.data('max'))) {
					link.find('span').html('');
				} else {
					link.find('span').html('от ' + values[0] + ' до ' + values[1]);
				}
			}

			rangeBox.on('clear', function () {
				var slider = xsRangeBox.data('ionRangeSlider');

				slider.update({
					from: rangeBox.data('min'),
					to: rangeBox.data('max')
				});

				updateLabel ();
			})

			subItems.append(xsRange);
		}

		subBody.append(subItems);

		sub.append(subHead);
		sub.append(subBody);
		sub.append(subSave);

		$('.filter').append(sub);

		link.on('click', function (e) {
			e.preventDefault();
			subSave.hide();
			sub.addClass('is-shown');
		});

		subBack.on('click', function (e) {
			e.preventDefault();

			sub.removeClass('is-shown');
		});

		subSave.on('click', function (e) {
			e.preventDefault();

			sub.removeClass('is-shown');
		});
	});

	$('.filter--clear').on('click', function () {
		canUpdate = false;
		window.location.href=$('#forclrxs').val();
		/*filter.find('.checkbox input, .radiobox input').prop('checked', false);
		filter.find('.checkbox input, .radiobox input').trigger('change');

		filter.find('.js-range').each(function () {
			var box = $(this).find('.js-range--box');
			var slider = box.data('ionRangeSlider');

			slider.update({
				from: box.data('min'),
				to: box.data('max')
			});

			box.trigger('clear');
		});*/

		canUpdate = true;

		//updateItems();
	});

});
