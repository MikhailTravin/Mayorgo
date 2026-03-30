$.fn.serializeObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
$(document).ready(function () {
	$('.forsmsxin').click(function (){
		if($('.coderint').val())
		{
			var pho = false;
			if($('.phexinp').val()) {
				pho = $('.phexinp').val().replace(' ', '').replace(' ', '').replace('+', '').replace('(', '').replace(')', '').replace('-', '').replace('-', '');
				if (pho.length > 10) {
					$.post('/bitrix/ajax/phreg.php', {PHPH: pho, CO: $('.coderint').val()}, function (data) {
						if (data) {
							var dеx = JSON.parse(data);
							console.log(dеx);
							//if (dеx.length) {
							if (dеx.AUTH) {
								window.location.href='';
							}
							//}
						}
					});
				}
			}

		}
	});
	$('.forsmsx').click(function (){
		var pho = false;
		if($('.phexinp').val()) {

			pho = $('.phexinp').val().replace(' ', '').replace(' ', '').replace('+', '').replace('(', '').replace(')', '').replace('-', '').replace('-', '');
			if(pho.length>10)
			{
				$.post('/bitrix/ajax/phreg.php',{PHPH:pho,SENDR:true},function (data){
					if(data) {
						var dеx = JSON.parse(data);
						console.log(dеx);
						//if (dеx.length) {
							if(dеx.OK)
							{
								$('.fortelinv').hide();
								$('.forcodeenter').show();
							}else if(dеx.NOUSER){
								$('.nouserblock').show();
								setTimeout(function (){$('.nouserblock').hide();},3000);
							}
						//}
					}
				});
			}
		}
	});
	$('.m-field--input').on('input keyup', function () {
		$(this).closest('.m-field').removeClass('is-error');
		$(this).closest('.m-field').find('.m-field--error').slideUp(300, function () {
			$(this).remove();
		});
	});

	// Item form

	$(document).on({
		click: function (e) {
				if ($('.item--form-d').is(':visible') && !$(e.target).closest($('.item--form')).length) {
					$('.item--form-h a').removeClass('is-active');
					$('.item--form-d').fadeOut(300);
				}
			},

		keyup: function (e) {
				if (e.keyCode == 27) {
					$('.item--form-h a').removeClass('is-active');
					$('.item--form-d').fadeOut(300);
				}
			}
	});

	$(document).on('click', '.item--form-h a', function (e) {
		e.preventDefault();

		var form = $(this).closest('.item--form');
		var drop = form.find('.item--form-d');

		$(this).addClass('is-active');

		drop.find('input[type="text"]').val('');
		drop.find('.item--form-f').removeClass('is-success');
		drop.fadeIn(300, function () {
			drop.find('input[type="text"]').first().focus();
		});
	});

	$(document).on('input keyup', '.item--form-input', function () {
		var form = $(this).closest('.item--form-f');

		form.removeClass('is-error');

		($(this).val() != '') ? form.addClass('has-value') : form.removeClass('has-value');
	});

	$(document).on('submit', '.item--form-f', function (e) {
		e.preventDefault();

		var mail = $(this).find('.item--form-input').val();

		$(this).removeClass('is-error');

		if ((/\S+@\S+\.\S+/).test(mail)) {
			// AJAX request here

			$(this).html($(this).data('success'));
			$(this).addClass('is-success');
		} else {
			$(this).addClass('is-error');
		}

		return false;
	});
	// Footer

	$('.footer--input').on('input keyup', function () {
		var form = $(this).closest('.footer--subscribe');

		form.removeClass('is-error');

		($(this).val() != '') ? form.addClass('has-value') : form.removeClass('has-value');
	});

	$('.footer--subscribe').on('submit', function (e) {
		e.preventDefault();

		var mail = $(this).find('.footer--input').val();

		$(this).removeClass('is-error');

		if ((/\S+@\S+\.\S+/).test(mail)) {
			// AJAX request here

			$(this).html($(this).data('success'));
			$(this).addClass('is-success');
		} else {
			$(this).addClass('is-error');
		}

		return false;
	});

	// Header

	$('.js-search').on('click', function (e) {
		e.preventDefault();

		$('.header--search').fadeIn(200, function () {
			$(this).find('input[type="text"]').first().focus();
		})
	});

	$('.header--input').on('input keyup', function () {
		var form = $(this).closest('.header--search');

		form.removeClass('is-error');
	});

	$('.header--search').on('submit', function (e) {
		var query = $(this).find('.header--input').val();

		$(this).removeClass('is-error');

		if (query.length >= 3)
			return true;

		$(this).addClass('is-error');

		return false;
	});

	// Phone

	$('.js-phone-code').mask('9999');
	$('.js-phone').mask('+7 (999) 999-99-99');
	$('.js-date').mask('99.99.9999');

	// Corporate

	$('.cooperation--form, [data-order-form], [data-account-form], [data-recovery-form], [data-auth-form], [data-signup-form], [data-ajax-form]').on('submit', function (e) {
		if($(this).attr('data-order-form')!='true')
			e.preventDefault();
		var form = $(this);
		var inputs = form.find('.m-field--input.is-required');
		var valide = true;

		form.find('.m-error').slideUp(200, function () {
			$(this).remove();
		});

		function showError (field, label) {
			valide = false;

			var errorLabel = $('<div class="m-field--error">' + label + '</div>');
			if(!field.find('.js-pass-re'))
			{
				errorLabel.hide();
			}else {
				field.find('.m-field--error').remove();
			}

			field.addClass('is-error');
			field.append(errorLabel);
			errorLabel.slideDown(300);
		}

		inputs.each(function () {
			var field = $(this).closest('.m-field');

			field.removeClass('is-error');
			field.find('.m-field--error').remove();

			if ($(this).val() == '') {
				showError ($(this).closest('.m-field'), 'Обязательное поле');
			} else {

				//if ($(this).hasClass('js-phone'))
				//	if(!(/\+\d{1}\(\d{3}\)\d{3}-\d{4}/g).test($(this).val()))
				//		showError ($(this).closest('.m-field'), 'Обязательное поле');
				if ($(this).hasClass('js-mail'))
					if (!(/\S+@\S+\.\S+/).test($(this).val()))
						showError ($(this).closest('.m-field'), 'Должен быть введен корректный e-mail');

				if ($(this).hasClass('js-pass-re'))
					if ($(this).val() != inputs.filter('.js-pass').val())
						showError ($(this).closest('.m-field'), 'Пароли не совпадают');
			}
		});

		if (form.is('[data-account-form]'))
		{
			if (($('.js-pass-re').val() || $('.js-pass').val()))
			{
				if($('.js-pass-re').val() != $('.js-pass').val())
					showError ($('.js-pass-re').closest('.m-field'), 'Пароли не совпадают');
				else if($('.js-pass-re').val().length<6)
					showError ($('.js-pass-re').closest('.m-field'), 'Пароль должен быть не менее 6 символов');
			}


			form.find('.account--success').slideUp(300);
		}



		if (valide) {
			if($(this).attr('data-order-form')!='true') {

				var typeojdh = 'text';
				var dadatd = form.serialize();

				if (form.is('[data-signup-form]')) {
					if (window.recaptcha && typeof window.recaptcha.getToken === 'function') {
						dadatd += '&recaptcha_token=' + window.recaptcha.getToken();
					} else {
						console.warn('reCAPTCHA not loaded');
					}
				}

				$.ajax({
					url: form.attr('action'),
					method: form.attr('method'),
					data: dadatd,
					dataType: typeojdh,
					success: function (r) {
						form.addClass('is-success');

						if (form.is('[data-recovery-form]'))
							form.find('input').prop('disabled', true);

						if (form.is('[data-auth-form]') || form.is('[data-signup-form]')) {
							var data = JSON.parse(r);
							if (data.status == 'error') {
								form.removeClass('is-success');
								var error = $('<div class="m-error">' + data.message + "</div>");
								error.hide();
								form.append(error);
								error.slideDown(200);
							} else {
								window.location.href='';
							}
						}

						if (form.is('[data-account-form]'))
							form.find('.account--success').slideDown(300);
					}
				});
			}
		} else {
			e.preventDefault();
			form.find('.m-field.is-error input').first().focus();
			return false;
		}
		if($(this).attr('data-order-form')!='true')
			return false;

	});

	$('.cooperation--resend').on('click', function (e) {
		e.preventDefault();

		var form = $(this).closest('.cooperation--form');
		var inputs = form.find('.m-field--input');

		inputs.val('');
		form.removeClass('is-success');
		inputs.first().focus();

		return false;
	});

	// Promo

	$('.cart--form').on('submit', function (e) {
		//e.preventDefault();

		var form = $(this);
		var input = form.find('.cart--input');
		var valide = true;

		if (input.val() == '') {
			valide = false;

			input.addClass('is-error');
			input.focus();
		}

		if (valide) {
			/*$.ajax({
				url: form.attr('action'),
				method: form.attr('method'),
				data: form.serialize(),
				dataType: 'text',

				success: function (r) {
					var data = JSON.parse(r);

					if (data.status == 'OK') {
						form.addClass('is-success');
						form.html(form.data('success').replace('{0}', input.val()));

						$.each(data.prices, function () {
							$('[data-promo-price=' + this.id + '] span').html(this.price);
							$('[data-promo-total=' + this.id + '] span').html(this.total);
						});
					} else {
						input.addClass('is-error');
						input.focus();
					}
				}
			});*/
		}else
		{
			e.preventDefault();
			return false;
		}


	});

	$('.cart--input').on('input keyup', function () {
		$(this).removeClass('is-error');
	});

});
