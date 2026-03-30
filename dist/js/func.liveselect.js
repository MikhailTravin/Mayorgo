function LiveSelect (element) {
  var _t = {};

  _t.el = element;
  _t.placeholder = _t.el.attr('placeholder');
  _t.classes = _t.el.attr('class') || '';

  _t.el.on('live_clear', function () {
    _t.el.prop('selectedIndex', -1);
    _t.el.trigger('change');

    _t.destroyDOM ();
    _t.createDOM ();
  });

  _t.destroyDOM = function () {
    _t.box.remove();
  }

  _t.createDOM = function () {
    _t.box = $('<div />');

    _t.box.attr('class', 'liveselect is-placeholder ' + _t.classes);
    _t.box.insertAfter(_t.el);

    _t.el.addClass('liveselect--element');

    _t.title = $('<div class="liveselect--title" />');

    _t.title.html(_t.placeholder);

    _t.inBox = $('<div class="liveselect--box" />');
    _t.list = $('<div class="liveselect--list scrollbar-inner" />');

    if (_t.el.hasClass('is-size')) {
     // _t.group = $('<div class="liveselect--group" />');

     // _t.group.append('<span>Российские размеры</span>');
      //_t.group.append('<span>Размеры производителя</span>');

      _t.list.append(_t.group);
    }

    _t.inBox.html(_t.list);

    _t.box.append(_t.title);
    _t.box.append(_t.inBox);

    _t.items = [];

    _t.title.on('click', function () {
      (_t.box.hasClass('is-opened')) ? _t.hideSelect() : _t.openSelect();
    });

    $.each(_t.el.find('option'), function () {
      var option = $(this);
      var item = $('<div class="liveselect--item" />');

      if (_t.el.hasClass('is-size')) {
        item.html('<span>' + option.html() + '</span><span>' + option.data('size') + '</span>');

        if (option.attr('data-soldout') == 'true') {
          item.html(item.html() + '<span>Узнать</span>');
          item.addClass('is-soldout');
        }
      } else {
        item.html(option.html());
      }

      item.on('click', function () {
        _t.selectItem (item, option.attr('value'));
      });
      if (option.attr('selected') && !(_t.placeholder))
        item.trigger('click');

      _t.items.push(item);
      _t.list.append(item);
    });

    if (_t.el.find('option[selected]').length <= 0) {
        if (_t.items[0] !== undefined)
            _t.items[0].trigger('click');
        }

    $(document).on({
      click: function (e) {
          if (_t.box.hasClass('is-opened') && !$(e.target).closest(_t.box).length)
            _t.hideSelect();
        },

      keyup: function (e) {
          if (e.keyCode == 27)
            _t.hideSelect();
        }
    });
  }

  _t.openSelect = function () {
    _t.box.addClass('is-opened');
    _t.inBox.slideDown({
      duration: 200,

      progress: function (animation, progress, remainingMs) {
          _t.inBox.css('opacity', progress);
          _t.inBox.css('margin-top', -1 * (progress * 46));
        },

      complete: function () {
          _t.inBox.css('opacity', 1);
          _t.inBox.css('margin-top', -46);
        }
    });
  }

  _t.hideSelect = function () {
    _t.inBox.slideUp({
      duration: 200,

      complete: function () {
          _t.inBox.css('opacity', 0);
          _t.inBox.css('margin-top', 0);

          _t.box.removeClass('is-opened');
        }
    });
  }

  _t.selectItem = function (item, id) {
    var option = _t.el.find('option[value=' + id + ']');

    _t.box.removeClass('is-placeholder');
    _t.el.find('option').prop('selected', false);

    $.each(_t.items, function () {
      $(this).removeClass('is-active');
    });

    option.prop('selected', true);
    item.addClass('is-active');

    if (_t.el.hasClass('is-size')) {
      _t.title.html(option.html());
    } else {
      _t.title.html((_t.el.data('label') || '') + option.html());
    }

    _t.hideSelect();

    _t.el.trigger('change');
  }

  _t.createDOM();

  return _t;
}
