/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*!
	Colorbox 1.6.4
	license: MIT
	http://www.jacklmoore.com/colorbox
*/
(function ($, document, window) {
	var
	// Default settings object.
	// See http://jacklmoore.com/colorbox for details.
	defaults = {
		// data sources
		html: false,
		photo: false,
		iframe: false,
		inline: false,

		// behavior and appearance
		transition: "elastic",
		speed: 300,
		fadeOut: 300,
		width: false,
		initialWidth: "600",
		innerWidth: false,
		maxWidth: false,
		height: false,
		initialHeight: "450",
		innerHeight: false,
		maxHeight: false,
		scalePhotos: true,
		scrolling: true,
		opacity: 0.9,
		preloading: true,
		className: false,
		overlayClose: true,
		escKey: true,
		arrowKey: true,
		top: false,
		bottom: false,
		left: false,
		right: false,
		fixed: false,
		data: undefined,
		closeButton: true,
		fastIframe: true,
		open: false,
		reposition: true,
		loop: true,
		slideshow: false,
		slideshowAuto: true,
		slideshowSpeed: 2500,
		slideshowStart: "start slideshow",
		slideshowStop: "stop slideshow",
		photoRegex: /\.(gif|png|jp(e|g|eg)|bmp|ico|webp|jxr|svg)((#|\?).*)?$/i,

		// alternate image paths for high-res displays
		retinaImage: false,
		retinaUrl: false,
		retinaSuffix: '@2x.$1',

		// internationalization
		current: "image {current} of {total}",
		previous: "previous",
		next: "next",
		close: "close",
		xhrError: "This content failed to load.",
		imgError: "This image failed to load.",

		// accessbility
		returnFocus: true,
		trapFocus: true,

		// callbacks
		onOpen: false,
		onLoad: false,
		onComplete: false,
		onCleanup: false,
		onClosed: false,

		rel: function() {
			return this.rel;
		},
		href: function() {
			// using this.href would give the absolute url, when the href may have been inteded as a selector (e.g. '#container')
			return $(this).attr('href');
		},
		title: function() {
			return this.title;
		},
		createImg: function() {
			var img = new Image();
			var attrs = $(this).data('cbox-img-attrs');

			if (typeof attrs === 'object') {
				$.each(attrs, function(key, val){
					img[key] = val;
				});
			}

			return img;
		},
		createIframe: function() {
			var iframe = document.createElement('iframe');
			var attrs = $(this).data('cbox-iframe-attrs');

			if (typeof attrs === 'object') {
				$.each(attrs, function(key, val){
					iframe[key] = val;
				});
			}

			if ('frameBorder' in iframe) {
				iframe.frameBorder = 0;
			}
			if ('allowTransparency' in iframe) {
				iframe.allowTransparency = "true";
			}
			iframe.name = (new Date()).getTime(); // give the iframe a unique name to prevent caching
			iframe.allowFullscreen = true;

			return iframe;
		}
	},

	// Abstracting the HTML and event identifiers for easy rebranding
	colorbox = 'colorbox',
	prefix = 'cbox',
	boxElement = prefix + 'Element',

	// Events
	event_open = prefix + '_open',
	event_load = prefix + '_load',
	event_complete = prefix + '_complete',
	event_cleanup = prefix + '_cleanup',
	event_closed = prefix + '_closed',
	event_purge = prefix + '_purge',

	// Cached jQuery Object Variables
	$overlay,
	$box,
	$wrap,
	$content,
	$topBorder,
	$leftBorder,
	$rightBorder,
	$bottomBorder,
	$related,
	$window,
	$loaded,
	$loadingBay,
	$loadingOverlay,
	$title,
	$current,
	$slideshow,
	$next,
	$prev,
	$close,
	$groupControls,
	$events = $('<a/>'), // $({}) would be prefered, but there is an issue with jQuery 1.4.2

	// Variables for cached values or use across multiple functions
	settings,
	interfaceHeight,
	interfaceWidth,
	loadedHeight,
	loadedWidth,
	index,
	photo,
	open,
	active,
	closing,
	loadingTimer,
	publicMethod,
	div = "div",
	requests = 0,
	previousCSS = {},
	init;

	// ****************
	// HELPER FUNCTIONS
	// ****************

	// Convenience function for creating new jQuery objects
	function $tag(tag, id, css) {
		var element = document.createElement(tag);

		if (id) {
			element.id = prefix + id;
		}

		if (css) {
			element.style.cssText = css;
		}

		return $(element);
	}

	// Get the window height using innerHeight when available to avoid an issue with iOS
	// http://bugs.jquery.com/ticket/6724
	function winheight() {
		return window.innerHeight ? window.innerHeight : $(window).height();
	}

	function Settings(element, options) {
		if (options !== Object(options)) {
			options = {};
		}

		this.cache = {};
		this.el = element;

		this.value = function(key) {
			var dataAttr;

			if (this.cache[key] === undefined) {
				dataAttr = $(this.el).attr('data-cbox-'+key);

				if (dataAttr !== undefined) {
					this.cache[key] = dataAttr;
				} else if (options[key] !== undefined) {
					this.cache[key] = options[key];
				} else if (defaults[key] !== undefined) {
					this.cache[key] = defaults[key];
				}
			}

			return this.cache[key];
		};

		this.get = function(key) {
			var value = this.value(key);
			return $.isFunction(value) ? value.call(this.el, this) : value;
		};
	}

	// Determine the next and previous members in a group.
	function getIndex(increment) {
		var
		max = $related.length,
		newIndex = (index + increment) % max;

		return (newIndex < 0) ? max + newIndex : newIndex;
	}

	// Convert '%' and 'px' values to integers
	function setSize(size, dimension) {
		return Math.round((/%/.test(size) ? ((dimension === 'x' ? $window.width() : winheight()) / 100) : 1) * parseInt(size, 10));
	}

	// Checks an href to see if it is a photo.
	// There is a force photo option (photo: true) for hrefs that cannot be matched by the regex.
	function isImage(settings, url) {
		return settings.get('photo') || settings.get('photoRegex').test(url);
	}

	function retinaUrl(settings, url) {
		return settings.get('retinaUrl') && window.devicePixelRatio > 1 ? url.replace(settings.get('photoRegex'), settings.get('retinaSuffix')) : url;
	}

	function trapFocus(e) {
		if ('contains' in $box[0] && !$box[0].contains(e.target) && e.target !== $overlay[0]) {
			e.stopPropagation();
			$box.focus();
		}
	}

	function setClass(str) {
		if (setClass.str !== str) {
			$box.add($overlay).removeClass(setClass.str).addClass(str);
			setClass.str = str;
		}
	}

	function getRelated(rel) {
		index = 0;

		if (rel && rel !== false && rel !== 'nofollow') {
			$related = $('.' + boxElement).filter(function () {
				var options = $.data(this, colorbox);
				var settings = new Settings(this, options);
				return (settings.get('rel') === rel);
			});
			index = $related.index(settings.el);

			// Check direct calls to Colorbox.
			if (index === -1) {
				$related = $related.add(settings.el);
				index = $related.length - 1;
			}
		} else {
			$related = $(settings.el);
		}
	}

	function trigger(event) {
		// for external use
		$(document).trigger(event);
		// for internal use
		$events.triggerHandler(event);
	}

	var slideshow = (function(){
		var active,
			className = prefix + "Slideshow_",
			click = "click." + prefix,
			timeOut;

		function clear () {
			clearTimeout(timeOut);
		}

		function set() {
			if (settings.get('loop') || $related[index + 1]) {
				clear();
				timeOut = setTimeout(publicMethod.next, settings.get('slideshowSpeed'));
			}
		}

		function start() {
			$slideshow
				.html(settings.get('slideshowStop'))
				.unbind(click)
				.one(click, stop);

			$events
				.bind(event_complete, set)
				.bind(event_load, clear);

			$box.removeClass(className + "off").addClass(className + "on");
		}

		function stop() {
			clear();

			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);

			$slideshow
				.html(settings.get('slideshowStart'))
				.unbind(click)
				.one(click, function () {
					publicMethod.next();
					start();
				});

			$box.removeClass(className + "on").addClass(className + "off");
		}

		function reset() {
			active = false;
			$slideshow.hide();
			clear();
			$events
				.unbind(event_complete, set)
				.unbind(event_load, clear);
			$box.removeClass(className + "off " + className + "on");
		}

		return function(){
			if (active) {
				if (!settings.get('slideshow')) {
					$events.unbind(event_cleanup, reset);
					reset();
				}
			} else {
				if (settings.get('slideshow') && $related[1]) {
					active = true;
					$events.one(event_cleanup, reset);
					if (settings.get('slideshowAuto')) {
						start();
					} else {
						stop();
					}
					$slideshow.show();
				}
			}
		};

	}());


	function launch(element) {
		var options;

		if (!closing) {

			options = $(element).data(colorbox);

			settings = new Settings(element, options);

			getRelated(settings.get('rel'));

			if (!open) {
				open = active = true; // Prevents the page-change action from queuing up if the visitor holds down the left or right keys.

				setClass(settings.get('className'));

				// Show colorbox so the sizes can be calculated in older versions of jQuery
				$box.css({visibility:'hidden', display:'block', opacity:''});

				$loaded = $tag(div, 'LoadedContent', 'width:0; height:0; overflow:hidden; visibility:hidden');
				$content.css({width:'', height:''}).append($loaded);

				// Cache values needed for size calculations
				interfaceHeight = $topBorder.height() + $bottomBorder.height() + $content.outerHeight(true) - $content.height();
				interfaceWidth = $leftBorder.width() + $rightBorder.width() + $content.outerWidth(true) - $content.width();
				loadedHeight = $loaded.outerHeight(true);
				loadedWidth = $loaded.outerWidth(true);

				// Opens inital empty Colorbox prior to content being loaded.
				var initialWidth = setSize(settings.get('initialWidth'), 'x');
				var initialHeight = setSize(settings.get('initialHeight'), 'y');
				var maxWidth = settings.get('maxWidth');
				var maxHeight = settings.get('maxHeight');

				settings.w = Math.max((maxWidth !== false ? Math.min(initialWidth, setSize(maxWidth, 'x')) : initialWidth) - loadedWidth - interfaceWidth, 0);
				settings.h = Math.max((maxHeight !== false ? Math.min(initialHeight, setSize(maxHeight, 'y')) : initialHeight) - loadedHeight - interfaceHeight, 0);

				$loaded.css({width:'', height:settings.h});
				publicMethod.position();

				trigger(event_open);
				settings.get('onOpen');

				$groupControls.add($title).hide();

				$box.focus();

				if (settings.get('trapFocus')) {
					// Confine focus to the modal
					// Uses event capturing that is not supported in IE8-
					if (document.addEventListener) {

						document.addEventListener('focus', trapFocus, true);

						$events.one(event_closed, function () {
							document.removeEventListener('focus', trapFocus, true);
						});
					}
				}

				// Return focus on closing
				if (settings.get('returnFocus')) {
					$events.one(event_closed, function () {
						$(settings.el).focus();
					});
				}
			}

			var opacity = parseFloat(settings.get('opacity'));
			$overlay.css({
				opacity: opacity === opacity ? opacity : '',
				cursor: settings.get('overlayClose') ? 'pointer' : '',
				visibility: 'visible'
			}).show();

			if (settings.get('closeButton')) {
				$close.html(settings.get('close')).appendTo($content);
			} else {
				$close.appendTo('<div/>'); // replace with .detach() when dropping jQuery < 1.4
			}

			load();
		}
	}

	// Colorbox's markup needs to be added to the DOM prior to being called
	// so that the browser will go ahead and load the CSS background images.
	function appendHTML() {
		if (!$box) {
			init = false;
			$window = $(window);
			$box = $tag(div).attr({
				id: colorbox,
				'class': $.support.opacity === false ? prefix + 'IE' : '', // class for optional IE8 & lower targeted CSS.
				role: 'dialog',
				tabindex: '-1'
			}).hide();
			$overlay = $tag(div, "Overlay").hide();
			$loadingOverlay = $([$tag(div, "LoadingOverlay")[0],$tag(div, "LoadingGraphic")[0]]);
			$wrap = $tag(div, "Wrapper");
			$content = $tag(div, "Content").append(
				$title = $tag(div, "Title"),
				$current = $tag(div, "Current"),
				$prev = $('<button type="button"/>').attr({id:prefix+'Previous'}),
				$next = $('<button type="button"/>').attr({id:prefix+'Next'}),
				$slideshow = $('<button type="button"/>').attr({id:prefix+'Slideshow'}),
				$loadingOverlay
			);

			$close = $('<button type="button"/>').attr({id:prefix+'Close'});

			$wrap.append( // The 3x3 Grid that makes up Colorbox
				$tag(div).append(
					$tag(div, "TopLeft"),
					$topBorder = $tag(div, "TopCenter"),
					$tag(div, "TopRight")
				),
				$tag(div, false, 'clear:left').append(
					$leftBorder = $tag(div, "MiddleLeft"),
					$content,
					$rightBorder = $tag(div, "MiddleRight")
				),
				$tag(div, false, 'clear:left').append(
					$tag(div, "BottomLeft"),
					$bottomBorder = $tag(div, "BottomCenter"),
					$tag(div, "BottomRight")
				)
			).find('div div').css({'float': 'left'});

			$loadingBay = $tag(div, false, 'position:absolute; width:9999px; visibility:hidden; display:none; max-width:none;');

			$groupControls = $next.add($prev).add($current).add($slideshow);
		}
		if (document.body && !$box.parent().length) {
			$(document.body).append($overlay, $box.append($wrap, $loadingBay));
		}
	}

	// Add Colorbox's event bindings
	function addBindings() {
		function clickHandler(e) {
			// ignore non-left-mouse-clicks and clicks modified with ctrl / command, shift, or alt.
			// See: http://jacklmoore.com/notes/click-events/
			if (!(e.which > 1 || e.shiftKey || e.altKey || e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				launch(this);
			}
		}

		if ($box) {
			if (!init) {
				init = true;

				// Anonymous functions here keep the public method from being cached, thereby allowing them to be redefined on the fly.
				$next.click(function () {
					publicMethod.next();
				});
				$prev.click(function () {
					publicMethod.prev();
				});
				$close.click(function () {
					publicMethod.close();
				});
				$overlay.click(function () {
					if (settings.get('overlayClose')) {
						publicMethod.close();
					}
				});

				// Key Bindings
				$(document).bind('keydown.' + prefix, function (e) {
					var key = e.keyCode;
					if (open && settings.get('escKey') && key === 27) {
						e.preventDefault();
						publicMethod.close();
					}
					if (open && settings.get('arrowKey') && $related[1] && !e.altKey) {
						if (key === 37) {
							e.preventDefault();
							$prev.click();
						} else if (key === 39) {
							e.preventDefault();
							$next.click();
						}
					}
				});

				if ($.isFunction($.fn.on)) {
					// For jQuery 1.7+
					$(document).on('click.'+prefix, '.'+boxElement, clickHandler);
				} else {
					// For jQuery 1.3.x -> 1.6.x
					// This code is never reached in jQuery 1.9, so do not contact me about 'live' being removed.
					// This is not here for jQuery 1.9, it's here for legacy users.
					$('.'+boxElement).live('click.'+prefix, clickHandler);
				}
			}
			return true;
		}
		return false;
	}

	// Don't do anything if Colorbox already exists.
	if ($[colorbox]) {
		return;
	}

	// Append the HTML when the DOM loads
	$(appendHTML);


	// ****************
	// PUBLIC FUNCTIONS
	// Usage format: $.colorbox.close();
	// Usage from within an iframe: parent.jQuery.colorbox.close();
	// ****************

	publicMethod = $.fn[colorbox] = $[colorbox] = function (options, callback) {
		var settings;
		var $obj = this;

		options = options || {};

		if ($.isFunction($obj)) { // assume a call to $.colorbox
			$obj = $('<a/>');
			options.open = true;
		}

		if (!$obj[0]) { // colorbox being applied to empty collection
			return $obj;
		}

		appendHTML();

		if (addBindings()) {

			if (callback) {
				options.onComplete = callback;
			}

			$obj.each(function () {
				var old = $.data(this, colorbox) || {};
				$.data(this, colorbox, $.extend(old, options));
			}).addClass(boxElement);

			settings = new Settings($obj[0], options);

			if (settings.get('open')) {
				launch($obj[0]);
			}
		}

		return $obj;
	};

	publicMethod.position = function (speed, loadedCallback) {
		var
		css,
		top = 0,
		left = 0,
		offset = $box.offset(),
		scrollTop,
		scrollLeft;

		$window.unbind('resize.' + prefix);

		// remove the modal so that it doesn't influence the document width/height
		$box.css({top: -9e4, left: -9e4});

		scrollTop = $window.scrollTop();
		scrollLeft = $window.scrollLeft();

		if (settings.get('fixed')) {
			offset.top -= scrollTop;
			offset.left -= scrollLeft;
			$box.css({position: 'fixed'});
		} else {
			top = scrollTop;
			left = scrollLeft;
			$box.css({position: 'absolute'});
		}

		// keeps the top and left positions within the browser's viewport.
		if (settings.get('right') !== false) {
			left += Math.max($window.width() - settings.w - loadedWidth - interfaceWidth - setSize(settings.get('right'), 'x'), 0);
		} else if (settings.get('left') !== false) {
			left += setSize(settings.get('left'), 'x');
		} else {
			left += Math.round(Math.max($window.width() - settings.w - loadedWidth - interfaceWidth, 0) / 2);
		}

		if (settings.get('bottom') !== false) {
			top += Math.max(winheight() - settings.h - loadedHeight - interfaceHeight - setSize(settings.get('bottom'), 'y'), 0);
		} else if (settings.get('top') !== false) {
			top += setSize(settings.get('top'), 'y');
		} else {
			top += Math.round(Math.max(winheight() - settings.h - loadedHeight - interfaceHeight, 0) / 2);
		}

		$box.css({top: offset.top, left: offset.left, visibility:'visible'});

		// this gives the wrapper plenty of breathing room so it's floated contents can move around smoothly,
		// but it has to be shrank down around the size of div#colorbox when it's done.  If not,
		// it can invoke an obscure IE bug when using iframes.
		$wrap[0].style.width = $wrap[0].style.height = "9999px";

		function modalDimensions() {
			$topBorder[0].style.width = $bottomBorder[0].style.width = $content[0].style.width = (parseInt($box[0].style.width,10) - interfaceWidth)+'px';
			$content[0].style.height = $leftBorder[0].style.height = $rightBorder[0].style.height = (parseInt($box[0].style.height,10) - interfaceHeight)+'px';
		}

		css = {width: settings.w + loadedWidth + interfaceWidth, height: settings.h + loadedHeight + interfaceHeight, top: top, left: left};

		// setting the speed to 0 if the content hasn't changed size or position
		if (speed) {
			var tempSpeed = 0;
			$.each(css, function(i){
				if (css[i] !== previousCSS[i]) {
					tempSpeed = speed;
					return;
				}
			});
			speed = tempSpeed;
		}

		previousCSS = css;

		if (!speed) {
			$box.css(css);
		}

		$box.dequeue().animate(css, {
			duration: speed || 0,
			complete: function () {
				modalDimensions();

				active = false;

				// shrink the wrapper down to exactly the size of colorbox to avoid a bug in IE's iframe implementation.
				$wrap[0].style.width = (settings.w + loadedWidth + interfaceWidth) + "px";
				$wrap[0].style.height = (settings.h + loadedHeight + interfaceHeight) + "px";

				if (settings.get('reposition')) {
					setTimeout(function () {  // small delay before binding onresize due to an IE8 bug.
						$window.bind('resize.' + prefix, publicMethod.position);
					}, 1);
				}

				if ($.isFunction(loadedCallback)) {
					loadedCallback();
				}
			},
			step: modalDimensions
		});
	};

	publicMethod.resize = function (options) {
		var scrolltop;

		if (open) {
			options = options || {};

			if (options.width) {
				settings.w = setSize(options.width, 'x') - loadedWidth - interfaceWidth;
			}

			if (options.innerWidth) {
				settings.w = setSize(options.innerWidth, 'x');
			}

			$loaded.css({width: settings.w});

			if (options.height) {
				settings.h = setSize(options.height, 'y') - loadedHeight - interfaceHeight;
			}

			if (options.innerHeight) {
				settings.h = setSize(options.innerHeight, 'y');
			}

			if (!options.innerHeight && !options.height) {
				scrolltop = $loaded.scrollTop();
				$loaded.css({height: "auto"});
				settings.h = $loaded.height();
			}

			$loaded.css({height: settings.h});

			if(scrolltop) {
				$loaded.scrollTop(scrolltop);
			}

			publicMethod.position(settings.get('transition') === "none" ? 0 : settings.get('speed'));
		}
	};

	publicMethod.prep = function (object) {
		if (!open) {
			return;
		}

		var callback, speed = settings.get('transition') === "none" ? 0 : settings.get('speed');

		$loaded.remove();

		$loaded = $tag(div, 'LoadedContent').append(object);

		function getWidth() {
			settings.w = settings.w || $loaded.width();
			settings.w = settings.mw && settings.mw < settings.w ? settings.mw : settings.w;
			return settings.w;
		}
		function getHeight() {
			settings.h = settings.h || $loaded.height();
			settings.h = settings.mh && settings.mh < settings.h ? settings.mh : settings.h;
			return settings.h;
		}

		$loaded.hide()
		.appendTo($loadingBay.show())// content has to be appended to the DOM for accurate size calculations.
		.css({width: getWidth(), overflow: settings.get('scrolling') ? 'auto' : 'hidden'})
		.css({height: getHeight()})// sets the height independently from the width in case the new width influences the value of height.
		.prependTo($content);

		$loadingBay.hide();

		// floating the IMG removes the bottom line-height and fixed a problem where IE miscalculates the width of the parent element as 100% of the document width.

		$(photo).css({'float': 'none'});

		setClass(settings.get('className'));

		callback = function () {
			var total = $related.length,
				iframe,
				complete;

			if (!open) {
				return;
			}

			function removeFilter() { // Needed for IE8 in versions of jQuery prior to 1.7.2
				if ($.support.opacity === false) {
					$box[0].style.removeAttribute('filter');
				}
			}

			complete = function () {
				clearTimeout(loadingTimer);
				$loadingOverlay.hide();
				trigger(event_complete);
				settings.get('onComplete');
			};


			$title.html(settings.get('title')).show();
			$loaded.show();

			if (total > 1) { // handle grouping
				if (typeof settings.get('current') === "string") {
					$current.html(settings.get('current').replace('{current}', index + 1).replace('{total}', total)).show();
				}

				$next[(settings.get('loop') || index < total - 1) ? "show" : "hide"]().html(settings.get('next'));
				$prev[(settings.get('loop') || index) ? "show" : "hide"]().html(settings.get('previous'));

				slideshow();

				// Preloads images within a rel group
				if (settings.get('preloading')) {
					$.each([getIndex(-1), getIndex(1)], function(){
						var img,
							i = $related[this],
							settings = new Settings(i, $.data(i, colorbox)),
							src = settings.get('href');

						if (src && isImage(settings, src)) {
							src = retinaUrl(settings, src);
							img = document.createElement('img');
							img.src = src;
						}
					});
				}
			} else {
				$groupControls.hide();
			}

			if (settings.get('iframe')) {

				iframe = settings.get('createIframe');

				if (!settings.get('scrolling')) {
					iframe.scrolling = "no";
				}

				$(iframe)
					.attr({
						src: settings.get('href'),
						'class': prefix + 'Iframe'
					})
					.one('load', complete)
					.appendTo($loaded);

				$events.one(event_purge, function () {
					iframe.src = "//about:blank";
				});

				if (settings.get('fastIframe')) {
					$(iframe).trigger('load');
				}
			} else {
				complete();
			}

			if (settings.get('transition') === 'fade') {
				$box.fadeTo(speed, 1, removeFilter);
			} else {
				removeFilter();
			}
		};

		if (settings.get('transition') === 'fade') {
			$box.fadeTo(speed, 0, function () {
				publicMethod.position(0, callback);
			});
		} else {
			publicMethod.position(speed, callback);
		}
	};

	function load () {
		var href, setResize, prep = publicMethod.prep, $inline, request = ++requests;

		active = true;

		photo = false;

		trigger(event_purge);
		trigger(event_load);
		settings.get('onLoad');

		settings.h = settings.get('height') ?
				setSize(settings.get('height'), 'y') - loadedHeight - interfaceHeight :
				settings.get('innerHeight') && setSize(settings.get('innerHeight'), 'y');

		settings.w = settings.get('width') ?
				setSize(settings.get('width'), 'x') - loadedWidth - interfaceWidth :
				settings.get('innerWidth') && setSize(settings.get('innerWidth'), 'x');

		// Sets the minimum dimensions for use in image scaling
		settings.mw = settings.w;
		settings.mh = settings.h;

		// Re-evaluate the minimum width and height based on maxWidth and maxHeight values.
		// If the width or height exceed the maxWidth or maxHeight, use the maximum values instead.
		if (settings.get('maxWidth')) {
			settings.mw = setSize(settings.get('maxWidth'), 'x') - loadedWidth - interfaceWidth;
			settings.mw = settings.w && settings.w < settings.mw ? settings.w : settings.mw;
		}
		if (settings.get('maxHeight')) {
			settings.mh = setSize(settings.get('maxHeight'), 'y') - loadedHeight - interfaceHeight;
			settings.mh = settings.h && settings.h < settings.mh ? settings.h : settings.mh;
		}

		href = settings.get('href');

		loadingTimer = setTimeout(function () {
			$loadingOverlay.show();
		}, 100);

		if (settings.get('inline')) {
			var $target = $(href).eq(0);
			// Inserts an empty placeholder where inline content is being pulled from.
			// An event is bound to put inline content back when Colorbox closes or loads new content.
			$inline = $('<div>').hide().insertBefore($target);

			$events.one(event_purge, function () {
				$inline.replaceWith($target);
			});

			prep($target);
		} else if (settings.get('iframe')) {
			// IFrame element won't be added to the DOM until it is ready to be displayed,
			// to avoid problems with DOM-ready JS that might be trying to run in that iframe.
			prep(" ");
		} else if (settings.get('html')) {
			prep(settings.get('html'));
		} else if (isImage(settings, href)) {

			href = retinaUrl(settings, href);

			photo = settings.get('createImg');

			$(photo)
			.addClass(prefix + 'Photo')
			.bind('error.'+prefix,function () {
				prep($tag(div, 'Error').html(settings.get('imgError')));
			})
			.one('load', function () {
				if (request !== requests) {
					return;
				}

				// A small pause because some browsers will occassionaly report a
				// img.width and img.height of zero immediately after the img.onload fires
				setTimeout(function(){
					var percent;

					if (settings.get('retinaImage') && window.devicePixelRatio > 1) {
						photo.height = photo.height / window.devicePixelRatio;
						photo.width = photo.width / window.devicePixelRatio;
					}

					if (settings.get('scalePhotos')) {
						setResize = function () {
							photo.height -= photo.height * percent;
							photo.width -= photo.width * percent;
						};
						if (settings.mw && photo.width > settings.mw) {
							percent = (photo.width - settings.mw) / photo.width;
							setResize();
						}
						if (settings.mh && photo.height > settings.mh) {
							percent = (photo.height - settings.mh) / photo.height;
							setResize();
						}
					}

					if (settings.h) {
						photo.style.marginTop = Math.max(settings.mh - photo.height, 0) / 2 + 'px';
					}

					if ($related[1] && (settings.get('loop') || $related[index + 1])) {
						photo.style.cursor = 'pointer';

						$(photo).bind('click.'+prefix, function () {
							publicMethod.next();
						});
					}

					photo.style.width = photo.width + 'px';
					photo.style.height = photo.height + 'px';
					prep(photo);
				}, 1);
			});

			photo.src = href;

		} else if (href) {
			$loadingBay.load(href, settings.get('data'), function (data, status) {
				if (request === requests) {
					prep(status === 'error' ? $tag(div, 'Error').html(settings.get('xhrError')) : $(this).contents());
				}
			});
		}
	}

	// Navigates to the next page/image in a set.
	publicMethod.next = function () {
		if (!active && $related[1] && (settings.get('loop') || $related[index + 1])) {
			index = getIndex(1);
			launch($related[index]);
		}
	};

	publicMethod.prev = function () {
		if (!active && $related[1] && (settings.get('loop') || index)) {
			index = getIndex(-1);
			launch($related[index]);
		}
	};

	// Note: to use this within an iframe use the following format: parent.jQuery.colorbox.close();
	publicMethod.close = function () {
		if (open && !closing) {

			closing = true;
			open = false;
			trigger(event_cleanup);
			settings.get('onCleanup');
			$window.unbind('.' + prefix);
			$overlay.fadeTo(settings.get('fadeOut') || 0, 0);

			$box.stop().fadeTo(settings.get('fadeOut') || 0, 0, function () {
				$box.hide();
				$overlay.hide();
				trigger(event_purge);
				$loaded.remove();

				setTimeout(function () {
					closing = false;
					trigger(event_closed);
					settings.get('onClosed');
				}, 1);
			});
		}
	};

	// Removes changes Colorbox made to the document, but does not remove the plugin.
	publicMethod.remove = function () {
		if (!$box) { return; }

		$box.stop();
		$[colorbox].close();
		$box.stop(false, true).remove();
		$overlay.remove();
		closing = false;
		$box = null;
		$('.' + boxElement)
			.removeData(colorbox)
			.removeClass(boxElement);

		$(document).unbind('click.'+prefix).unbind('keydown.'+prefix);
	};

	// A method for fetching the current element Colorbox is referencing.
	// returns a jQuery object.
	publicMethod.element = function () {
		return $(settings.el);
	};

	publicMethod.settings = defaults;

}(jQuery, document, window));

/*!
 * Justified Gallery - v3.6.0
 * http://miromannino.github.io/Justified-Gallery/
 * Copyright (c) 2015 Miro Mannino
 * Licensed under the MIT license.
 */
(function($) {

  /**
   * Justified Gallery controller constructor
   *
   * @param $gallery the gallery to build
   * @param settings the settings (the defaults are in $.fn.justifiedGallery.defaults)
   * @constructor
   */
  var JustifiedGallery = function ($gallery, settings) {

    this.settings = settings;
    this.checkSettings();

    this.imgAnalyzerTimeout = null;
    this.entries = null;
    this.buildingRow = {
      entriesBuff : [],
      width : 0,
      aspectRatio : 0
    };
    this.lastAnalyzedIndex = -1;
    this.yield = {
      every : 2, // do a flush every n flushes (must be greater than 1)
      flushed : 0 // flushed rows without a yield
    };
    this.border = settings.border >= 0 ? settings.border : settings.margins;
    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
    this.offY = this.border;
    this.spinner = {
      phase : 0,
      timeSlot : 150,
      $el : $('<div class="spinner"><span></span><span></span><span></span></div>'),
      intervalId : null
    };
    this.checkWidthIntervalId = null;
    this.galleryWidth = $gallery.width();
    this.$gallery = $gallery;

  };

  /** @returns {String} the best suffix given the width and the height */
  JustifiedGallery.prototype.getSuffix = function (width, height) {
    var longestSide, i;
    longestSide = (width > height) ? width : height;
    for (i = 0; i < this.suffixRanges.length; i++) {
      if (longestSide <= this.suffixRanges[i]) {
        return this.settings.sizeRangeSuffixes[this.suffixRanges[i]];
      }
    }
    return this.settings.sizeRangeSuffixes[this.suffixRanges[i - 1]];
  };

  /**
   * Remove the suffix from the string
   *
   * @returns {string} a new string without the suffix
   */
  JustifiedGallery.prototype.removeSuffix = function (str, suffix) {
    return str.substring(0, str.length - suffix.length);
  };

  /**
   * @returns {boolean} a boolean to say if the suffix is contained in the str or not
   */
  JustifiedGallery.prototype.endsWith = function (str, suffix) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
  };

  /**
   * Get the used suffix of a particular url
   *
   * @param str
   * @returns {String} return the used suffix
   */
  JustifiedGallery.prototype.getUsedSuffix = function (str) {
    for (var si in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(si)) {
        if (this.settings.sizeRangeSuffixes[si].length === 0) continue;
        if (this.endsWith(str, this.settings.sizeRangeSuffixes[si])) return this.settings.sizeRangeSuffixes[si];
      }
    }
    return '';
  };

  /**
   * Given an image src, with the width and the height, returns the new image src with the
   * best suffix to show the best quality thumbnail.
   *
   * @returns {String} the suffix to use
   */
  JustifiedGallery.prototype.newSrc = function (imageSrc, imgWidth, imgHeight) {
    var matchRes = imageSrc.match(this.settings.extension);
    var ext = (matchRes != null) ? matchRes[0] : '';
    var newImageSrc = imageSrc.replace(this.settings.extension, '');
    newImageSrc = this.removeSuffix(newImageSrc, this.getUsedSuffix(newImageSrc));
    newImageSrc += this.getSuffix(imgWidth, imgHeight) + ext;
    return newImageSrc;
  };

  /**
   * Shows the images that is in the given entry
   *
   * @param $entry the entry
   * @param callback the callback that is called when the show animation is finished
   */
  JustifiedGallery.prototype.showImg = function ($entry, callback) {
    if (this.settings.cssAnimation) {
      $entry.addClass('entry-visible');
      if (callback) callback();
    } else {
      $entry.stop().fadeTo(this.settings.imagesAnimationDuration, 1.0, callback);
    }
  };

  /**
   * Extract the image src form the image, looking from the 'safe-src', and if it can't be found, from the
   * 'src' attribute. It saves in the image data the 'jg.originalSrc' field, with the extracted src.
   *
   * @param $image the image to analyze
   * @returns {String} the extracted src
   */
  JustifiedGallery.prototype.extractImgSrcFromImage = function ($image) {
    var imageSrc = (typeof $image.data('safe-src') !== 'undefined') ? $image.data('safe-src') : $image.attr('src');
    $image.data('jg.originalSrc', imageSrc);
    return imageSrc;
  };

  /** @returns {jQuery} the image in the given entry */
  JustifiedGallery.prototype.imgFromEntry = function ($entry) {
    var $img = $entry.find('> img');
    if ($img.length === 0) $img = $entry.find('> a > img');
    return $img.length === 0 ? null : $img;
  };

  /** @returns {jQuery} the caption in the given entry */
  JustifiedGallery.prototype.captionFromEntry = function ($entry) {
    var $caption = $entry.find('> .caption');
    return $caption.length === 0 ? null : $caption;
  };

  /**
   * Display the entry
   *
   * @param {jQuery} $entry the entry to display
   * @param {int} x the x position where the entry must be positioned
   * @param y the y position where the entry must be positioned
   * @param imgWidth the image width
   * @param imgHeight the image height
   * @param rowHeight the row height of the row that owns the entry
   */
  JustifiedGallery.prototype.displayEntry = function ($entry, x, y, imgWidth, imgHeight, rowHeight) {
    $entry.width(imgWidth);
    $entry.height(rowHeight);
    $entry.css('top', y);
    $entry.css('left', x);

    var $image = this.imgFromEntry($entry);
    if ($image !== null) {
      $image.css('width', imgWidth);
      $image.css('height', imgHeight);
      $image.css('margin-left', - imgWidth / 2);
      $image.css('margin-top', - imgHeight / 2);

      // Image reloading for an high quality of thumbnails
      var imageSrc = $image.attr('src');
      var newImageSrc = this.newSrc(imageSrc, imgWidth, imgHeight);

      $image.one('error', function () {
        $image.attr('src', $image.data('jg.originalSrc')); //revert to the original thumbnail, we got it.
      });

      var loadNewImage = function () {
        if (imageSrc !== newImageSrc) { //load the new image after the fadeIn
          $image.attr('src', newImageSrc);
        }
      };

      if ($entry.data('jg.loaded') === 'skipped') {
        this.onImageEvent(imageSrc, $.proxy(function() {
          this.showImg($entry, loadNewImage);
          $entry.data('jg.loaded', true);
        }, this));
      } else {
        this.showImg($entry, loadNewImage);
      }

    } else {
      this.showImg($entry);
    }

    this.displayEntryCaption($entry);
  };

  /**
   * Display the entry caption. If the caption element doesn't exists, it creates the caption using the 'alt'
   * or the 'title' attributes.
   *
   * @param {jQuery} $entry the entry to process
   */
  JustifiedGallery.prototype.displayEntryCaption = function ($entry) {
    var $image = this.imgFromEntry($entry);
    if ($image !== null && this.settings.captions) {
      var $imgCaption = this.captionFromEntry($entry);

      // Create it if it doesn't exists
      if ($imgCaption == null) {
        var caption = $image.attr('alt');
        if (typeof caption === 'undefined') caption = $entry.attr('title');
        if (typeof caption !== 'undefined') { // Create only we found something
          $imgCaption = $('<div class="caption">' + caption + '</div>');
          $entry.append($imgCaption);
          $entry.data('jg.createdCaption', true);
        }
      }

      // Create events (we check again the $imgCaption because it can be still inexistent)
      if ($imgCaption !== null) {
        if (!this.settings.cssAnimation) $imgCaption.stop().fadeTo(0, this.settings.captionSettings.nonVisibleOpacity);
        this.addCaptionEventsHandlers($entry);
      }
    } else {
      this.removeCaptionEventsHandlers($entry);
    }
  };

  /**
   * The callback for the event 'mouseenter'. It assumes that the event currentTarget is an entry.
   * It shows the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseEnterForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.addClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.visibleOpacity);
    }
  };

  /**
   * The callback for the event 'mouseleave'. It assumes that the event currentTarget is an entry.
   * It hides the caption using jQuery (or using CSS if it is configured so)
   *
   * @param {Event} eventObject the event object
   */
  JustifiedGallery.prototype.onEntryMouseLeaveForCaption = function (eventObject) {
    var $caption = this.captionFromEntry($(eventObject.currentTarget));
    if (this.settings.cssAnimation) {
      $caption.removeClass('caption-visible').removeClass('caption-hidden');
    } else {
      $caption.stop().fadeTo(this.settings.captionSettings.animationDuration,
          this.settings.captionSettings.nonVisibleOpacity);
    }
  };

  /**
   * Add the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.addCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents === 'undefined') {
      captionMouseEvents = {
        mouseenter: $.proxy(this.onEntryMouseEnterForCaption, this),
        mouseleave: $.proxy(this.onEntryMouseLeaveForCaption, this)
      };
      $entry.on('mouseenter', undefined, undefined, captionMouseEvents.mouseenter);
      $entry.on('mouseleave', undefined, undefined, captionMouseEvents.mouseleave);
      $entry.data('jg.captionMouseEvents', captionMouseEvents);
    }
  };

  /**
   * Remove the handlers of the entry for the caption
   *
   * @param $entry the entry to modify
   */
  JustifiedGallery.prototype.removeCaptionEventsHandlers = function ($entry) {
    var captionMouseEvents = $entry.data('jg.captionMouseEvents');
    if (typeof captionMouseEvents !== 'undefined') {
      $entry.off('mouseenter', undefined, captionMouseEvents.mouseenter);
      $entry.off('mouseleave', undefined, captionMouseEvents.mouseleave);
      $entry.removeData('jg.captionMouseEvents');
    }
  };

  /**
   * Justify the building row, preparing it to
   *
   * @param isLastRow
   * @returns {*}
   */
  JustifiedGallery.prototype.prepareBuildingRow = function (isLastRow) {
    var i, $entry, imgAspectRatio, newImgW, newImgH, justify = true;
    var minHeight = 0;
    var availableWidth = this.galleryWidth - 2 * this.border - (
        (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
    var rowHeight = availableWidth / this.buildingRow.aspectRatio;
    var justifiable = this.buildingRow.width / availableWidth > this.settings.justifyThreshold;

    //Skip the last row if we can't justify it and the lastRow == 'hide'
    if (isLastRow && this.settings.lastRow === 'hide' && !justifiable) {
      for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
        $entry = this.buildingRow.entriesBuff[i];
        if (this.settings.cssAnimation)
          $entry.removeClass('entry-visible');
        else
          $entry.stop().fadeTo(0, 0);
      }
      return -1;
    }

    // With lastRow = nojustify, justify if is justificable (the images will not become too big)
    if (isLastRow && !justifiable && this.settings.lastRow === 'nojustify') justify = false;

    for (i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      $entry = this.buildingRow.entriesBuff[i];
      imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');

      if (justify) {
        newImgW = (i === this.buildingRow.entriesBuff.length - 1) ? availableWidth : rowHeight * imgAspectRatio;
        newImgH = rowHeight;

        /* With fixedHeight the newImgH must be greater than rowHeight.
         In some cases here this is not satisfied (due to the justification).
         But we comment it, because is better to have a shorter but justified row instead
         to have a cropped image at the end. */
        /*if (this.settings.fixedHeight && newImgH < this.settings.rowHeight) {
         newImgW = this.settings.rowHeight * imgAspectRatio;
         newImgH = this.settings.rowHeight;
         }*/

      } else {
        newImgW = this.settings.rowHeight * imgAspectRatio;
        newImgH = this.settings.rowHeight;
      }

      availableWidth -= Math.round(newImgW);
      $entry.data('jg.jwidth', Math.round(newImgW));
      $entry.data('jg.jheight', Math.ceil(newImgH));
      if (i === 0 || minHeight > newImgH) minHeight = newImgH;
    }

    if (this.settings.fixedHeight && minHeight > this.settings.rowHeight)
      minHeight = this.settings.rowHeight;

    return {minHeight: minHeight, justify: justify};
  };

  /**
   * Clear the building row data to be used for a new row
   */
  JustifiedGallery.prototype.clearBuildingRow = function () {
    this.buildingRow.entriesBuff = [];
    this.buildingRow.aspectRatio = 0;
    this.buildingRow.width = 0;
  };

  /**
   * Flush a row: justify it, modify the gallery height accordingly to the row height
   *
   * @param isLastRow
   */
  JustifiedGallery.prototype.flushRow = function (isLastRow) {
    var settings = this.settings;
    var $entry, minHeight, buildingRowRes, offX = this.border;

    buildingRowRes = this.prepareBuildingRow(isLastRow);
    minHeight = buildingRowRes.minHeight;
    if (isLastRow && settings.lastRow === 'hide' && minHeight === -1) {
      this.clearBuildingRow();
      return;
    }

    if (this.maxRowHeight.percentage) {
      if (this.maxRowHeight.value * settings.rowHeight < minHeight) minHeight = this.maxRowHeight.value * settings.rowHeight;
    } else {
      if (this.maxRowHeight.value > 0 && this.maxRowHeight.value < minHeight) minHeight = this.maxRowHeight.value;
    }

    for (var i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      $entry = this.buildingRow.entriesBuff[i];
      this.displayEntry($entry, offX, this.offY, $entry.data('jg.jwidth'), $entry.data('jg.jheight'), minHeight);
      offX += $entry.data('jg.jwidth') + settings.margins;
    }

    //Gallery Height
    this.$gallery.height(this.offY + minHeight + this.border + (this.isSpinnerActive() ? this.getSpinnerHeight() : 0));

    if (!isLastRow || (minHeight <= this.settings.rowHeight && buildingRowRes.justify)) {
      //Ready for a new row
      this.offY += minHeight + this.settings.margins;
      this.clearBuildingRow();
      this.$gallery.trigger('jg.rowflush');
    }
  };

  /**
   * Checks the width of the gallery container, to know if a new justification is needed
   */
  JustifiedGallery.prototype.checkWidth = function () {
    this.checkWidthIntervalId = setInterval($.proxy(function () {
      var galleryWidth = parseInt(this.$gallery.width(), 10);
      if (this.galleryWidth !== galleryWidth) {
        this.galleryWidth = galleryWidth;
        this.rewind();

        // Restart to analyze
        this.startImgAnalyzer(true);
      }
    }, this), this.settings.refreshTime);
  };

  /**
   * @returns {boolean} a boolean saying if the spinner is active or not
   */
  JustifiedGallery.prototype.isSpinnerActive = function () {
    return this.spinner.intervalId != null;
  };

  /**
   * @returns {int} the spinner height
   */
  JustifiedGallery.prototype.getSpinnerHeight = function () {
    return this.spinner.$el.innerHeight();
  };

  /**
   * Stops the spinner animation and modify the gallery height to exclude the spinner
   */
  JustifiedGallery.prototype.stopLoadingSpinnerAnimation = function () {
    clearInterval(this.spinner.intervalId);
    this.spinner.intervalId = null;
    this.$gallery.height(this.$gallery.height() - this.getSpinnerHeight());
    this.spinner.$el.detach();
  };

  /**
   * Starts the spinner animation
   */
  JustifiedGallery.prototype.startLoadingSpinnerAnimation = function () {
    var spinnerContext = this.spinner;
    var $spinnerPoints = spinnerContext.$el.find('span');
    clearInterval(spinnerContext.intervalId);
    this.$gallery.append(spinnerContext.$el);
    this.$gallery.height(this.offY + this.getSpinnerHeight());
    spinnerContext.intervalId = setInterval(function () {
      if (spinnerContext.phase < $spinnerPoints.length) {
        $spinnerPoints.eq(spinnerContext.phase).fadeTo(spinnerContext.timeSlot, 1);
      } else {
        $spinnerPoints.eq(spinnerContext.phase - $spinnerPoints.length).fadeTo(spinnerContext.timeSlot, 0);
      }
      spinnerContext.phase = (spinnerContext.phase + 1) % ($spinnerPoints.length * 2);
    }, spinnerContext.timeSlot);
  };

  /**
   * Rewind the image analysis to start from the first entry.
   */
  JustifiedGallery.prototype.rewind = function () {
    this.lastAnalyzedIndex = -1;
    this.offY = this.border;
    this.clearBuildingRow();
  };

  /**
   * Hide the image of the buildingRow to prevent strange effects when the row will be
   * re-justified again
   */
  JustifiedGallery.prototype.hideBuildingRowImages = function () {
    for (var i = 0; i < this.buildingRow.entriesBuff.length; i++) {
      if (this.settings.cssAnimation) {
        this.buildingRow.entriesBuff[i].removeClass('entry-visible');
      } else {
        this.buildingRow.entriesBuff[i].stop().fadeTo(0, 0);
      }
    }
  };

  /**
   * Update the entries searching it from the justified gallery HTML element
   *
   * @param norewind if norewind only the new entries will be changed (i.e. randomized, sorted or filtered)
   * @returns {boolean} true if some entries has been founded
   */
  JustifiedGallery.prototype.updateEntries = function (norewind) {
    this.entries = this.$gallery.find(this.settings.selector).toArray();
    if (this.entries.length === 0) return false;

    // Filter
    if (this.settings.filter) {
      this.modifyEntries(this.filterArray, norewind);
    } else {
      this.modifyEntries(this.resetFilters, norewind);
    }

    // Sort or randomize
    if ($.isFunction(this.settings.sort)) {
      this.modifyEntries(this.sortArray, norewind);
    } else if (this.settings.randomize) {
      this.modifyEntries(this.shuffleArray, norewind);
    }

    return true;
  };

  /**
   * Apply the entries order to the DOM, iterating the entries and appending the images
   *
   * @param entries the entries that has been modified and that must be re-ordered in the DOM
   */
  JustifiedGallery.prototype.insertToGallery = function (entries) {
    var that = this;
    $.each(entries, function () {
      $(this).appendTo(that.$gallery);
    });
  };

  /**
   * Shuffle the array using the Fisher-Yates shuffle algorithm
   *
   * @param a the array to shuffle
   * @return the shuffled array
   */
  JustifiedGallery.prototype.shuffleArray = function (a) {
    var i, j, temp;
    for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = a[i];
      a[i] = a[j];
      a[j] = temp;
    }
    this.insertToGallery(a);
    return a;
  };

  /**
   * Sort the array using settings.comparator as comparator
   *
   * @param a the array to sort (it is sorted)
   * @return the sorted array
   */
  JustifiedGallery.prototype.sortArray = function (a) {
    a.sort(this.settings.sort);
    this.insertToGallery(a);
    return a;
  };

  /**
   * Reset the filters removing the 'jg-filtered' class from all the entries
   *
   * @param a the array to reset
   */
  JustifiedGallery.prototype.resetFilters = function (a) {
    for (var i = 0; i < a.length; i++) $(a[i]).removeClass('jg-filtered');
    return a;
  };

  /**
   * Filter the entries considering theirs classes (if a string has been passed) or using a function for filtering.
   *
   * @param a the array to filter
   * @return the filtered array
   */
  JustifiedGallery.prototype.filterArray = function (a) {
    var settings = this.settings;
    if ($.type(settings.filter) === 'string') {
      // Filter only keeping the entries passed in the string
      return a.filter(function (el) {
        var $el = $(el);
        if ($el.is(settings.filter)) {
          $el.removeClass('jg-filtered');
          return true;
        } else {
          $el.addClass('jg-filtered');
          return false;
        }
      });
    } else if ($.isFunction(settings.filter)) {
      // Filter using the passed function
      return a.filter(settings.filter);
    }
  };

  /**
   * Modify the entries. With norewind only the new inserted images will be modified (the ones after lastAnalyzedIndex)
   *
   * @param functionToApply the function to call to modify the entries (e.g. sorting, randomization, filtering)
   * @param norewind specify if the norewind has been called or not
   */
  JustifiedGallery.prototype.modifyEntries = function (functionToApply, norewind) {
    var lastEntries = norewind ?
        this.entries.splice(this.lastAnalyzedIndex + 1, this.entries.length - this.lastAnalyzedIndex - 1)
        : this.entries;
    lastEntries = functionToApply.call(this, lastEntries);
    this.entries = norewind ? this.entries.concat(lastEntries) : lastEntries;
  };

  /**
   * Destroy the Justified Gallery instance.
   *
   * It clears all the css properties added in the style attributes. We doesn't backup the original
   * values for those css attributes, because it costs (performance) and because in general one
   * shouldn't use the style attribute for an uniform set of images (where we suppose the use of
   * classes). Creating a backup is also difficult because JG could be called multiple times and
   * with different style attributes.
   */
  JustifiedGallery.prototype.destroy = function () {
    clearInterval(this.checkWidthIntervalId);

    $.each(this.entries, $.proxy(function(_, entry) {
      var $entry = $(entry);

      // Reset entry style
      $entry.css('width', '');
      $entry.css('height', '');
      $entry.css('top', '');
      $entry.css('left', '');
      $entry.data('jg.loaded', undefined);
      $entry.removeClass('jg-entry');

      // Reset image style
      var $img = this.imgFromEntry($entry);
      $img.css('width', '');
      $img.css('height', '');
      $img.css('margin-left', '');
      $img.css('margin-top', '');
      $img.attr('src', $img.data('jg.originalSrc'));
      $img.data('jg.originalSrc', undefined);

      // Remove caption
      this.removeCaptionEventsHandlers($entry);
      var $caption = this.captionFromEntry($entry);
      if ($entry.data('jg.createdCaption')) {
        // remove also the caption element (if created by jg)
        $entry.data('jg.createdCaption', undefined);
        if ($caption != null) $caption.remove();
      } else {
        if ($caption != null) $caption.fadeTo(0, 1);
      }

    }, this));

    this.$gallery.css('height', '');
    this.$gallery.removeClass('justified-gallery');
    this.$gallery.data('jg.controller', undefined);
  };

  /**
   * Analyze the images and builds the rows. It returns if it found an image that is not loaded.
   *
   * @param isForResize if the image analyzer is called for resizing or not, to call a different callback at the end
   */
  JustifiedGallery.prototype.analyzeImages = function (isForResize) {
    for (var i = this.lastAnalyzedIndex + 1; i < this.entries.length; i++) {
      var $entry = $(this.entries[i]);
      if ($entry.data('jg.loaded') === true || $entry.data('jg.loaded') === 'skipped') {
        var availableWidth = this.galleryWidth - 2 * this.border - (
            (this.buildingRow.entriesBuff.length - 1) * this.settings.margins);
        var imgAspectRatio = $entry.data('jg.width') / $entry.data('jg.height');
        if (availableWidth / (this.buildingRow.aspectRatio + imgAspectRatio) < this.settings.rowHeight) {
          this.flushRow(false);
          if(++this.yield.flushed >= this.yield.every) {
            this.startImgAnalyzer(isForResize);
            return;
          }
        }

        this.buildingRow.entriesBuff.push($entry);
        this.buildingRow.aspectRatio += imgAspectRatio;
        this.buildingRow.width += imgAspectRatio * this.settings.rowHeight;
        this.lastAnalyzedIndex = i;

      } else if ($entry.data('jg.loaded') !== 'error') {
        return;
      }
    }

    // Last row flush (the row is not full)
    if (this.buildingRow.entriesBuff.length > 0) this.flushRow(true);

    if (this.isSpinnerActive()) {
      this.stopLoadingSpinnerAnimation();
    }

    /* Stop, if there is, the timeout to start the analyzeImages.
     This is because an image can be set loaded, and the timeout can be set,
     but this image can be analyzed yet.
     */
    this.stopImgAnalyzerStarter();

    //On complete callback
    this.$gallery.trigger(isForResize ? 'jg.resize' : 'jg.complete');
  };

  /**
   * Stops any ImgAnalyzer starter (that has an assigned timeout)
   */
  JustifiedGallery.prototype.stopImgAnalyzerStarter = function () {
    this.yield.flushed = 0;
    if (this.imgAnalyzerTimeout !== null) clearTimeout(this.imgAnalyzerTimeout);
  };

  /**
   * Starts the image analyzer. It is not immediately called to let the browser to update the view
   *
   * @param isForResize specifies if the image analyzer must be called for resizing or not
   */
  JustifiedGallery.prototype.startImgAnalyzer = function (isForResize) {
    var that = this;
    this.stopImgAnalyzerStarter();
    this.imgAnalyzerTimeout = setTimeout(function () {
      that.analyzeImages(isForResize);
    }, 0.001); // we can't start it immediately due to a IE different behaviour
  };

  /**
   * Checks if the image is loaded or not using another image object. We cannot use the 'complete' image property,
   * because some browsers, with a 404 set complete = true.
   *
   * @param imageSrc the image src to load
   * @param onLoad callback that is called when the image has been loaded
   * @param onError callback that is called in case of an error
   */
  JustifiedGallery.prototype.onImageEvent = function (imageSrc, onLoad, onError) {
    if (!onLoad && !onError) return;

    var memImage = new Image();
    var $memImage = $(memImage);
    if (onLoad) {
      $memImage.one('load', function () {
        $memImage.off('load error');
        onLoad(memImage);
      });
    }
    if (onError) {
      $memImage.one('error', function() {
        $memImage.off('load error');
        onError(memImage);
      });
    }
    memImage.src = imageSrc;
  };

  /**
   * Init of Justified Gallery controlled
   * It analyzes all the entries starting theirs loading and calling the image analyzer (that works with loaded images)
   */
  JustifiedGallery.prototype.init = function () {
    var imagesToLoad = false, skippedImages = false, that = this;
    $.each(this.entries, function (index, entry) {
      var $entry = $(entry);
      var $image = that.imgFromEntry($entry);

      $entry.addClass('jg-entry');

      if ($entry.data('jg.loaded') !== true && $entry.data('jg.loaded') !== 'skipped') {

        // Link Rel global overwrite
        if (that.settings.rel !== null) $entry.attr('rel', that.settings.rel);

        // Link Target global overwrite
        if (that.settings.target !== null) $entry.attr('target', that.settings.target);

        if ($image !== null) {

          // Image src
          var imageSrc = that.extractImgSrcFromImage($image);
          $image.attr('src', imageSrc);

          /* If we have the height and the width, we don't wait that the image is loaded, but we start directly
           * with the justification */
          if (that.settings.waitThumbnailsLoad === false) {
            var width = parseInt($image.attr('width'), 10);
            var height = parseInt($image.attr('height'), 10);
            if (!isNaN(width) && !isNaN(height)) {
              $entry.data('jg.width', width);
              $entry.data('jg.height', height);
              $entry.data('jg.loaded', 'skipped');
              skippedImages = true;
              that.startImgAnalyzer(false);
              return true; // continue
            }
          }

          $entry.data('jg.loaded', false);
          imagesToLoad = true;

          // Spinner start
          if (!that.isSpinnerActive()) {
            that.startLoadingSpinnerAnimation();
          }

          that.onImageEvent(imageSrc, function (loadImg) { // image loaded
            $entry.data('jg.width', loadImg.width);
            $entry.data('jg.height', loadImg.height);
            $entry.data('jg.loaded', true);
            that.startImgAnalyzer(false);
          }, function () { // image load error
            $entry.data('jg.loaded', 'error');
            that.startImgAnalyzer(false);
          });

        } else {
          $entry.data('jg.loaded', true);
          $entry.data('jg.width', $entry.width() | $entry.css('width') | 1);
          $entry.data('jg.height', $entry.height() | $entry.css('height') | 1);
        }

      }

    });

    if (!imagesToLoad && !skippedImages) this.startImgAnalyzer(false);
    this.checkWidth();
  };

  /**
   * Checks that it is a valid number. If a string is passed it is converted to a number
   *
   * @param settingContainer the object that contains the setting (to allow the conversion)
   * @param settingName the setting name
   */
  JustifiedGallery.prototype.checkOrConvertNumber = function (settingContainer, settingName) {
    if ($.type(settingContainer[settingName]) === 'string') {
      settingContainer[settingName] = parseFloat(settingContainer[settingName]);
    }

    if ($.type(settingContainer[settingName]) === 'number') {
      if (isNaN(settingContainer[settingName])) throw 'invalid number for ' + settingName;
    } else {
      throw settingName + ' must be a number';
    }
  };

  /**
   * Checks the sizeRangeSuffixes and, if necessary, converts
   * its keys from string (e.g. old settings with 'lt100') to int.
   */
  JustifiedGallery.prototype.checkSizeRangesSuffixes = function () {
    if ($.type(this.settings.sizeRangeSuffixes) !== 'object') {
      throw 'sizeRangeSuffixes must be defined and must be an object';
    }

    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(rangeIdx);
    }

    var newSizeRngSuffixes = {0: ''};
    for (var i = 0; i < suffixRanges.length; i++) {
      if ($.type(suffixRanges[i]) === 'string') {
        try {
          var numIdx = parseInt(suffixRanges[i].replace(/^[a-z]+/, ''), 10);
          newSizeRngSuffixes[numIdx] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
        } catch (e) {
          throw 'sizeRangeSuffixes keys must contains correct numbers (' + e + ')';
        }
      } else {
        newSizeRngSuffixes[suffixRanges[i]] = this.settings.sizeRangeSuffixes[suffixRanges[i]];
      }
    }

    this.settings.sizeRangeSuffixes = newSizeRngSuffixes;
  };

  /**
   * check and convert the maxRowHeight setting
   */
  JustifiedGallery.prototype.retrieveMaxRowHeight = function () {
    var newMaxRowHeight = { };

    if ($.type(this.settings.maxRowHeight) === 'string') {
      if (this.settings.maxRowHeight.match(/^[0-9]+%$/)) {
        newMaxRowHeight.value = parseFloat(this.settings.maxRowHeight.match(/^([0-9])+%$/)[1]) / 100;
        newMaxRowHeight.percentage = false;
      } else {
        newMaxRowHeight.value = parseFloat(this.settings.maxRowHeight);
        newMaxRowHeight.percentage = true;
      }
    } else if ($.type(this.settings.maxRowHeight) === 'number') {
      newMaxRowHeight.value = this.settings.maxRowHeight;
      newMaxRowHeight.percentage = false;
    } else {
      throw 'maxRowHeight must be a number or a percentage';
    }

    // check if the converted value is not a number
    if (isNaN(newMaxRowHeight.value)) throw 'invalid number for maxRowHeight';

    // check values
    if (newMaxRowHeight.percentage) {
      if (newMaxRowHeight.value < 100) newMaxRowHeight.value = 100;
    } else {
      if (newMaxRowHeight.value > 0 && newMaxRowHeight.value < this.settings.rowHeight) {
        newMaxRowHeight.value = this.settings.rowHeight;
      }
    }

    return newMaxRowHeight;

  };

  /**
   * Checks the settings
   */
  JustifiedGallery.prototype.checkSettings = function () {
    this.checkSizeRangesSuffixes();

    this.checkOrConvertNumber(this.settings, 'rowHeight');
    this.checkOrConvertNumber(this.settings, 'margins');
    this.checkOrConvertNumber(this.settings, 'border');

    if (this.settings.lastRow !== 'nojustify' &&
        this.settings.lastRow !== 'justify' &&
        this.settings.lastRow !== 'hide') {
      throw 'lastRow must be "nojustify", "justify" or "hide"';
    }

    this.checkOrConvertNumber(this.settings, 'justifyThreshold');
    if (this.settings.justifyThreshold < 0 || this.settings.justifyThreshold > 1) {
      throw 'justifyThreshold must be in the interval [0,1]';
    }
    if ($.type(this.settings.cssAnimation) !== 'boolean') {
      throw 'cssAnimation must be a boolean';
    }

    if ($.type(this.settings.captions) !== 'boolean') throw 'captions must be a boolean';
    this.checkOrConvertNumber(this.settings.captionSettings, 'animationDuration');

    this.checkOrConvertNumber(this.settings.captionSettings, 'visibleOpacity');
    if (this.settings.captionSettings.visibleOpacity < 0 ||
        this.settings.captionSettings.visibleOpacity > 1) {
      throw 'captionSettings.visibleOpacity must be in the interval [0, 1]';
    }

    this.checkOrConvertNumber(this.settings.captionSettings, 'nonVisibleOpacity');
    if (this.settings.captionSettings.nonVisibleOpacity < 0 ||
        this.settings.captionSettings.nonVisibleOpacity > 1) {
      throw 'captionSettings.nonVisibleOpacity must be in the interval [0, 1]';
    }

    if ($.type(this.settings.fixedHeight) !== 'boolean') throw 'fixedHeight must be a boolean';
    this.checkOrConvertNumber(this.settings, 'imagesAnimationDuration');
    this.checkOrConvertNumber(this.settings, 'refreshTime');
    if ($.type(this.settings.randomize) !== 'boolean') throw 'randomize must be a boolean';
    if ($.type(this.settings.selector) !== 'string') throw 'selector must be a string';

    if (this.settings.sort !== false && !$.isFunction(this.settings.sort)) {
      throw 'sort must be false or a comparison function';
    }

    if (this.settings.filter !== false && !$.isFunction(this.settings.sort) &&
        $.type(this.settings.filter) !== 'string') {
      throw 'filter must be false, a string or a filter function';
    }
  };

  /**
   * It brings all the indexes from the sizeRangeSuffixes and it orders them. They are then sorted and returned.
   * @returns {Array} sorted suffix ranges
   */
  JustifiedGallery.prototype.retrieveSuffixRanges = function () {
    var suffixRanges = [];
    for (var rangeIdx in this.settings.sizeRangeSuffixes) {
      if (this.settings.sizeRangeSuffixes.hasOwnProperty(rangeIdx)) suffixRanges.push(parseInt(rangeIdx, 10));
    }
    suffixRanges.sort(function (a, b) { return a > b ? 1 : a < b ? -1 : 0; });
    return suffixRanges;
  };

  /**
   * Update the existing settings only changing some of them
   *
   * @param newSettings the new settings (or a subgroup of them)
   */
  JustifiedGallery.prototype.updateSettings = function (newSettings) {
    // In this case Justified Gallery has been called again changing only some options
    this.settings = $.extend({}, this.settings, newSettings);
    this.checkSettings();

    // As reported in the settings: negative value = same as margins, 0 = disabled
    this.border = this.settings.border >= 0 ? this.settings.border : this.settings.margins;

    this.maxRowHeight = this.retrieveMaxRowHeight();
    this.suffixRanges = this.retrieveSuffixRanges();
  };

  /**
   * Justified Gallery plugin for jQuery
   *
   * Events
   *  - jg.complete : called when all the gallery has been created
   *  - jg.resize : called when the gallery has been resized
   *  - jg.rowflush : when a new row appears
   *
   * @param arg the action (or the settings) passed when the plugin is called
   * @returns {*} the object itself
   */
  $.fn.justifiedGallery = function (arg) {
    return this.each(function (index, gallery) {

      var $gallery = $(gallery);
      $gallery.addClass('justified-gallery');

      var controller = $gallery.data('jg.controller');
      if (typeof controller === 'undefined') {
        // Create controller and assign it to the object data
        if (typeof arg !== 'undefined' && arg !== null && $.type(arg) !== 'object') {
          throw 'The argument must be an object';
        }
        controller = new JustifiedGallery($gallery, $.extend({}, $.fn.justifiedGallery.defaults, arg));
        $gallery.data('jg.controller', controller);
      } else if (arg === 'norewind') {
        // In this case we don't rewind: we analyze only the latest images (e.g. to complete the last unfinished row
        controller.hideBuildingRowImages();
      } else if (arg === 'destroy') {
        controller.destroy();
        return;
      } else {
        // In this case Justified Gallery has been called again changing only some options
        controller.updateSettings(arg);
        controller.rewind();
      }

      // Update the entries list
      if (!controller.updateEntries(arg === 'norewind')) return;

      // Init justified gallery
      controller.init();

    });
  };

  // Default options
  $.fn.justifiedGallery.defaults = {
    sizeRangeSuffixes: { }, /* e.g. Flickr configuration
        {
          100: '_t',  // used when longest is less than 100px
          240: '_m',  // used when longest is between 101px and 240px
          320: '_n',  // ...
          500: '',
          640: '_z',
          1024: '_b'  // used as else case because it is the last
        }
    */
    rowHeight: 120,
    maxRowHeight: '200%', // negative value = no limits, number to express the value in pixels,
                          // '[0-9]+%' to express in percentage (e.g. 200% means that the row height
                          // can't exceed 2 * rowHeight)
    margins: 1,
    border: -1, // negative value = same as margins, 0 = disabled, any other value to set the border

    lastRow: 'nojustify', // or can be 'justify' or 'hide'
    justifyThreshold: 0.75, /* if row width / available space > 0.75 it will be always justified
                             * (i.e. lastRow setting is not considered) */
    fixedHeight: false,
    waitThumbnailsLoad: true,
    captions: true,
    cssAnimation: false,
    imagesAnimationDuration: 500, // ignored with css animations
    captionSettings: { // ignored with css animations
      animationDuration: 500,
      visibleOpacity: 0.7,
      nonVisibleOpacity: 0.0
    },
    rel: null, // rewrite the rel of each analyzed links
    target: null, // rewrite the target of all links
    extension: /\.[^.\\/]+$/, // regexp to capture the extension of an image
    refreshTime: 100, // time interval (in ms) to check if the page changes its width
    randomize: false,
    sort: false, /*
      - false: to do not sort
      - function: to sort them using the function as comparator (see Array.prototype.sort())
    */
    filter: false, /*
      - false: for a disabled filter
      - a string: an entry is kept if entry.is(filter string) returns true
                  see jQuery's .is() function for further information
      - a function: invoked with arguments (entry, index, array). Return true to keep the entry, false otherwise.
                    see Array.prototype.filter for further information.
    */
    selector: '> a, > div:not(.spinner)' // The selector that is used to know what are the entries of the gallery
  };

}(jQuery));

/* http://keith-wood.name/icalendar.html
   iCalendar processing for jQuery v1.1.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) October 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

var PROP_NAME = 'icalendar';
var FLASH_ID = 'icalendar-flash-copy';

/* iCalendar sharing manager. */
function iCalendar() {
	this._defaults = {
		sites: [],  // List of site IDs to use, empty for all
		icons: 'icalendar.png', // Horizontal amalgamation of all site icons
		iconSize: 16,  // The size of the individual icons
		target: '_blank',  // The name of the target window for the iCalendar links
		compact: false,  // True if a compact presentation should be used, false for full
		popup: false,  // True to have it popup on demand, false to show always
		popupText: 'Send to my calendar...', // Text for the popup trigger
		tipPrefix: '',  // Additional text to show in the tool tip for each icon
		echoUrl: '',  // The URL to echo back iCalendar content, or blank for clipboard
		echoField: '', // The ID of a field to copy the iCalendar definition into, or blank for clipboard
		start: null,  // The start date/time of the event
		end: null,  // The end date/time of the event
		title: '',  // The title of the event
		summary: '',  // The summary of the event
		description: '',  // The description of the event
		location: '',  // The location of the event
		url: '',  // A URL with more information about the event
		contact: '',  // An e-mail address for further contact about the event
		recurrence: null, // Details about a recurring event, an object with attributes:
			// dates (Date or Date[]) or times (Date or Date[]) or
			// periods (Date[2] or Date[][2] or [][Date, string]) or
			// freq (string - secondly, minutely, hourly, daily, weekly, monthly, yearly),
			// interval (number), until (Date), count (number), weekStart (number),
			// by (object or object[] - type (string - second, minute, day, monthday, yearday,
			// weekno, month, setpos), values (number or number[] or string or string[]))
		// Confirmation message for clipboard copy
		copyConfirm: 'The event will be copied to your clipboard. Continue?',
		// Success message during clipboard copy
		copySucceeded: 'The event has been copied to your clipboard',
		// Failure message during clipboard copy
		copyFailed: 'Failed to copy the event to the clipboard\n',
		copyFlash: 'clipboard.swf', // The URL for the Flash clipboard copy module
		// Clipboard not supported message
		copyUnavailable: 'The clipboard is unavailable, please copy the event details from below:\n'
	};
	this._sites = {  // The definitions of the available iCalendar sites
		'google': {display: 'Google', icon: 0, override: null,
			url: 'http://www.google.com/calendar/event?action=TEMPLATE' +
			'&amp;text={t}&amp;dates={s}/{e}&amp;details={d}&amp;location={l}&amp;sprop=website:{u}'},
		'icalendar': {display: 'iCalendar', icon: 1, override: null, url: 'echo'},
		'outlook': {display: 'Outlook', icon: 2, override: null, url: 'echo'},
		'yahoo': {display: 'Yahoo', icon: 3, override: yahooOverride,
			url: 'http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20' +
			'&amp;title={t}&amp;st={s}&amp;dur={p}&amp;desc={d}&amp;in_loc={l}&amp;url={u}&amp;rpat={r}'}
	};
}

var FREQ_SETTINGS = [{method: 'Seconds', factor: 1},
	{method: 'Minutes', factor: 60}, {method: 'Hours', factor: 3600},
	{method: 'Date', factor: 86400}, {method: 'Month', factor: 1},
	{method: 'FullYear', factor: 12}, {method: 'Date', factor: 604800}];
var SE = 0;
var MI = 1;
var HR = 2;
var DY = 3;
var MO = 4;
var YR = 5;
var WK = 6;

$.extend(iCalendar.prototype, {
	/* Class name added to elements to indicate already configured with iCalendar. */
	markerClassName: 'hasICalendar',

	/* Override the default settings for all iCalendar instances.
	   @param  settings  (object) the new settings to use as defaults
	   @return void */
	setDefaults: function(settings) {
		extendRemove(this._defaults, settings || {});
		return this;
	},

	/* Add a new iCalendar site to the list.
	   @param  id        (string) the ID of the new site
	   @param  display   (string) the display name for this site
	   @param  icon      (url) the location of an icon for this site (16x16), or
	                     (number) the index of the icon within the combined image
	   @param  url       (url) the submission URL for this site
	                     with {t} marking where the event title should be inserted,
	                     {s} indicating the event start date/time insertion point,
	                     {e} indicating the event end date/time insertion point,
	                     {p} indicating the event period (duration) insertion point,
	                     {d} indicating the event description insertion point,
	                     {l} indicating the event location insertion point,
	                     {u} indicating the event URL insertion point,
	                     {c} indicating the event contact insertion point,
	                     {r} indicating the event recurrence insertion point
	   @param  override  (function, optional) a function to override default settings
	   @return void */
	addSite: function(id, display, icon, url, override) {
		this._sites[id] = {display: display, icon: icon, override: override, url: url};
		return this;
	},

	/* Return the list of defined sites.
	   @return  object[] - indexed by site id (string), each object contains
	            display (string) the display name,
	            icon    (string) the location of the icon, or
	                    (number) the icon's index in the combined image
	            url     (string) the submission URL for the site */
	getSites: function() {
		return this._sites;
	},

	/* Attach the iCalendar widget to a div. */
	_attachICalendar: function(target, settings) {
		target = $(target);
		if (target.hasClass(this.markerClassName)) {
			return;
		}
		target.addClass(this.markerClassName);
		this._updateICalendar(target, settings);
	},

	/* Reconfigure the settings for an iCalendar div. */
	_changeICalendar: function(target, settings) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		this._updateICalendar(target, settings);
	},

	/* Construct the requested iCalendar links. */
	_updateICalendar: function(target, settings) {
		settings = extendRemove($.extend({}, this._defaults,
			$.data(target[0], PROP_NAME) || {}), settings);
		$.data(target[0], PROP_NAME, settings);
		var sites = settings.sites || this._defaults.sites;
		if (sites.length == 0) { // default to all sites
			$.each(this._sites, function(id) {
				sites[sites.length] = id;
			});
		}
		var addSite = function(site, calId) {
			var inserts = {t: encodeURIComponent(settings.title),
				d: encodeURIComponent(settings.description),
				s: $.icalendar.formatDateTime(settings.start),
				e: $.icalendar.formatDateTime(settings.end),
				p: $.icalendar.calculateDuration(settings.start, settings.end),
				l: encodeURIComponent(settings.location),
				u: encodeURIComponent(settings.url),
				c: encodeURIComponent(settings.contact),
				r: makeRecurrence(settings.recurrence)};
			if (site.override) {
				site.override.apply(target, [inserts, settings]);
			}
			var url = site.url;
			$.each(inserts, function(n, v) {
				var re = new RegExp('\\{' + n + '\\}', 'g');
				url = url.replace(re, v);
			});
			var url = (site.url == 'echo' ? '#' : url);
			var item = $('<li></li>');
			var anchor = $('<a href="' + url + '" title="' + settings.tipPrefix + site.display + '"' +
				(site.url == 'echo' ? '' : ' target="' + settings._target + '"') + '></a>');
			if (site.url == 'echo') {
				anchor.click(function() {
					return $.icalendar._echo(target[0], calId);
				});
			}
			var html = '';
			if (site.icon != null) {
				if (typeof site.icon == 'number') {
					html += '<span style="background: ' +
						'transparent url(' + settings.icons + ') no-repeat -' +
						(site.icon * settings.iconSize) + 'px 0px;' +
						($.browser.mozilla && $.browser.version < '1.9' ?
						' padding-left: ' + settings.iconSize + 'px; padding-bottom: ' +
						Math.max(0, (settings.iconSize / 2) - 5) + 'px;' : '') + '"></span>';
				}
				else {
					html += '<img src="' + site.icon + '"' +
						(($.browser.mozilla && $.browser.version < '1.9') ||
						($.browser.msie && $.browser.version < '7.0') ?
						' style="vertical-align: bottom;"' :
						($.browser.msie ? ' style="vertical-align: middle;"' :
						($.browser.opera || $.browser.safari ?
						' style="vertical-align: baseline;"' : ''))) + '/>';
				}
				html +=	(settings.compact ? '' : '&#xa0;');
			}
			anchor.html(html + (settings.compact ? '' : site.display));
			item.append(anchor);
			return item;
		};
		var list = $('<ul class="icalendar_list' +
			(settings.compact ? ' icalendar_compact' : '') + '"></ul>');
		var allSites = this._sites;
		$.each(sites, function(index, id) {
			list.append(addSite(allSites[id], id));
		});
		target.empty().append(list);
		if (settings.popup) {
			list.before('<span class="icalendar_popup_text">' +
				settings.popupText + '</span>').
				wrap('<div class="icalendar_popup"></div>');
			target.click(function() {
				var target = $(this);
				var offset = target.offset();
				$('.icalendar_popup', target).css('left', offset.left).
					css('top', offset.top + target.outerHeight()).toggle();
			});
		}
	},

	/* Remove the iCalendar widget from a div. */
	_destroyICalendar: function(target) {
		target = $(target);
		if (!target.hasClass(this.markerClassName)) {
			return;
		}
		target.removeClass(this.markerClassName).empty();
		$.removeData(target[0], PROP_NAME);
	},

	/* Echo the iCalendar text back to the user either as a
	   downloadable file or via the clipboard.
	   @param  target  (element) the owning division
	   @param  calId  (string) the ID of the site to send the calendar to */
	_echo: function(target, calId) {
		var settings = $.data(target, PROP_NAME);
		var event = makeICalendar(settings);
		if (settings.echoUrl) {
			window.location.href = settings.echoUrl + '?content=' + escape(event);
		}
		else if (settings.echoField) {
			$(settings.echoField).val(event);
		}
		else if (!settings.copyFlash) {
			alert(settings.copyUnavailable + event);
		}
		else if (confirm(settings.copyConfirm)) {
			var error = '';
			if (error = copyViaFlash(event, settings.copyFlash)) {
				alert(settings.copyFailed + error);
				}
				else {
				alert(settings.copySucceeded);
				}
			}
		return false; // Don't follow link
	},
	
	/* Ensure a string has at least two digits.
	   @param  value  (number) the number to convert
	   @return  (string) the string equivalent */
	_ensureTwo: function(value) {
		return (value < 10 ? '0' : '') + value;
	},

	/* Format a date for iCalendar: yyyymmdd.
	   @param  date   (Date) the date to format
	   @return  (string) the formatted date */
	formatDate: function(date, local) {
		return (!date ? '' : '' + date.getFullYear() +
			this._ensureTwo(date.getMonth() + 1) + this._ensureTwo(date.getDate()));
	},

	/* Format a date/time for iCalendar: yyyymmddThhmmss[Z].
	   @param  dateTime  (Date) the date/time to format
	   @param  local     (boolean) true if this should be a local date/time
	   @return  (string) the formatted date/time */
	formatDateTime: function(dateTime, local) {
		return (!dateTime ? '' : (local ?
			'' + dateTime.getFullYear() + this._ensureTwo(dateTime.getMonth() + 1) +
			this._ensureTwo(dateTime.getDate()) + 'T' + this._ensureTwo(dateTime.getHours()) +
			this._ensureTwo(dateTime.getMinutes()) + this._ensureTwo(dateTime.getSeconds()) :
			'' + dateTime.getUTCFullYear() + this._ensureTwo(dateTime.getUTCMonth() + 1) +
			this._ensureTwo(dateTime.getUTCDate()) + 'T' + this._ensureTwo(dateTime.getUTCHours()) +
			this._ensureTwo(dateTime.getUTCMinutes()) + this._ensureTwo(dateTime.getUTCSeconds()) + 'Z'));
	},

	/* Calculate the duration between two date/times.
	   @param  start  (Date) the starting date/time
	   @param  end    (Date) the ending date/time
	   @return  (string) the formatted duration or blank if invalid parameters */
	calculateDuration: function(start, end) {
		if (!start || !end) {
			return '';
		}
		var seconds = Math.abs(end.getTime() - start.getTime()) / 1000;
		var days = Math.floor(seconds / 86400);
		seconds -= days * 86400;
		var hours = Math.floor(seconds / 3600);
		seconds -= hours * 3600;
		var minutes = Math.floor(seconds / 60);
		seconds -= minutes * 60;
		return (start.getTime() > end.getTime() ? '-' : '') +
			'P' + (days > 0 ? days + 'D' : '') +
			(hours || minutes || seconds ? 'T' + hours + 'H' : '') +
			(minutes || seconds ? minutes + 'M' : '') + (seconds ? seconds + 'S' : '');
	},

	/* Calculate the end date/time given a start and a duration.
	   @param  start     (Date) the starting date/time
	   @param  duration  (string) the description of the duration
	   @return  (Date) the ending date/time
	   @throws  error if an invalid duration is found */
	addDuration: function(start, duration) {
		if (!duration) {
			return start;
		}
		var end = new Date(start.getTime());
		var matches = DURATION.exec(duration);
		if (!matches) {
			throw 'Invalid duration';
		}
		if (matches[2] && (matches[3] || matches[5] || matches[6] || matches[7])) {
			throw 'Invalid duration - week must be on its own'; // Week must be on its own
		}
		if (!matches[4] && (matches[5] || matches[6] || matches[7])) {
			throw 'Invalid duration - missing time marker'; // Missing T with hours/minutes/seconds
		}
		var sign = (matches[1] == '-' ? -1 : +1);
		var apply = function(value, factor, method) {
			value = parseInt(value);
			if (!isNaN(value)) {
				end['setUTC' + method](end['getUTC' + method]() + sign * value * factor);
			}
		};
		if (matches[2]) {
			apply(matches[2], 7, 'Date');
		}
		else {
			apply(matches[3], 1, 'Date');
			apply(matches[5], 1, 'Hours');
			apply(matches[6], 1, 'Minutes');
			apply(matches[7], 1, 'Seconds');
		}
		return end;
	},

	/* Parse the iCalendar data into a JavaScript object model.
	   @param  content  (string) the original iCalendar data
	   @return  (object) the iCalendar JavaScript model
	   @throws  errors if the iCalendar structure is incorrect */
	parse: function(content) {
		var cal = {};
		var timezones = {};
		var lines = unfoldLines(content);
		parseGroup(lines, 0, cal, timezones);
		if (!cal.vcalendar) {
			throw 'Invalid iCalendar data';
		}
		return cal.vcalendar;
	},

	/* Calculate the week of the year for a given date
	   according to the ISO 8601 definition.
	   @param  date       (Date) the date to calculate the week for
	   @param  weekStart  (number) the day on which a week starts:
	                      0 = Sun, 1 = Mon, ... (optional, defaults to 1)
	   @return  (number) the week for these parameters (1-53) */
	getWeekOfYear: function(date, weekStart) {
		return getWeekOfYear(date, weekStart);
	},

	_parseParams: function(owner, params) {
		return parseParams(owner, params);
	}
});

/* jQuery extend now ignores nulls! */
function extendRemove(target, props) {
	$.extend(target, props);
	for (var name in props) {
		if (props[name] == null) {
			target[name] = null;
		}
	}
	return target;
}

/* Attach the iCalendar functionality to a jQuery selection.
   @param  command  (string) the command to run (optional, default 'attach')
   @param  options  (object) the new settings to use for these iCalendar instances
   @return  (jQuery object) jQuery for chaining further calls */
$.fn.icalendar = function(options) {
	var otherArgs = Array.prototype.slice.call(arguments, 1);
	return this.each(function() {
		if (typeof options == 'string') {
			$.icalendar['_' + options + 'ICalendar'].
				apply($.icalendar, [this].concat(otherArgs));
		}
		else {
			$.icalendar._attachICalendar(this, options || {});
		}
	});
};

/* Initialise the iCalendar functionality. */
$.icalendar = new iCalendar(); // singleton instance

/* Override some substitution values for Yahoo.
   @param  inserts   (object) current values (updated)
   @param  settings  (object) current instance settings */
function yahooOverride(inserts, settings) {
	var twoDigits = function(value) {
		return (value < 10 ? '0' : '') + value;
	};
	var dur = (settings.end ? (settings.end.getTime() - settings.start.getTime()) / 60000 : 0);
	inserts.p = (dur ? twoDigits(Math.floor(dur / 60)) + '' + twoDigits(dur % 60) : ''); // hhmm
	if (inserts.r) {
		var byDay = (settings.recurrence.by && settings.recurrence.by[0].type == 'day' ?
			settings.recurrence.by[0].values.join('').toLowerCase() : '');
		var freq = {daily: 'dy', weekly: 'wk', monthly: 'mh', yearly: 'yr'}[settings.recurrence.freq];
		inserts.r = (byDay || freq ? twoDigits(settings.recurrence.interval || 1) + (byDay || freq) : '');
	}
}

/* Construct an iCalendar with an event object.
   @param  event  (object) the event details
   @return  (string) the iCalendar definition */
function makeICalendar(event) {
	var limit75 = function(text) {
		var out = '';
		while (text.length > 75) {
			out += text.substr(0, 75) + '\n';
			text = ' ' + text.substr(75);
		}
		out += text;
		return out;
	};
	return 'BEGIN:VCALENDAR\n' +
		'VERSION:2.0\n' +
		'PRODID:jquery.icalendar\n' +
		'METHOD:PUBLISH\n' +
		'BEGIN:VEVENT\n' +
		'UID:' + new Date().getTime() + '@' +
		(window.location.href.replace(/^[^\/]*\/\/([^\/]*)\/.*$/, '$1') || 'localhost') + '\n' +
		'DTSTAMP:' + $.icalendar.formatDateTime(new Date()) + '\n' +
		(event.url ? limit75('URL:' + event.url) + '\n' : '') +
		(event.contact ? limit75('MAILTO:' + event.contact) + '\n' : '') +
		limit75('TITLE:' + event.title) + '\n' +
		'DTSTART:' + $.icalendar.formatDateTime(event.start) + '\n' +
		'DTEND:' + $.icalendar.formatDateTime(event.end) + '\n' +
		(event.summary ? limit75('SUMMARY:' + event.summary) + '\n' : '') +
		(event.description ? limit75('DESCRIPTION:' + event.description) + '\n' : '') +
		(event.location ? limit75('LOCATION:' + event.location) + '\n' : '') +
		(event.recurrence ? makeRecurrence(event.recurrence) + '\n' : '') +
		'END:VEVENT\n' +
		'END:VCALENDAR';
}

/* Construct an iCalendar recurrence definition.
   @param  recur  (object) the recurrence details
   @return  (string) the iCalendar definition */
function makeRecurrence(recur) {
	if (!recur) {
	return '';
	}
	var def = '';
	if (recur.dates) {
		def = 'RDATE;VALUE=DATE:';
		if (!isArray(recur.dates)) {
			recur.dates = [recur.dates];
		}
		for (var i = 0; i < recur.dates.length; i++) {
			def += (i > 0 ? ',' : '') + $.icalendar.formatDate(recur.dates[i]);
		}
	}
	else if (recur.times) {
		def = 'RDATE;VALUE=DATE-TIME:';
		if (!isArray(recur.times)) {
			recur.times = [recur.times];
		}
		for (var i = 0; i < recur.times.length; i++) {
			def += (i > 0 ? ',' : '') + $.icalendar.formatDateTime(recur.times[i]);
		}
	}
	else if (recur.periods) {
		def = 'RDATE;VALUE=PERIOD:';
		if (!isArray(recur.periods[0])) {
			recur.periods = [recur.periods];
		}
		for (var i = 0; i < recur.periods.length; i++) {
			def += (i > 0 ? ',' : '') + $.icalendar.formatDateTime(recur.periods[i][0]) +
				'/' + (recur.periods[i][1].constructor != Date ? recur.periods[i][1] :
				$.icalendar.formatDateTime(recur.periods[i][1]));
		}
	}
	else {
		def = 'RRULE:FREQ=' + (recur.freq || 'daily').toUpperCase() +
			(recur.interval ? ';INTERVAL=' + recur.interval : '') +
			(recur.until ? ';UNTIL=' + $.icalendar.formatDateTime(recur.until) :
			(recur.count ? ';COUNT=' + recur.count : '')) +
			(recur.weekStart != null ? ';WKST=' +
			['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'][recur.weekStart] : '');
		if (recur.by) {
			if (!isArray(recur.by)) {
				recur.by = [recur.by];
			}
			for (var i = 0; i < recur.by.length; i++) {
				if (!isArray(recur.by[i].values)) {
					recur.by[i].values = [recur.by[i].values];
				}
				def += ';BY' + recur.by[i].type.toUpperCase() + '=' +
					recur.by[i].values.join(',');
			}
		}
	}
	return def;
}

/* Copy the given text to the system clipboard via Flash.
   @param  text  (string) the text to copy
   @param  url   (string) the URL for the Flash clipboard copy module
   @return  (string) '' if successful, error message if not */
function copyViaFlash(text, url) {
	$('#' + FLASH_ID).remove();
	try {
		$('body').append('<div id="' + FLASH_ID + '"><embed src="' + url +
		'" FlashVars="clipboard=' + encodeURIComponent(text) +
		'" width="0" height="0" type="application/x-shockwave-flash"></embed></div>');
		return '';
	}
	catch(e) {
		return e;
	}
}

/* Pattern for folded lines: start with a whitespace character */
var FOLDED = /^\s(.*)$/;
/* Pattern for an individual entry: name:value */
var ENTRY = /^([A-Za-z0-9-]+)((?:;[A-Za-z0-9-]+=(?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)*):(.*)$/;
/* Pattern for an individual parameter: name=value[,value] */
var PARAM = /;([A-Za-z0-9-]+)=((?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)/g;
/* Pattern for an individual parameter value: value | "value" */
var PARAM_VALUE = /,?("[^"]+"|[^";:,]+)/g;
/* Pattern for a date only field: yyyymmdd */
var DATEONLY = /^(\d{4})(\d\d)(\d\d)$/;
/* Pattern for a date/time field: yyyymmddThhmmss[Z] */
var DATETIME = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
/* Pattern for a date/time range field: yyyymmddThhmmss[Z]/yyyymmddThhmmss[Z] */
var DATETIME_RANGE = /^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)\/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;
/* Pattern for a timezone offset field: +hhmm */
var TZ_OFFSET = /^([+-])(\d\d)(\d\d)$/;
/* Pattern for a duration: [+-]PnnW or [+-]PnnDTnnHnnMnnS */
var DURATION = /^([+-])?P(\d+W)?(\d+D)?(T)?(\d+H)?(\d+M)?(\d+S)?$/;
/* Reserved names not suitable for attrbiute names. */
var RESERVED_NAMES = ['class'];

/* iCalendar lines are split so the max length is no more than 75.
   Split lines start with a whitespace character.
   @param  content  (string) the original iCalendar data
   @return  (string[]) the restored iCalendar data */
function unfoldLines(content) {
	var lines = content.replace(/\r\n/g, '\n').split('\n');
	for (var i = lines.length - 1; i > 0; i--) {
		var matches = FOLDED.exec(lines[i]);
		if (matches) {
			lines[i - 1] += matches[1];
			lines[i] = '';
		}
	}
	return $.map(lines, function(line, i) { // Remove blank lines
		return (line ? line : null);
	});
}

/* Parse a group in the file, delimited by BEGIN:xxx and END:xxx.
   Recurse if an embedded group encountered.
   @param  lines      (string[]) the iCalendar data
   @param  index      (number) the current position within the data
   @param  owner      (object) the current owner for the new group
   @param  timezones  (object) collection of defined timezones
   @return  (number) the updated position after processing this group
   @throws  errors if group structure is incorrect */
function parseGroup(lines, index, owner, timezones) {
	if (index >= lines.length || lines[index].indexOf('BEGIN:') != 0) {
		throw 'Missing group start';
	}
	var group = {};
	var name = lines[index].substr(6);
	addEntry(owner, name.toLowerCase(), group);
	index++;
	while (index < lines.length && lines[index].indexOf('END:') != 0) {
		if (lines[index].indexOf('BEGIN:') == 0) { // Recurse for embedded group
			index = parseGroup(lines, index, group, timezones);
		}
		else {
			var entry = parseEntry(lines[index]);
			addEntry(group, entry._name, (entry._simple ? entry._value : entry));
		}
		index++;
	}
	if (name == 'VTIMEZONE') { // Save timezone offset
		var matches = TZ_OFFSET.exec(group.standard.tzoffsetto);
		if (matches) {
			timezones[group.tzid] = (matches[1] == '-' ? -1 : +1) *
				(parseInt(matches[2], 10) * 60 + parseInt(matches[3], 10));
		}
	}
	else {
		for (var name2 in group) {
			resolveTimezones(group[name2], timezones);
		}
	}
	if (lines[index] != 'END:' + name) {
		throw 'Missing group end ' + name;
	}
	return index;
}

/* Resolve timezone references for dates.
   @param  value  (any) the current value to check - updated if appropriate
   @param  timezones  (object) collection of defined timezones */
function resolveTimezones(value, timezones) {
	if (!value) {
		return;
	}
	if (value.tzid && value._value) {
		var offset = timezones[value.tzid];
		var offsetDate = function(date, tzid) {
			date.setMinutes(date.getMinutes() - offset);
			date._type = tzid;
		};
		if (isArray(value._value)) {
			for (var i = 0; i < value._value.length; i++) {
				offsetDate(value._value[i], value.tzid);
			}
		}
		else if (value._value.start && value._value.end) {
			offsetDate(value._value.start, value.tzid);
			offsetDate(value._value.end, value.tzid);
		}
		else {
			offsetDate(value._value, value.tzid);
		}
	}
	else if (isArray(value)) {
		for (var i = 0; i < value.length; i++) {
			resolveTimezones(value[i], timezones);
		}
	}
}

/* Add a new entry to an object, making multiple entries into an array.
   @param  owner  (object) the owning object for the new entry
   @param  name   (string) the name of the new entry
   @param  value  (string or object) the new entry value */
function addEntry(owner, name, value) {
	if (typeof value == 'string') {
		value = value.replace(/\\n/g, '\n');
	}
	if ($.inArray(name, RESERVED_NAMES) > -1) {
		name += '_';
	}
	if (owner[name]) { // Turn multiple values into an array
		if (!isArray(owner[name]) || owner['_' + name + 'IsArray']) {
			owner[name] = [owner[name]];
		}
		owner[name][owner[name].length] = value;
		if (owner['_' + name + 'IsArray']) {
			owner['_' + name + 'IsArray'] = undefined;
		}
	}
	else {
		owner[name] = value;
		if (isArray(value)) {
			owner['_' + name + 'IsArray'] = true;
		}
	}
}

/* Parse an individual entry.
   The format is: <name>[;<param>=<pvalue>]...:<value>
   @param  line  (string) the line to parse
   @return  (object) the parsed entry with _name and _value
            attributes, _simple to indicate whether or not
            other parameters, and other parameters as necessary */
function parseEntry(line) {
	var entry = {};
	var matches = ENTRY.exec(line);
	if (!matches) {
		throw 'Missing entry name: ' + line;
	}
	entry._name = matches[1].toLowerCase();
	entry._value = checkDate(matches[3]);
	entry._simple = true;
	parseParams(entry, matches[2]);
	return entry;
}

/* Parse parameters for an individual entry.
   The format is: <param>=<pvalue>[;...]
   @param  owner   (object) the owning object for the parameters,
                   updated with parameters as attributes, and
				   _simple to indicate whether or not other parameters
   @param  params  (string or string[]) the parameters to parse */
function parseParams(owner, params) {
	var param = PARAM.exec(params);
	while (param) {
		var values = [];
		var value = PARAM_VALUE.exec(param[2]);
		while (value) {
			values.push(checkDate(value[1].replace(/^"(.*)"$/, '$1')));
			value = PARAM_VALUE.exec(param[2]);
		}
		owner[param[1].toLowerCase()] = (values.length > 1 ? values : values[0]);
		owner._simple = false;
		param = PARAM.exec(params);
	}
}

/* Convert a value into a Date object or array of Date objects if appropriate.
   @param  value  (string) the value to check
   @return  (string or Date) the converted value (if appropriate) */
function checkDate(value) {
	var matches = DATETIME.exec(value);
	if (matches) {
		return makeDate(matches);
	}
	matches = DATETIME_RANGE.exec(value);
	if (matches) {
		return {start: makeDate(matches), end: makeDate(matches.slice(7))};
	}
	matches = DATEONLY.exec(value);
	if (matches) {
		return makeDate(matches.concat([0, 0, 0, '']));
	}
	return value;
}

/* Create a date value from matches on a string.
   @param  matches  (string[]) the component parts of the date
   @return  (Date) the corresponding date */
function makeDate(matches) {
	var date = new Date(matches[1], matches[2] - 1, matches[3],
		matches[4], matches[5], matches[6]);
	date._type = (matches[7] ? 'UTC' : 'float');
	return utcDate(date);
}

/* Standardise a date to UTC.
   @param  date  (Date) the date to standardise
   @return  (Date) the equivalent UTC date */
function utcDate(date) {
	date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
	return date;
}

/* Calculate the week of the year for a given date
   according to the ISO 8601 definition.
   @param  date       (Date) the date to calculate the week for
   @param  weekStart  (number) the day on which a week starts:
                      0 = Sun, 1 = Mon, ... (optional, defaults to 1)
   @return  (number) the week for these parameters (1-53) */
function getWeekOfYear(date, weekStart) {
	weekStart = (weekStart || weekStart == 0 ? weekStart : 1);
	var checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(),
		(date.getTimezoneOffset() / -60));
	var firstDay = new Date(checkDate.getFullYear(), 1 - 1, 4); // First week always contains 4 Jan
	var firstDOW = firstDay.getDay(); // Day of week: Sun = 0, Mon = 1, ...
	firstDay.setDate(4 + weekStart - firstDOW - (weekStart > firstDOW ? 7 : 0)); // Preceding week start
	if (checkDate < firstDay) { // Adjust first three days in year if necessary
		checkDate.setDate(checkDate.getDate() - 3); // Generate for previous year
		return getWeekOfYear(checkDate, weekStart);
	} else if (checkDate > new Date(checkDate.getFullYear(), 12 - 1, 28)) { // Check last three days in year
		var firstDay2 = new Date(checkDate.getFullYear() + 1, 1 - 1, 4); // Find first week in next year
		firstDOW = firstDay2.getDay();
		firstDay2.setDate(4 + weekStart - firstDOW - (weekStart > firstDOW ? 7 : 0));
		if (checkDate >= firstDay2) { // Adjust if necessary
			return 1;
		}
	}
	return Math.floor(((checkDate - firstDay) /
		(FREQ_SETTINGS[DY].factor * 1000)) / 7) + 1; // Weeks to given date
}

/* Determine whether an object is an array.
   @param  a  (object) the object to test
   @return  (boolean) true if it is an array, or false if not */
function isArray(a) {
	return (a && a.constructor == Array);
}

})(jQuery);

/* http://keith-wood.name/icalendar.html
   iCalendar processing for jQuery v1.1.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) October 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
(function($){var p='icalendar';var q='icalendar-flash-copy';function iCalendar(){this._defaults={sites:[],icons:'icalendar.png',iconSize:16,target:'_blank',compact:false,popup:false,popupText:'Send to my calendar...',tipPrefix:'',echoUrl:'',echoField:'',start:null,end:null,title:'',summary:'',description:'',location:'',url:'',contact:'',recurrence:null,copyConfirm:'The event will be copied to your clipboard. Continue?',copySucceeded:'The event has been copied to your clipboard',copyFailed:'Failed to copy the event to the clipboard\n',copyFlash:'clipboard.swf',copyUnavailable:'The clipboard is unavailable, please copy the event details from below:\n'};this._sites={'google':{display:'Google',icon:0,override:null,url:'http://www.google.com/calendar/event?action=TEMPLATE'+'&amp;text={t}&amp;dates={s}/{e}&amp;details={d}&amp;location={l}&amp;sprop=website:{u}'},'icalendar':{display:'iCalendar',icon:1,override:null,url:'echo'},'outlook':{display:'Outlook',icon:2,override:null,url:'echo'},'yahoo':{display:'Yahoo',icon:3,override:yahooOverride,url:'http://calendar.yahoo.com/?v=60&amp;view=d&amp;type=20'+'&amp;title={t}&amp;st={s}&amp;dur={p}&amp;desc={d}&amp;in_loc={l}&amp;url={u}&amp;rpat={r}'}}}var r=[{method:'Seconds',factor:1},{method:'Minutes',factor:60},{method:'Hours',factor:3600},{method:'Date',factor:86400},{method:'Month',factor:1},{method:'FullYear',factor:12},{method:'Date',factor:604800}];var s=0;var t=1;var u=2;var w=3;var x=4;var y=5;var z=6;$.extend(iCalendar.prototype,{markerClassName:'hasICalendar',setDefaults:function(a){extendRemove(this._defaults,a||{});return this},addSite:function(a,b,c,d,e){this._sites[a]={display:b,icon:c,override:e,url:d};return this},getSites:function(){return this._sites},_attachICalendar:function(a,b){a=$(a);if(a.hasClass(this.markerClassName)){return}a.addClass(this.markerClassName);this._updateICalendar(a,b)},_changeICalendar:function(a,b){a=$(a);if(!a.hasClass(this.markerClassName)){return}this._updateICalendar(a,b)},_updateICalendar:function(i,j){j=extendRemove($.extend({},this._defaults,$.data(i[0],p)||{}),j);$.data(i[0],p,j);var k=j.sites||this._defaults.sites;if(k.length==0){$.each(this._sites,function(a){k[k.length]=a})}var l=function(b,c){var d={t:encodeURIComponent(j.title),d:encodeURIComponent(j.description),s:$.icalendar.formatDateTime(j.start),e:$.icalendar.formatDateTime(j.end),p:$.icalendar.calculateDuration(j.start,j.end),l:encodeURIComponent(j.location),u:encodeURIComponent(j.url),c:encodeURIComponent(j.contact),r:makeRecurrence(j.recurrence)};if(b.override){b.override.apply(i,[d,j])}var e=b.url;$.each(d,function(n,v){var a=new RegExp('\\{'+n+'\\}','g');e=e.replace(a,v)});var e=(b.url=='echo'?'#':e);var f=$('<li></li>');var g=$('<a href="'+e+'" title="'+j.tipPrefix+b.display+'"'+(b.url=='echo'?'':' target="'+j._target+'"')+'></a>');if(b.url=='echo'){g.click(function(){return $.icalendar._echo(i[0],c)})}var h='';if(b.icon!=null){if(typeof b.icon=='number'){h+='<span style="background: '+'transparent url('+j.icons+') no-repeat -'+(b.icon*j.iconSize)+'px 0px;'+($.browser.mozilla&&$.browser.version<'1.9'?' padding-left: '+j.iconSize+'px; padding-bottom: '+Math.max(0,(j.iconSize/2)-5)+'px;':'')+'"></span>'}else{h+='<img src="'+b.icon+'"'+(($.browser.mozilla&&$.browser.version<'1.9')||($.browser.msie&&$.browser.version<'7.0')?' style="vertical-align: bottom;"':($.browser.msie?' style="vertical-align: middle;"':($.browser.opera||$.browser.safari?' style="vertical-align: baseline;"':'')))+'/>'}h+=(j.compact?'':'&#xa0;')}g.html(h+(j.compact?'':b.display));f.append(g);return f};var m=$('<ul class="icalendar_list'+(j.compact?' icalendar_compact':'')+'"></ul>');var o=this._sites;$.each(k,function(a,b){m.append(l(o[b],b))});i.empty().append(m);if(j.popup){m.before('<span class="icalendar_popup_text">'+j.popupText+'</span>').wrap('<div class="icalendar_popup"></div>');i.click(function(){var a=$(this);var b=a.offset();$('.icalendar_popup',a).css('left',b.left).css('top',b.top+a.outerHeight()).toggle()})}},_destroyICalendar:function(a){a=$(a);if(!a.hasClass(this.markerClassName)){return}a.removeClass(this.markerClassName).empty();$.removeData(a[0],p)},_echo:function(a,b){var c=$.data(a,p);var d=makeICalendar(c);if(c.echoUrl){window.location.href=c.echoUrl+'?content='+escape(d)}else if(c.echoField){$(c.echoField).val(d)}else if(!c.copyFlash){alert(c.copyUnavailable+d)}else if(confirm(c.copyConfirm)){var e='';if(e=copyViaFlash(d,c.copyFlash)){alert(c.copyFailed+e)}else{alert(c.copySucceeded)}}return false},_ensureTwo:function(a){return(a<10?'0':'')+a},formatDate:function(a,b){return(!a?'':''+a.getFullYear()+this._ensureTwo(a.getMonth()+1)+this._ensureTwo(a.getDate()))},formatDateTime:function(a,b){return(!a?'':(b?''+a.getFullYear()+this._ensureTwo(a.getMonth()+1)+this._ensureTwo(a.getDate())+'T'+this._ensureTwo(a.getHours())+this._ensureTwo(a.getMinutes())+this._ensureTwo(a.getSeconds()):''+a.getUTCFullYear()+this._ensureTwo(a.getUTCMonth()+1)+this._ensureTwo(a.getUTCDate())+'T'+this._ensureTwo(a.getUTCHours())+this._ensureTwo(a.getUTCMinutes())+this._ensureTwo(a.getUTCSeconds())+'Z'))},calculateDuration:function(a,b){if(!a||!b){return''}var c=Math.abs(b.getTime()-a.getTime())/1000;var d=Math.floor(c/86400);c-=d*86400;var e=Math.floor(c/3600);c-=e*3600;var f=Math.floor(c/60);c-=f*60;return(a.getTime()>b.getTime()?'-':'')+'P'+(d>0?d+'D':'')+(e||f||c?'T'+e+'H':'')+(f||c?f+'M':'')+(c?c+'S':'')},addDuration:function(d,e){if(!e){return d}var f=new Date(d.getTime());var g=I.exec(e);if(!g){throw'Invalid duration';}if(g[2]&&(g[3]||g[5]||g[6]||g[7])){throw'Invalid duration - week must be on its own';}if(!g[4]&&(g[5]||g[6]||g[7])){throw'Invalid duration - missing time marker';}var h=(g[1]=='-'?-1:+1);var i=function(a,b,c){a=parseInt(a);if(!isNaN(a)){f['setUTC'+c](f['getUTC'+c]()+h*a*b)}};if(g[2]){i(g[2],7,'Date')}else{i(g[3],1,'Date');i(g[5],1,'Hours');i(g[6],1,'Minutes');i(g[7],1,'Seconds')}return f},parse:function(a){var b={};var c={};var d=unfoldLines(a);parseGroup(d,0,b,c);if(!b.vcalendar){throw'Invalid iCalendar data';}return b.vcalendar},getWeekOfYear:function(a,b){return getWeekOfYear(a,b)},_parseParams:function(a,b){return parseParams(a,b)}});function extendRemove(a,b){$.extend(a,b);for(var c in b){if(b[c]==null){a[c]=null}}return a}$.fn.icalendar=function(a){var b=Array.prototype.slice.call(arguments,1);return this.each(function(){if(typeof a=='string'){$.icalendar['_'+a+'ICalendar'].apply($.icalendar,[this].concat(b))}else{$.icalendar._attachICalendar(this,a||{})}})};$.icalendar=new iCalendar();function yahooOverride(b,c){var d=function(a){return(a<10?'0':'')+a};var e=(c.end?(c.end.getTime()-c.start.getTime())/60000:0);b.p=(e?d(Math.floor(e/60))+''+d(e%60):'');if(b.r){var f=(c.recurrence.by&&c.recurrence.by[0].type=='day'?c.recurrence.by[0].values.join('').toLowerCase():'');var g={daily:'dy',weekly:'wk',monthly:'mh',yearly:'yr'}[c.recurrence.freq];b.r=(f||g?d(c.recurrence.interval||1)+(f||g):'')}}function makeICalendar(c){var d=function(a){var b='';while(a.length>75){b+=a.substr(0,75)+'\n';a=' '+a.substr(75)}b+=a;return b};return'BEGIN:VCALENDAR\n'+'VERSION:2.0\n'+'PRODID:jquery.icalendar\n'+'METHOD:PUBLISH\n'+'BEGIN:VEVENT\n'+'UID:'+new Date().getTime()+'@'+(window.location.href.replace(/^[^\/]*\/\/([^\/]*)\/.*$/,'$1')||'localhost')+'\n'+'DTSTAMP:'+$.icalendar.formatDateTime(new Date())+'\n'+(c.url?d('URL:'+c.url)+'\n':'')+(c.contact?d('MAILTO:'+c.contact)+'\n':'')+d('TITLE:'+c.title)+'\n'+'DTSTART:'+$.icalendar.formatDateTime(c.start)+'\n'+'DTEND:'+$.icalendar.formatDateTime(c.end)+'\n'+(c.summary?d('SUMMARY:'+c.summary)+'\n':'')+(c.description?d('DESCRIPTION:'+c.description)+'\n':'')+(c.location?d('LOCATION:'+c.location)+'\n':'')+(c.recurrence?makeRecurrence(c.recurrence)+'\n':'')+'END:VEVENT\n'+'END:VCALENDAR'}function makeRecurrence(a){if(!a){return''}var b='';if(a.dates){b='RDATE;VALUE=DATE:';if(!isArray(a.dates)){a.dates=[a.dates]}for(var i=0;i<a.dates.length;i++){b+=(i>0?',':'')+$.icalendar.formatDate(a.dates[i])}}else if(a.times){b='RDATE;VALUE=DATE-TIME:';if(!isArray(a.times)){a.times=[a.times]}for(var i=0;i<a.times.length;i++){b+=(i>0?',':'')+$.icalendar.formatDateTime(a.times[i])}}else if(a.periods){b='RDATE;VALUE=PERIOD:';if(!isArray(a.periods[0])){a.periods=[a.periods]}for(var i=0;i<a.periods.length;i++){b+=(i>0?',':'')+$.icalendar.formatDateTime(a.periods[i][0])+'/'+(a.periods[i][1].constructor!=Date?a.periods[i][1]:$.icalendar.formatDateTime(a.periods[i][1]))}}else{b='RRULE:FREQ='+(a.freq||'daily').toUpperCase()+(a.interval?';INTERVAL='+a.interval:'')+(a.until?';UNTIL='+$.icalendar.formatDateTime(a.until):(a.count?';COUNT='+a.count:''))+(a.weekStart!=null?';WKST='+['SU','MO','TU','WE','TH','FR','SA'][a.weekStart]:'');if(a.by){if(!isArray(a.by)){a.by=[a.by]}for(var i=0;i<a.by.length;i++){if(!isArray(a.by[i].values)){a.by[i].values=[a.by[i].values]}b+=';BY'+a.by[i].type.toUpperCase()+'='+a.by[i].values.join(',')}}}return b}function copyViaFlash(a,b){$('#'+q).remove();try{$('body').append('<div id="'+q+'"><embed src="'+b+'" FlashVars="clipboard='+encodeURIComponent(a)+'" width="0" height="0" type="application/x-shockwave-flash"></embed></div>');return''}catch(e){return e}}var A=/^\s(.*)$/;var B=/^([A-Za-z0-9-]+)((?:;[A-Za-z0-9-]+=(?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)*):(.*)$/;var C=/;([A-Za-z0-9-]+)=((?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)/g;var D=/,?("[^"]+"|[^";:,]+)/g;var E=/^(\d{4})(\d\d)(\d\d)$/;var F=/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;var G=/^(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)\/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)(Z?)$/;var H=/^([+-])(\d\d)(\d\d)$/;var I=/^([+-])?P(\d+W)?(\d+D)?(T)?(\d+H)?(\d+M)?(\d+S)?$/;var J=['class'];function unfoldLines(b){var c=b.replace(/\r\n/g,'\n').split('\n');for(var i=c.length-1;i>0;i--){var d=A.exec(c[i]);if(d){c[i-1]+=d[1];c[i]=''}}return $.map(c,function(a,i){return(a?a:null)})}function parseGroup(a,b,c,d){if(b>=a.length||a[b].indexOf('BEGIN:')!=0){throw'Missing group start';}var e={};var f=a[b].substr(6);addEntry(c,f.toLowerCase(),e);b++;while(b<a.length&&a[b].indexOf('END:')!=0){if(a[b].indexOf('BEGIN:')==0){b=parseGroup(a,b,e,d)}else{var g=parseEntry(a[b]);addEntry(e,g._name,(g._simple?g._value:g))}b++}if(f=='VTIMEZONE'){var h=H.exec(e.standard.tzoffsetto);if(h){d[e.tzid]=(h[1]=='-'?-1:+1)*(parseInt(h[2],10)*60+parseInt(h[3],10))}}else{for(var i in e){resolveTimezones(e[i],d)}}if(a[b]!='END:'+f){throw'Missing group end '+f;}return b}function resolveTimezones(c,d){if(!c){return}if(c.tzid&&c._value){var e=d[c.tzid];var f=function(a,b){a.setMinutes(a.getMinutes()-e);a._type=b};if(isArray(c._value)){for(var i=0;i<c._value.length;i++){f(c._value[i],c.tzid)}}else if(c._value.start&&c._value.end){f(c._value.start,c.tzid);f(c._value.end,c.tzid)}else{f(c._value,c.tzid)}}else if(isArray(c)){for(var i=0;i<c.length;i++){resolveTimezones(c[i],d)}}}function addEntry(a,b,c){if(typeof c=='string'){c=c.replace(/\\n/g,'\n')}if($.inArray(b,J)>-1){b+='_'}if(a[b]){if(!isArray(a[b])||a['_'+b+'IsArray']){a[b]=[a[b]]}a[b][a[b].length]=c;if(a['_'+b+'IsArray']){a['_'+b+'IsArray']=undefined}}else{a[b]=c;if(isArray(c)){a['_'+b+'IsArray']=true}}}function parseEntry(a){var b={};var c=B.exec(a);if(!c){throw'Missing entry name: '+a;}b._name=c[1].toLowerCase();b._value=checkDate(c[3]);b._simple=true;parseParams(b,c[2]);return b}function parseParams(a,b){var c=C.exec(b);while(c){var d=[];var e=D.exec(c[2]);while(e){d.push(checkDate(e[1].replace(/^"(.*)"$/,'$1')));e=D.exec(c[2])}a[c[1].toLowerCase()]=(d.length>1?d:d[0]);a._simple=false;c=C.exec(b)}}function checkDate(a){var b=F.exec(a);if(b){return makeDate(b)}b=G.exec(a);if(b){return{start:makeDate(b),end:makeDate(b.slice(7))}}b=E.exec(a);if(b){return makeDate(b.concat([0,0,0,'']))}return a}function makeDate(a){var b=new Date(a[1],a[2]-1,a[3],a[4],a[5],a[6]);b._type=(a[7]?'UTC':'float');return utcDate(b)}function utcDate(a){a.setMinutes(a.getMinutes()-a.getTimezoneOffset());return a}function getWeekOfYear(a,b){b=(b||b==0?b:1);var c=new Date(a.getFullYear(),a.getMonth(),a.getDate(),(a.getTimezoneOffset()/-60));var d=new Date(c.getFullYear(),1-1,4);var e=d.getDay();d.setDate(4+b-e-(b>e?7:0));if(c<d){c.setDate(c.getDate()-3);return getWeekOfYear(c,b)}else if(c>new Date(c.getFullYear(),12-1,28)){var f=new Date(c.getFullYear()+1,1-1,4);e=f.getDay();f.setDate(4+b-e-(b>e?7:0));if(c>=f){return 1}}return Math.floor(((c-d)/(r[w].factor*1000))/7)+1}function isArray(a){return(a&&a.constructor==Array)}})(jQuery);
/* http://keith-wood.name/icalendar.html
   iCalendar processing for jQuery v1.1.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) October 2008.
   Dual licensed under the GPL (http://dev.jquery.com/browser/trunk/jquery/GPL-LICENSE.txt) and 
   MIT (http://dev.jquery.com/browser/trunk/jquery/MIT-LICENSE.txt) licenses. 
   Please attribute the author if you use it. */
eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(L($){8 p=\'Q\';8 q=\'Q-2O-25\';L 1y(){O.1I={26:[],2P:\'Q.3Y\',1J:16,2Q:\'3Z\',1K:1L,2R:1L,2S:\'40 1z 41 27...\',2T:\'\',29:\'\',2a:\'\',1c:14,18:14,1A:\'\',2b:\'\',1M:\'\',1k:\'\',U:\'\',1N:\'\',1d:14,2U:\'2c 1B 42 2V 2W 1z 2X 1s. 43?\',2Y:\'2c 1B 44 45 2W 1z 2X 1s\',2Z:\'46 1z 25 2d 1B 1z 2d 1s\\n\',2e:\'1s.47\',30:\'2c 1s 48 49, 4a 25 2d 1B 31 4b 4c:\\n\'};O.1C={\'32\':{1l:\'4d\',1e:0,1m:14,U:\'33://4e.32.34/27/1B?4f=4g\'+\'&V;4h={t}&V;1n={s}/{e}&V;31={d}&V;1k={l}&V;4i=4j:{u}\'},\'Q\':{1l:\'1y\',1e:1,1m:14,U:\'1D\'},\'4k\':{1l:\'4l\',1e:2,1m:14,U:\'1D\'},\'35\':{1l:\'4m\',1e:3,1m:36,U:\'33://27.35.34/?v=60&V;4n=d&V;1O=20\'+\'&V;1A={t}&V;4o={s}&V;4p={p}&V;4q={d}&V;4r={l}&V;U={u}&V;4s={r}\'}}}8 r=[{1o:\'37\',1i:1},{1o:\'38\',1i:60},{1o:\'39\',1i:2f},{1o:\'Y\',1i:2g},{1o:\'4t\',1i:1},{1o:\'4u\',1i:12},{1o:\'Y\',1i:4v}];8 s=0;8 t=1;8 u=2;8 w=3;8 x=4;8 y=5;8 z=6;$.2h(1y.3a,{1t:\'4w\',4x:L(a){2i(O.1I,a||{});N O},4y:L(a,b,c,d,e){O.1C[a]={1l:b,1e:c,1m:e,U:d};N O},4z:L(){N O.1C},3b:L(a,b){a=$(a);K(a.2j(O.1t)){N}a.4A(O.1t);O.2k(a,b)},4B:L(a,b){a=$(a);K(!a.2j(O.1t)){N}O.2k(a,b)},2k:L(i,j){j=2i($.2h({},O.1I,$.1P(i[0],p)||{}),j);$.1P(i[0],p,j);8 k=j.26||O.1I.26;K(k.X==0){$.1Q(O.1C,L(a){k[k.X]=a})}8 l=L(b,c){8 d={t:1u(j.1A),d:1u(j.1M),s:$.Q.19(j.1c),e:$.Q.19(j.18),p:$.Q.3c(j.1c,j.18),l:1u(j.1k),u:1u(j.U),c:1u(j.1N),r:2l(j.1d)};K(b.1m){b.1m.3d(i,[d,j])}8 e=b.U;$.1Q(d,L(n,v){8 a=1a 4C(\'\\\\{\'+n+\'\\\\}\',\'g\');e=e.1E(a,v)});8 e=(b.U==\'1D\'?\'#\':e);8 f=$(\'<3e></3e>\');8 g=$(\'<a 2m="\'+e+\'" 1A="\'+j.2T+b.1l+\'"\'+(b.U==\'1D\'?\'\':\' 2Q="\'+j.4D+\'"\')+\'></a>\');K(b.U==\'1D\'){g.3f(L(){N $.Q.3g(i[0],c)})}8 h=\'\';K(b.1e!=14){K(2n b.1e==\'4E\'){h+=\'<1R 1S="4F: \'+\'4G U(\'+j.2P+\') 4H-4I -\'+(b.1e*j.1J)+\'2o 4J;\'+($.1f.3h&&$.1f.2p<\'1.9\'?\' 3i-2q: \'+j.1J+\'2o; 3i-3j: \'+1p.4K(0,(j.1J/2)-5)+\'2o;\':\'\')+\'"></1R>\'}R{h+=\'<4L 3k="\'+b.1e+\'"\'+(($.1f.3h&&$.1f.2p<\'1.9\')||($.1f.3l&&$.1f.2p<\'7.0\')?\' 1S="2r-2s: 3j;"\':($.1f.3l?\' 1S="2r-2s: 4M;"\':($.1f.4N||$.1f.4O?\' 1S="2r-2s: 4P;"\':\'\')))+\'/>\'}h+=(j.1K?\'\':\'&#4Q;\')}g.4R(h+(j.1K?\'\':b.1l));f.1T(g);N f};8 m=$(\'<3m 1U="4S\'+(j.1K?\' 4T\':\'\')+\'"></3m>\');8 o=O.1C;$.1Q(k,L(a,b){m.1T(l(o[b],b))});i.3n().1T(m);K(j.2R){m.4U(\'<1R 1U="4V">\'+j.2S+\'</1R>\').4W(\'<1V 1U="3o"></1V>\');i.3f(L(){8 a=$(O);8 b=a.4X();$(\'.3o\',a).3p(\'2q\',b.2q).3p(\'3q\',b.3q+a.4Y()).4Z()})}},50:L(a){a=$(a);K(!a.2j(O.1t)){N}a.51(O.1t).3n();$.52(a[0],p)},3g:L(a,b){8 c=$.1P(a,p);8 d=3r(c);K(c.29){3s.1k.2m=c.29+\'?53=\'+54(d)}R K(c.2a){$(c.2a).55(d)}R K(!c.2e){2t(c.30+d)}R K(56(c.2U)){8 e=\'\';K(e=3t(d,c.2e)){2t(c.2Z+e)}R{2t(c.2Y)}}N 1L},11:L(a){N(a<10?\'0\':\'\')+a},3u:L(a,b){N(!a?\'\':\'\'+a.1v()+O.11(a.2u()+1)+O.11(a.1W()))},19:L(a,b){N(!a?\'\':(b?\'\'+a.1v()+O.11(a.2u()+1)+O.11(a.1W())+\'T\'+O.11(a.57())+O.11(a.2v())+O.11(a.58()):\'\'+a.59()+O.11(a.5a()+1)+O.11(a.5b())+\'T\'+O.11(a.5c())+O.11(a.5d())+O.11(a.5e())+\'Z\'))},3c:L(a,b){K(!a||!b){N\'\'}8 c=1p.5f(b.1j()-a.1j())/3v;8 d=1p.1F(c/2g);c-=d*2g;8 e=1p.1F(c/2f);c-=e*2f;8 f=1p.1F(c/60);c-=f*60;N(a.1j()>b.1j()?\'-\':\'\')+\'P\'+(d>0?d+\'D\':\'\')+(e||f||c?\'T\'+e+\'H\':\'\')+(f||c?f+\'M\':\'\')+(c?c+\'S\':\'\')},5g:L(d,e){K(!e){N d}8 f=1a Y(d.1j());8 g=I.15(e);K(!g){1q\'1X 2w\';}K(g[2]&&(g[3]||g[5]||g[6]||g[7])){1q\'1X 2w - 5h 5i 2V 5j 5k 5l\';}K(!g[4]&&(g[5]||g[6]||g[7])){1q\'1X 2w - 5m 5n 5o\';}8 h=(g[1]==\'-\'?-1:+1);8 i=L(a,b,c){a=2x(a);K(!5p(a)){f[\'5q\'+c](f[\'5r\'+c]()+h*a*b)}};K(g[2]){i(g[2],7,\'Y\')}R{i(g[3],1,\'Y\');i(g[5],1,\'39\');i(g[6],1,\'38\');i(g[7],1,\'37\')}N f},5s:L(a){8 b={};8 c={};8 d=3w(a);2y(d,0,b,c);K(!b.3x){1q\'1X 1y 1P\';}N b.3x},1Y:L(a,b){N 1Y(a,b)},5t:L(a,b){N 2z(a,b)}});L 2i(a,b){$.2h(a,b);1g(8 c 3y b){K(b[c]==14){a[c]=14}}N a}$.5u.Q=L(a){8 b=3z.3a.3A.5v(5w,1);N O.1Q(L(){K(2n a==\'3B\'){$.Q[\'1w\'+a+\'5x\'].3d($.Q,[O].3C(b))}R{$.Q.3b(O,a||{})}})};$.Q=1a 1y();L 36(b,c){8 d=L(a){N(a<10?\'0\':\'\')+a};8 e=(c.18?(c.18.1j()-c.1c.1j())/5y:0);b.p=(e?d(1p.1F(e/60))+\'\'+d(e%60):\'\');K(b.r){8 f=(c.1d.13&&c.1d.13[0].1O==\'5z\'?c.1d.13[0].1G.3D(\'\').1Z():\'\');8 g={3E:\'5A\',5B:\'5C\',5D:\'5E\',5F:\'5G\'}[c.1d.3F];b.r=(f||g?d(c.1d.2A||1)+(f||g):\'\')}}L 3r(c){8 d=L(a){8 b=\'\';21(a.X>2B){b+=a.2C(0,2B)+\'\\n\';a=\' \'+a.2C(2B)}b+=a;N b};N\'22:3G\\n\'+\'5H:2.0\\n\'+\'5I:5J.Q\\n\'+\'5K:5L\\n\'+\'22:3H\\n\'+\'5M:\'+1a Y().1j()+\'@\'+(3s.1k.2m.1E(/^[^\\/]*\\/\\/([^\\/]*)\\/.*$/,\'$1\')||\'5N\')+\'\\n\'+\'5O:\'+$.Q.19(1a Y())+\'\\n\'+(c.U?d(\'5P:\'+c.U)+\'\\n\':\'\')+(c.1N?d(\'5Q:\'+c.1N)+\'\\n\':\'\')+d(\'5R:\'+c.1A)+\'\\n\'+\'5S:\'+$.Q.19(c.1c)+\'\\n\'+\'5T:\'+$.Q.19(c.18)+\'\\n\'+(c.2b?d(\'5U:\'+c.2b)+\'\\n\':\'\')+(c.1M?d(\'5V:\'+c.1M)+\'\\n\':\'\')+(c.1k?d(\'5W:\'+c.1k)+\'\\n\':\'\')+(c.1d?2l(c.1d)+\'\\n\':\'\')+\'23:3H\\n\'+\'23:3G\'}L 2l(a){K(!a){N\'\'}8 b=\'\';K(a.1n){b=\'2D;2E=3I:\';K(!1b(a.1n)){a.1n=[a.1n]}1g(8 i=0;i<a.1n.X;i++){b+=(i>0?\',\':\'\')+$.Q.3u(a.1n[i])}}R K(a.1x){b=\'2D;2E=3I-5X:\';K(!1b(a.1x)){a.1x=[a.1x]}1g(8 i=0;i<a.1x.X;i++){b+=(i>0?\',\':\'\')+$.Q.19(a.1x[i])}}R K(a.1h){b=\'2D;2E=5Y:\';K(!1b(a.1h[0])){a.1h=[a.1h]}1g(8 i=0;i<a.1h.X;i++){b+=(i>0?\',\':\'\')+$.Q.19(a.1h[i][0])+\'/\'+(a.1h[i][1].3J!=Y?a.1h[i][1]:$.Q.19(a.1h[i][1]))}}R{b=\'5Z:61=\'+(a.3F||\'3E\').3K()+(a.2A?\';62=\'+a.2A:\'\')+(a.3L?\';63=\'+$.Q.19(a.3L):(a.3M?\';64=\'+a.3M:\'\'))+(a.3N!=14?\';65=\'+[\'66\',\'67\',\'68\',\'69\',\'6a\',\'6b\',\'6c\'][a.3N]:\'\');K(a.13){K(!1b(a.13)){a.13=[a.13]}1g(8 i=0;i<a.13.X;i++){K(!1b(a.13[i].1G)){a.13[i].1G=[a.13[i].1G]}b+=\';6d\'+a.13[i].1O.3K()+\'=\'+a.13[i].1G.3D(\',\')}}}N b}L 3t(a,b){$(\'#\'+q).6e();6f{$(\'6g\').1T(\'<1V 6h="\'+q+\'"><3O 3k="\'+b+\'" 6i="1s=\'+1u(a)+\'" 6j="0" 6k="0" 1O="6l/x-6m-2O"></3O></1V>\');N\'\'}6n(e){N e}}8 A=/^\\s(.*)$/;8 B=/^([A-2F-2G-9-]+)((?:;[A-2F-2G-9-]+=(?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)*):(.*)$/;8 C=/;([A-2F-2G-9-]+)=((?:"[^"]+"|[^";:,]+)(?:,(?:"[^"]+"|[^";:,]+))*)/g;8 D=/,?("[^"]+"|[^";:,]+)/g;8 E=/^(\\d{4})(\\d\\d)(\\d\\d)$/;8 F=/^(\\d{4})(\\d\\d)(\\d\\d)T(\\d\\d)(\\d\\d)(\\d\\d)(Z?)$/;8 G=/^(\\d{4})(\\d\\d)(\\d\\d)T(\\d\\d)(\\d\\d)(\\d\\d)(Z?)\\/(\\d{4})(\\d\\d)(\\d\\d)T(\\d\\d)(\\d\\d)(\\d\\d)(Z?)$/;8 H=/^([+-])(\\d\\d)(\\d\\d)$/;8 I=/^([+-])?P(\\d+W)?(\\d+D)?(T)?(\\d+H)?(\\d+M)?(\\d+S)?$/;8 J=[\'1U\'];L 3w(b){8 c=b.1E(/\\r\\n/g,\'\\n\').6o(\'\\n\');1g(8 i=c.X-1;i>0;i--){8 d=A.15(c[i]);K(d){c[i-1]+=d[1];c[i]=\'\'}}N $.6p(c,L(a,i){N(a?a:14)})}L 2y(a,b,c,d){K(b>=a.X||a[b].2H(\'22:\')!=0){1q\'2I 3P 1c\';}8 e={};8 f=a[b].2C(6);2J(c,f.1Z(),e);b++;21(b<a.X&&a[b].2H(\'23:\')!=0){K(a[b].2H(\'22:\')==0){b=2y(a,b,e,d)}R{8 g=3Q(a[b]);2J(e,g.3R,(g.2K?g.17:g))}b++}K(f==\'6q\'){8 h=H.15(e.6r.6s);K(h){d[e.1r]=(h[1]==\'-\'?-1:+1)*(2x(h[2],10)*60+2x(h[3],10))}}R{1g(8 i 3y e){2L(e[i],d)}}K(a[b]!=\'23:\'+f){1q\'2I 3P 18 \'+f;}N b}L 2L(c,d){K(!c){N}K(c.1r&&c.17){8 e=d[c.1r];8 f=L(a,b){a.3S(a.2v()-e);a.3T=b};K(1b(c.17)){1g(8 i=0;i<c.17.X;i++){f(c.17[i],c.1r)}}R K(c.17.1c&&c.17.18){f(c.17.1c,c.1r);f(c.17.18,c.1r)}R{f(c.17,c.1r)}}R K(1b(c)){1g(8 i=0;i<c.X;i++){2L(c[i],d)}}}L 2J(a,b,c){K(2n c==\'3B\'){c=c.1E(/\\\\n/g,\'\\n\')}K($.6t(b,J)>-1){b+=\'1w\'}K(a[b]){K(!1b(a[b])||a[\'1w\'+b+\'24\']){a[b]=[a[b]]}a[b][a[b].X]=c;K(a[\'1w\'+b+\'24\']){a[\'1w\'+b+\'24\']=6u}}R{a[b]=c;K(1b(c)){a[\'1w\'+b+\'24\']=3U}}}L 3Q(a){8 b={};8 c=B.15(a);K(!c){1q\'2I 6v 6w: \'+a;}b.3R=c[1].1Z();b.17=2M(c[3]);b.2K=3U;2z(b,c[2]);N b}L 2z(a,b){8 c=C.15(b);21(c){8 d=[];8 e=D.15(c[2]);21(e){d.6x(2M(e[1].1E(/^"(.*)"$/,\'$1\')));e=D.15(c[2])}a[c[1].1Z()]=(d.X>1?d:d[0]);a.2K=1L;c=C.15(b)}}L 2M(a){8 b=F.15(a);K(b){N 1H(b)}b=G.15(a);K(b){N{1c:1H(b),18:1H(b.3A(7))}}b=E.15(a);K(b){N 1H(b.3C([0,0,0,\'\']))}N a}L 1H(a){8 b=1a Y(a[1],a[2]-1,a[3],a[4],a[5],a[6]);b.3T=(a[7]?\'6y\':\'6z\');N 3V(b)}L 3V(a){a.3S(a.2v()-a.3W());N a}L 1Y(a,b){b=(b||b==0?b:1);8 c=1a Y(a.1v(),a.2u(),a.1W(),(a.3W()/-60));8 d=1a Y(c.1v(),1-1,4);8 e=d.3X();d.2N(4+b-e-(b>e?7:0));K(c<d){c.2N(c.1W()-3);N 1Y(c,b)}R K(c>1a Y(c.1v(),12-1,28)){8 f=1a Y(c.1v()+1,1-1,4);e=f.3X();f.2N(4+b-e-(b>e?7:0));K(c>=f){N 1}}N 1p.1F(((c-d)/(r[w].1i*3v))/7)+1}L 1b(a){N(a&&a.3J==3z)}})(6A);',62,409,'||||||||var||||||||||||||||||||||||||||||||||||||if|function||return|this||icalendar|else|||url|amp||length|Date|||_ensureTwo||by|null|exec||_value|end|formatDateTime|new|isArray|start|recurrence|icon|browser|for|periods|factor|getTime|location|display|override|dates|method|Math|throw|tzid|clipboard|markerClassName|encodeURIComponent|getFullYear|_|times|iCalendar|to|title|event|_sites|echo|replace|floor|values|makeDate|_defaults|iconSize|compact|false|description|contact|type|data|each|span|style|append|class|div|getDate|Invalid|getWeekOfYear|toLowerCase||while|BEGIN|END|IsArray|copy|sites|calendar||echoUrl|echoField|summary|The|the|copyFlash|3600|86400|extend|extendRemove|hasClass|_updateICalendar|makeRecurrence|href|typeof|px|version|left|vertical|align|alert|getMonth|getMinutes|duration|parseInt|parseGroup|parseParams|interval|75|substr|RDATE|VALUE|Za|z0|indexOf|Missing|addEntry|_simple|resolveTimezones|checkDate|setDate|flash|icons|target|popup|popupText|tipPrefix|copyConfirm|be|copied|your|copySucceeded|copyFailed|copyUnavailable|details|google|http|com|yahoo|yahooOverride|Seconds|Minutes|Hours|prototype|_attachICalendar|calculateDuration|apply|li|click|_echo|mozilla|padding|bottom|src|msie|ul|empty|icalendar_popup|css|top|makeICalendar|window|copyViaFlash|formatDate|1000|unfoldLines|vcalendar|in|Array|slice|string|concat|join|daily|freq|VCALENDAR|VEVENT|DATE|constructor|toUpperCase|until|count|weekStart|embed|group|parseEntry|_name|setMinutes|_type|true|utcDate|getTimezoneOffset|getDay|png|_blank|Send|my|will|Continue|has|been|Failed|swf|is|unavailable|please|from|below|Google|www|action|TEMPLATE|text|sprop|website|outlook|Outlook|Yahoo|view|st|dur|desc|in_loc|rpat|Month|FullYear|604800|hasICalendar|setDefaults|addSite|getSites|addClass|_changeICalendar|RegExp|_target|number|background|transparent|no|repeat|0px|max|img|middle|opera|safari|baseline|xa0|html|icalendar_list|icalendar_compact|before|icalendar_popup_text|wrap|offset|outerHeight|toggle|_destroyICalendar|removeClass|removeData|content|escape|val|confirm|getHours|getSeconds|getUTCFullYear|getUTCMonth|getUTCDate|getUTCHours|getUTCMinutes|getUTCSeconds|abs|addDuration|week|must|on|its|own|missing|time|marker|isNaN|setUTC|getUTC|parse|_parseParams|fn|call|arguments|ICalendar|60000|day|dy|weekly|wk|monthly|mh|yearly|yr|VERSION|PRODID|jquery|METHOD|PUBLISH|UID|localhost|DTSTAMP|URL|MAILTO|TITLE|DTSTART|DTEND|SUMMARY|DESCRIPTION|LOCATION|TIME|PERIOD|RRULE||FREQ|INTERVAL|UNTIL|COUNT|WKST|SU|MO|TU|WE|TH|FR|SA|BY|remove|try|body|id|FlashVars|width|height|application|shockwave|catch|split|map|VTIMEZONE|standard|tzoffsetto|inArray|undefined|entry|name|push|UTC|float|jQuery'.split('|'),0,{}))
$(document).ready(function() {
   $("#date_start").datepicker(
       {
           dateFormat: 'yy-mm-dd'
       }
   );
   $("#date_end").datepicker(
       {
           dateFormat: 'yy-mm-dd'
       }
   );




});

