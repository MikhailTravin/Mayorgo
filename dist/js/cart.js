$(document).ready(function () {

	$('.cart--counter').each(function () {
		var minus = $(this).find('.is-minus');
		var plus = $(this).find('.is-plus');
		var input = $(this).find('input');

		minus.on('click', function (e) {
			e.preventDefault();

			var n = parseInt(input.val()),
				e = (n <= 1) ? 1 : n - 1;

			input.val(e);
			input.trigger('change');
		});

		plus.on('click', function (e) {
			e.preventDefault();

			var n = parseInt(input.val()),
			e = (n > 998) ? 999 : n + 1;
			if(e>parseInt(input.attr('maxi')))
				e=parseInt(input.attr('maxi'));
			input.val(e);
			input.trigger('change');
		});

		if ($(this).closest('[data-cart-row]').length > 0) {
			var row = $(this).closest('[data-cart-row]');
			var size = row.attr('data-sel-size');
			var price = row.find('[data-cart-tprice]')
			var priceold = row.find('[data-cart-totalAllPrice]')
			var priceAll = $('[data-cart-tprice-all]');
			var quantall = $('[data-cart-tquantity]');
			var priceallall = $('[data-cart-tquantity-full]');

			input.on('change', function () {
				$.ajax({
					url: row.attr('data-count-url'),
					data: {
						size: size,
						count: input.val()
					},

					method: 'GET',
					dataType: 'text',

					success: function (r) {
						var data = JSON.parse(r);

						quantall.html(data.totalQuantity);
						priceAll.html(data.totalCartPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));
						priceallall.html(data.totalFullPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));
						price.html(data.totalPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));
						priceold.html(data.totalAllPrice.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '));
					}
				});
			});
		}
	});

	$('[data-cart-delete]').on('click', function (e) {
		e.preventDefault();

		var row = $(this).closest('[data-cart-row]');
		var size = row.attr('data-sel-size');
		var input = row.find('.cart--counter input');

		$.ajax({
			url: $(this).attr('href'),
			data: {
				size: size,
				count: input.val()
			},

			method: 'GET',
			dataType: 'text',

			success: function (r) {
				// var data = JSON.parse(r);

				row.fadeOut(300, function () {
					$(this).remove();
					window.location.href='';
				});
			}
		});
	});

	$('[data-cart-size]').on('change', function () {
		var size = $(this);
		var row = $(this).closest('[data-cart-row]');
		var photo = row.find('[data-cart-photo]');
		var id = $(this).val();

		var oldSize = row.attr('data-sel-size');

		row.attr('data-sel-size', id);

		$.ajax({
			url: row.data('change-url'),
			data: {
				sizes: {
					old: oldSize,
					new: $(this).val()
				},

				colors: {
					old: row.attr('data-sel-color'),
					new: row.attr('data-sel-color'),
				},

				changed: 'size'
			},

			method: 'GET',
			dataType: 'text',

			success: function (r) {
				// var data = JSON.parse(r);
			}
		});
	});

});
