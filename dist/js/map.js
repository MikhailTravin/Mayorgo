function initMap () {
	var mapOptions = {
			scrollwheel: false,
			disableDefaultUI: true,
			styles: [{"featureType":"administrative","elementType":"labels.text.fill","stylers": [{"color":"#666666"}]},{"featureType":"administrative","elementType":"labels.icon","stylers": [{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers": [{"color":"#ced6dc"}]},{"featureType":"poi","elementType":"all","stylers": [{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers": [{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers": [{"visibility":"on"},{"hue":"#0081ff"}]},{"featureType":"road","elementType":"all","stylers": [{"saturation": -100},{"lightness": 45}]},{"featureType":"road.highway","elementType":"all","stylers": [{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers": [{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers": [{"visibility":"off"}]},{"featureType":"transit.station.rail","elementType":"all","stylers": [{"visibility":"on"}]},{"featureType":"transit.station.rail","elementType":"labels.text.fill","stylers": [{"color":"#333333"}]},{"featureType":"transit.station.rail","elementType":"labels.icon","stylers": [{"hue":"#0081ff"}]},{"featureType":"water","elementType":"all","stylers": [{"color":"#6699cc"},{"visibility":"on"},{"gamma":"1"},{"lightness":"0"},{"saturation":"0"}]},{"featureType":"water","elementType":"labels.text.fill","stylers": [{"color":"#ffffff"}]}]
		};

	$('[data-map]').each(function () {
		var box = $(this);
		var map = new google.maps.Map(box.find('[data-map-box]')[0], mapOptions);
		var markers = [];
		var bounds = new google.maps.LatLngBounds();

		box.on('refresh', function () {
			google.maps.event.trigger(map, 'resize');
			map.fitBounds(bounds);
		});

		function showMarkers (_city) {
			markers = [];
			bounds = new google.maps.LatLngBounds();

			box.find('.maplist--item').hide();
			box.find('.maplist--item[data-city=' + _city + ']').show();

			box.find('.maplist--item[data-city=' + _city + ']').each(function () {
				var data = $(this).data('marker');
				var pos = {lat: data.lat, lng: data.lng};
				var item = {
					info: data,
					marker: new google.maps.Marker({
						position: pos,
						map: map,
						title: data.title
					}),

					infoWindow: new google.maps.InfoWindow({
						content: data.balloon
					})
				}

				item.marker.addListener('click', function() {
					$.each(markers, function () {
						this.infoWindow.close(map, this.marker);
					});

					item.infoWindow.open(map, item.marker);
				});

				bounds.extend(item.marker.getPosition());

				markers.push(item);

				$(this).find('.maplist--item-n').off('click');
				$(this).find('.maplist--item-n').on('click', function (e) {
					e.preventDefault();

					map.setCenter(item.marker.getPosition());
					map.setZoom(16);
				});
			});

			map.fitBounds(bounds);
		}

		showMarkers (box.data('city'));

		box.find('.maplist--tab').on('click', function (e) {
			e.preventDefault();

			var maplist = $(this).closest('.maplist');
			var toShow = $(this).data('maplist-type');

			maplist.find('.maplist--tab.is-active').removeClass('is-active');
			$(this).addClass('is-active');

			if (toShow == 'all') {
				maplist.find('.maplist--item').show();

				$.each(markers, function () {
					this.marker.setVisible(true);
				});
			} else {
				maplist.find('.maplist--item').hide();
				maplist.find('.maplist--item[data-maplist-type*=' + toShow + ']').show();

				$.each(markers, function () {
					this.marker.setVisible(false);

					if (this.info.type.indexOf(toShow) != -1) {
						this.marker.setVisible(true);
					} else {
						this.infoWindow.close(map, this.marker);
					}
				});
			}
		});

		box.find('[data-city-select]').on('change', function () {
			showMarkers ($(this).val());
		});
	});

	$('[data-alt-map]').each(function () {
		var box = $(this);
		var markers = [];

		function showMarkers (_city) {
			box.find('.maplist--item').hide();
			box.find('.maplist--item[data-city=' + _city + ']').show();
		}

		showMarkers (box.data('city'));

		box.find('[data-city-select]').on('change', function () {
			showMarkers ($(this).val());
		});
	});

	$('[data-xs-map]').each(function () {
		var box = $(this);
		var map = new google.maps.Map(box.find('[data-xs-map-body]')[0], mapOptions);
		var head = box.find('[data-xs-map-head]');
		var markers = [];

		box.on('refresh', function () {
			google.maps.event.trigger(map, 'resize');

			showMarker ();
		});

		function showMarker () {
			if (box.attr('data-marker')) {
				$.each(markers, function () {
					this.marker.setMap(null);
					this.infoWindow.close();
				});

				markers = [];

				var data = JSON.parse(box.attr('data-marker'));

				var pos = {lat: data.lat, lng: data.lng};
				var item = {
					info: data,
					marker: new google.maps.Marker({
						position: pos,
						map: map,
						title: data.title
					}),

					infoWindow: new google.maps.InfoWindow({
						content: data.balloon
					})
				}

				head.html(data.title);

				item.marker.addListener('click', function() {
					item.infoWindow.open(map, item.marker);
				});

				markers.push(item);

				map.setCenter(pos);
				map.setZoom(16);
			}
		}

		showMarker ();

	});
setTimeout(function (){
	if($('.maplist--side .maplist--item-n').length==1)
		$('.maplist--side .maplist--item-n').click();
},1000);

}