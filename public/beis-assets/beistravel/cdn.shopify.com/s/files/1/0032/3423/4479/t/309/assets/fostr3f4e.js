'use strict';

/**
 * Promo countdown.
 *
 */

(function promoCountdown() {
  'use strict';

  var selectors = {
    promoWrapper: '.promo',
    countdownClock: '.promo .countdown-clock',
    countdownStartDay: 'start-day',
    countdownStartTime: 'start-time',
    countdownEndDay: 'end-day',
    countdownEndTime: 'end-time',
    countdownTimezone: 'timezone'
  };

  var $countdownClock = $(selectors.countdownClock);
  var displayCookie = Cookies.get('promo-display');

  if (!$countdownClock.length) {
    return;
  }

  // eslint-disable-next-line require-jsdoc
  function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

  $countdownClock.each(function countdownClockF() {
    var countdownStartDay = $(this).data(selectors.countdownStartDay);
    var countdownStartTime = $(this).data(selectors.countdownStartTime);
    var countdownEndDay = $(this).data(selectors.countdownEndDay);
    var countdownEndTime = $(this).data(selectors.countdownEndTime);
    var countdownTimezone = $(this).data(selectors.countdownTimezone);
    var hours;
    var mins;
    var secs;

    var nextYear = window.moment(
      countdownEndDay + 'T' + countdownEndTime + countdownTimezone
    );
    var startdate = window.moment(
      countdownStartDay + 'T' + countdownStartTime + countdownTimezone
    );
    var enddate = window.moment(
      countdownEndDay + 'T' + countdownEndTime + countdownTimezone
    );

    if (new Date() >= new Date(startdate) && new Date() <= new Date(enddate)) {
      $(this)
        .closest(selectors.promoWrapper)
        .show();
      $(this).countdown(nextYear.toDate(), function buildCountdown(event) {
        hours = event.offset.totalDays * 24 + event.offset.hours;
        hours = pad(hours, 2);
        mins = event.strftime('%M');
        secs = event.strftime('%S');

        $(this)
          .find('.hours strong')
          .html(hours);
        $(this)
          .find('.mins strong')
          .html(mins);
        $(this)
          .find('.secs strong')
          .html(secs);

        if (hours === '00' && mins === '00' && secs === '00') {
          $(this)
            .closest(selectors.promoWrapper)
            .hide();
        }
      });
    }
  });

  $('.promo .promo__close').on('click', function handleMinusClick() {
    $('.promo').addClass('promo--minified');
    Cookies.set('promo-display', 'min-view');
  });

  $('.promo .promo__open').on('click', function handlePlusClick() {
    $('.promo').removeClass('promo--minified');
    Cookies.set('promo-display', 'max-view');
  });

  if (displayCookie === 'min-view') {
    $('.promo').addClass('promo--minified');
  } else if (displayCookie === 'max-view') {
    $('.promo').removeClass('promo--minified');
  }
})();

(function fireAppJSFns() {

  $(document).on("cart.requestStarted", function(event, cart, $target) {
    if (window && window.setCart) {
      window.setCart(cart, $target);
    }
  });

  $(document).on("cart.requestComplete", function(event, cart) {
    if (window && window.checkCart) {
      window.checkCart(cart);
    }
  });

})();

(function cartCount() {
  function handleRequestComplete(event, cart) {
    // update cart counts
    $('#CartCount').html(cart.item_count);
  }
  $(document).on('cart.requestComplete', handleRequestComplete);
})();

(function bundleSelectors() {

  /**
   * Handles selecting bundle options, updating central ATC.
   *
   */

  var selectors = {
    row: '[data-bundle-row]',
    color: '[data-bundle-color]',
    atc: '[data-bundle-atc]',
    atcIdAttr: 'data-quick-add-to-cart',
    set: '[data-bundle-set]',
    setCounts: '[data-bundle-set-count]',
    setInfo: '[data-bundle-set-info]',
    item: '[data-bundle-item]',
    itemSelector: '[data-bundle-item-selector]',
    activeClass: 'is-active',
    priceFull: '[data-bundle-price-full]',
    priceDiscounted: '[data-bundle-price-discounted]',
    colorPicker: '[data-bundle-color-picker]',
    colorPickerLabel: '[data-bundle-color-picker-label]'
  };

  function updateBundleSelection() {
    const $activeRows = $(selectors.row).filter(`.${selectors.activeClass}`);
    const $activeColors = $activeRows.find(selectors.color).filter(`.${selectors.activeClass}`);
    const setSize = $activeRows.length;
    const $setCounts = $(selectors.setCounts);
    const $atc = $(selectors.atc);
    const $priceFull = $(selectors.priceFull);
    const $priceDiscounted = $(selectors.priceDiscounted);
    const discountRange = {
      any2: 10,
      any3: 15
    };
    const discount = (setSize > 2) ? discountRange.any3 : discountRange.any2;
    let varIds = [];
    let priceFull = 0;
    let priceDiscounted = 0;
    $activeColors.each(function() {
      const $activeItem = $(this).find(selectors.item).filter(`.${selectors.activeClass}`);
      let itemData = $activeItem.data('bundle-item');
      priceFull += parseInt(itemData.price, 10);
      if (itemData && itemData.available) {
        varIds.push(itemData.id);
      }
    });
    priceDiscounted = Shopify.formatMoney(
      Math.round(priceFull * (1 - (discount / 100)))
    );
    priceFull = Shopify.formatMoney(priceFull);

    console.log('Bundle IDs:', varIds);
    console.log('Bundle prices:', priceFull, priceDiscounted);
    console.log('Set size/discount:', setSize, discount);

    $priceDiscounted.html(priceDiscounted);
    $priceFull.html(priceFull);
    $setCounts.html(setSize);

    if (varIds.length === setSize) {
      varIds = varIds.join(',');
      $atc
        .prop('disabled', false)
        .text('Add Set to Bag')
        .attr(selectors.atcIdAttr, varIds);
    } else {
      $atc
        .prop('disabled', true)
        .text('Sold Out');
    }
  }

  function refireSlick() {
    // re-position sliders following potential layout changes
    var $sliders = $('.slick-initialized.slick-slider');
    if ($sliders.length && $sliders.slick) {
      $sliders.slick('setPosition');
    }
  }

  function goToActiveSlide($slider) {
    const activeSlide = $slider.find(selectors.item).filter('.is-active').first().index();
    console.log('activeSlide', activeSlide, $slider);
    $slider.slick('slickGoTo', activeSlide);
  }

  function handleSelectorClick(e) {
    e.preventDefault();

    const $item = $(this).closest(selectors.item);
    const $row = $(this).closest(selectors.row);
    const $rowColors = $row.find(selectors.color);
    const activeIndex = $item.index();

    $row.find(selectors.item).removeClass('is-active');
    $rowColors.each(function() {
      if ($(this).find(selectors.item).eq($item.index()).length) {
        $(this)
        .find(selectors.item)
        .eq($item.index())
        .addClass('is-active');
      } else {
        $(this)
        .find(selectors.item)
        .eq($item.index() - 1)
        .addClass('is-active');
      }
    });
    updateBundleSelection();
    refireSlick();

    const $slider = $(this).closest(selectors.color);

    if (
      $(window).outerWidth() < 768 &&
      $slider.get(0).slick.currentSlide !== $item.index()
    ) {
      goToActiveSlide($slider);
    }
  }

  function handleSetClick(e) {
    e.preventDefault();
    const setSize = parseInt($(this).attr('data-bundle-set'), 10);
    const $rows = $(selectors.row)
      .removeClass(selectors.activeClass)
      .prop('hidden', true)
      .slice(0, setSize)
      .addClass(selectors.activeClass)
      .prop('hidden', false);
    $(selectors.set).removeClass(selectors.activeClass);
    $(this).addClass(selectors.activeClass);

    updateBundleSelection();
    refireSlick();
    console.log('Changed set to', setSize);

    $(selectors.setInfo).prop('hidden', true).filter('[data-bundle-set-info="' + setSize + '"]').prop('hidden', false);
  }

  function handleColorPickerClick(e) {
    e.preventDefault();
    const $row = $(this).closest(selectors.row);
    const $colors = $row.find(selectors.color);
    const activeColor = this.value;

    $colors
      .prop('hidden', true)
      .removeClass(selectors.activeClass)
      .filter(`[data-bundle-color="${ activeColor }"]`)
      .prop('hidden', false)
      .addClass(selectors.activeClass);

    const $pickerRow = $(this).closest('.bundle-colour-picker-container');
    const $pickerLabel = $pickerRow.find(selectors.colorPickerLabel);
    const $buttons = $pickerRow.find('button');
    $pickerLabel.html(activeColor);
    $buttons.removeClass('is-active');
    $(this).addClass('is-active');
    refireSlick();
    updateBundleSelection();
  }

  function init() {
    $('body').on('click', selectors.itemSelector, handleSelectorClick);
    $('body').on('click', selectors.set, handleSetClick);
    $('body').on('click', selectors.colorPicker, handleColorPickerClick);
    initCarousel();

    if ($('#shopify-section-product-bundle').length) {
      if (window && window.setUpAddToCartFunctions) {
        window.setUpAddToCartFunctions();
      }
    }
  }

  window.rfdUpdateBundleSelection = updateBundleSelection;

  function initCarousel() {

    $('.bundle-carousel').on('afterChange', function(event, slick, currentSlide) {
      slick.$slides.removeClass('is-active');
      const $currentSlide = slick.$slides.eq(currentSlide);
      if ($currentSlide.find('[data-bundle-item-selector]').not(':disabled')) {
        $currentSlide.addClass('is-active');
      }

      const $thisColor = $(this).closest(selectors.color);

      if (!$thisColor.hasClass('is-active')) {
        return;
      }

      updateBundleSelection();

      const $row = $(this).closest(selectors.row);
      const $otherColors = $row.find(selectors.color).not($thisColor);

      $otherColors.each(function() {
        $(this)
          .find(selectors.item)
          .removeClass('is-active')
          .eq(currentSlide)
          .addClass('is-active');

        $(this)
          .filter('.slick-initialized')
          .slick('slickGoTo', currentSlide);
      });
    });
    $('.bundle-carousel').on('init', function() {
      // console.log('this', this);
      // if ($(window).outerWidth() < 768) {
      //   $(this).find('.slick-slide').removeClass('is-active');
      //   $(this).find('.slick-current').addClass('is-active');
      // }
    });
    $('.bundle-carousel').each(function() {
      const activeSlide = $(this).find(selectors.item).filter('.is-active').index();
      $(this).slick({
        infinite: false,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false,
        touchThreshold: 1000, // Default: 5
        speed: 200, // Default: 300,
        responsive: [
          {
            breakpoint: 767,
            settings: {
              initialSlide: activeSlide,
              slidesToShow: 1,
              slidesToScroll: 1,
              centerMode: true
            }
          }
        ]
      });
    });
  }

  init();
})();

(function cartAddFunction() {
  /**
   * Handles adding to cart via AJAX (product forms + "Quick Add" buttons)
   *
   * @requires vendor/_cart.min.js
   */

  var selectors = {
    quickAddBtns: '[data-quick-add-to-cart]',
    quickAddVariantIdAttr: 'data-quick-add-to-cart',
    quickAddHolder: '[data-quick-add-holder]',
    quickAddPropsAttr: 'data-custom-properties'
  };

  /**
   * Takes product variant data and adds it/them to Shopify's cart via AJAX.
   * Multiple variants are added in sequence, in order they appear in array.
   *
   * @private
   * @param {Object|Object[]} data - CartJS data, or an array of CartJS data
   * @param {Number} data.variantId - Variant ID of product
   * @param {Number} data.quantity - Quantity of product
   * @param {Object} [data.customProperties] - Custom properties for cart line item
   * @param {Function} [callback] - Custom callback following completion
   */
  function ajaxAddToCart(data, callback) {
    Shopify.queue = [];

    // Vet data & add to queue
    if (data.variantId && data.quantity) {
      Shopify.queue.push(data);
    } else if (data.length) {
      data.forEach(function vetDataLoop(d) {
        if (d.variantId && d.quantity) {
          Shopify.queue.push(d);
        } else {
          console.error('[cart-add] invalid data', d);
        }
      });
    } else {
      console.error('[cart-add] invalid data', data);
      return;
    }

    // Process the queue
    Shopify.moveAlong = function processQueue() {
      var request;

      if (Shopify.queue.length) {
        request = Shopify.queue.shift();
        request.customProperties = request.customProperties || {};

        console.log('[cart-add] adding', request);

        // Make AJAX submission
        CartJS.addItem(
          request.variantId,
          request.quantity,
          request.customProperties,
          {
            success: function cartAddAjaxSuccess(data) {
              Shopify.moveAlong();
            },
            error: onRemoveError
          }
        );
      } else {
        console.timeEnd('[cart-add]');

        if (window.rfd && window.rfd.cartStateUpdate) {
          window.rfd.cartStateUpdate();
        }

        if (callback) {
          callback();
        } else {
          if (window && window.updateUpsellContent) {
            window.updateUpsellContent();
          }
          if (window && window.toggleMiniCart) {
            return setTimeout((function() {
              return $("body").hasClass("cart-shown") ? 1 : window.toggleMiniCart();
            }), 300);
          }
        }
      }
    };

    console.time('[cart-add]');
    Shopify.moveAlong();
  }

  function onRemoveError(jqXHR, textStatus, errorThrown) {
    console.timeEnd('[cart-add]');
    console.error(jqXHR, textStatus, errorThrown);

    if (window.rfd && window.rfd.enableBtns) {
      window.rfd.enableBtns();
    }

    if (
      window.rfd &&
      window.rfd.alert &&
      jqXHR.responseJSON &&
      jqXHR.responseJSON.message &&
      jqXHR.responseJSON.description
    ) {
      window.rfd.alert(
        jqXHR.responseJSON.message,
        jqXHR.responseJSON.description
      );
      $.magnificPopup.instance.close(); // Close popup that is currently opened
      if (window && window.toggleMiniCart) {
        return setTimeout((function() {
          return $("body").hasClass("cart-shown") ? 1 : window.toggleMiniCart();
        }), 300);
      }
    }
  }

  function getRandomStr(length) {
    var c;
    for (c = ''; c.length < length; ) {
      c += Math.random()
        .toString(36)
        .substr(2, 1);
    }
    return c;
  }

  /**
   * Adds product(s) to cart via AJAX when "Quick Add" button clicked.
   */
  function handleQuickAddBtnClick(e) {
    var variantIds = $(this).attr(selectors.quickAddVariantIdAttr);
    var variantIdsArr = variantIds.split(',');
    var variantsData = [];
    var lineItemProps = $(this).attr(selectors.quickAddPropsAttr);
    var quantEl = $(this).closest(selectors.quickAddHolder).find('[name="quantity"]');
    var quant = 1;

    if (quantEl.length) {
      quant = quantEl.first().val();
    }

    if (lineItemProps) {
      lineItemProps = lineItemProps.replace(/\[guid\]/gi, getRandomStr(32));
      try {
        lineItemProps = JSON.parse(lineItemProps);
      } catch (err) {
        console.error('[card-add] invalid JSON supplied for line item properties', err);
      }
    }

    e.preventDefault();

    if (!variantIds) {
      console.error('[cart-add] no variant IDs on add button');
      return;
    }

    variantIdsArr.forEach(function cartAddVariantLoop(id) {
      variantsData.push({
        quantity: quant,
        variantId: parseInt(id, 10),
        customProperties: (lineItemProps) ? lineItemProps : {}
      });
    });

    if (window.rfd && window.rfd.disableBtns) {
      window.rfd.disableBtns(this);
    }

    ajaxAddToCart(variantsData);
  }

  function init() {
    $('body').on('click', selectors.quickAddBtns, handleQuickAddBtnClick);
  }

  init();
})();

(function modCarousel() {

  var selectors = {
    carousel: '[data-products-carousel]',
    nextBtn: '[data-products-carousel-next]',
    prevBtn: '[data-products-carousel-prev]'
  };

  var opts = {
    slidesToShow: 3,
    infinite: true,
    touchThreshold: 1000, // Default: 5
    speed: 300, // Default: 300
    arrows: true,
    centerMode: true,
    centerPadding: '12%',
    responsive: [
      {
        breakpoint: 799,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: '26%'
        }
      }
    ]
  };

  function initPrevNext(event, slick) {
    var $carousel = $(this);
    var $next = $carousel.siblings(selectors.nextBtn);
    var $prev = $carousel.siblings(selectors.prevBtn);
    console.log('initPrevNext', $carousel, $next, $prev);

    $next.click(function(e) {
      // console.log($carousel);
      e.preventDefault();
      $carousel.slick('slickNext');
      console.log('slickNext');
      $prev.removeClass('temp-disabled');
    });

    $prev.click(function(e) {
      // console.log($carousel);
      e.preventDefault();
      $carousel.slick('slickPrev');
      console.log('slickPrev');
    });
  }

  $(function() {
    $(selectors.carousel).on('init', initPrevNext);
    $(selectors.carousel).slick(opts);
  });

})();

(function modWaypoints() {

  var selectors = {
    zooms: '.image-zoom',
    zoomClass: 'is-zoomed'
  };

  function init() {
    var $zooms = $(selectors.zooms);

    if (!Waypoint) {
      console.log('Waypoint not available.');
      return;
    }

    $zooms.each(function() {
      var img = this;
      var waypoint = new Waypoint({
        element: img,
        handler: function(direction) {
          console.log(direction, this);
          $(img).removeClass(selectors.zoomClass);
        },
        offset: '100%'
      });
    })
  }

  $(init);
})();

/**
 * Toggles <video> src conditionally based on data attributes to
 * prevent wasted bandwidth when hidden.
 *
 * @requires vendor/lodash.throttle.js
 */

(function modVideoRespSrc() {
  var THROTTLE_WAIT_MS = 250;

  var selectors = {
    small: '[data-small--src]',
    mediumUp: '[data-medium-up--src]'
  };

  var small = 'only screen and (max-width: 767px)';
  var mediumUp = 'only screen and (min-width: 768px)';

  function checkSrcs() {
    var $mediumUp;
    var $small;

    if (window.matchMedia(mediumUp).matches) {
      $mediumUp = $(selectors.mediumUp);
      $mediumUp.each(function eachMediumUp() {
        var src = $(this).attr('data-medium-up--src');
        var $video = $(this).closest('video');

        if (!$video.length || !src) {
          return;
        }
        $(this)
          .attr('src', src)
          .removeAttr('data-medium-up--src');

        $video[0].load();
        // eslint-disable-next-line no-console
        console.log('[video-responsive-src] loaded video src');
      });
    }
    if (window.matchMedia(small).matches) {
      $small = $(selectors.small);
      $small.each(function eachSmall() {
        var src = $(this).attr('data-small--src');
        var $video = $(this).closest('video');

        if (!$video.length || !src) {
          return;
        }
        $(this)
          .attr('src', src)
          .removeAttr('data-small--src');

        $video[0].load();
        // eslint-disable-next-line no-console
        console.log('[video-responsive-src] loaded video src');
      });
    }
  }

  function init() {
    checkSrcs();
    $(window).on('resize', window.throttle(checkSrcs, THROTTLE_WAIT_MS));
  }

  $(init);
})();

/** Styling for DashHudson spirit galleries */
window.addEventListener('load', function () {
  const spiritGallery = document.getElementsByClassName('dashhudson-spirit-gallery')[0];
  if (spiritGallery === null) {
    return;
  }

  const overlays = spiritGallery.getElementsByClassName('overlay');
  // Check if any overlays exist as they can be disabled via Dash Hudson
  if (overlays === null)  {
    return;
  }

  for (let overlay of overlays) {
    overlay.innerHTML = '<button class="button">Buy Now</button>';
  }
});

/**
* Diaper Bag Page
*
*/

(function diaperBag() {
  var selectors = {
    bodyClass: '.page-diaper-bag-landing'
  };

  function init360Swatches() {
    const $swatches = $('.diaper-360-promo__swatch');
    $swatches.on('click', function(e) {
      e.preventDefault();
      const prodId = $(this).attr('data-product-id');
      const $panels = $('.diaper-360-promo [data-360-panel]');
      const colorLabel = $(this).attr('data-product-color');
      const $swatchColorLabel = $(this).closest('.diaper-360-promo__swatches').find('[data-swatch-color-label]');
      $swatchColorLabel.text(colorLabel);
      $swatches.removeClass('is-active');
      $(this).addClass('is-active');
      $panels
        .attr('hidden', 'true')
        .filter(`[data-product-id="${prodId}"]`)
        .removeAttr('hidden');
      // console.log(prodId, $panels.find(`[data-product-id="${prodId}"]`));
    });
  }
  function initCollectionSwatches() {
    const $swatches = $('.bundle__collection-swatch');
    $swatches.on('click', function(e) {
      e.preventDefault();
      const collectionId = $(this).attr('data-collection-id');

      const colorLabel = $(this).attr('value');
      const $swatchColorLabel = $(this).closest('.diaper-bundle__swatches').find('[data-bundle-swatch-color-label]');
      $swatchColorLabel.text(colorLabel);
      $swatches.removeClass('is-active');
      $(this).addClass('is-active');

      if(colorLabel === 'Beige') {
        $('.bundle__button-2').hide();
        $('.bundle__button-1').show();
      } else {
        $('.bundle__button-1').hide();
        $('.bundle__button-2').show();
      }
    });
  }
  function init3ProductSwatches() {
    const $swatches = $('.beis-baby__product-swatch');
    $swatches.on('click', function(e) {
      e.preventDefault();
      const prodId = $(this).attr('data-product-id');
      const prodTitle = $(this).attr('data-product-title');
      const $images = $('.beis-baby__product-image [data-product-img]');
      const $atcs = $('.beis-baby__product-add-form [data-prod-add]');
      const colorLabel = $(this).attr('data-product-color');
      const $swatchColorLabel = $(this).closest('.beis-baby__product-swatches').find('[data-swatch-color-label]');
      const $titleLabel = $(this).closest('.plp-item__inner').find('.beis-baby__product-title a');
      $swatchColorLabel.text(colorLabel);
      $titleLabel.text(prodTitle);
      $swatches.removeClass('is-active');
      $(this).addClass('is-active');
      $images
        .attr('hidden', 'true')
        .filter(`[data-product-id="${prodId}"]`)
        .removeAttr('hidden');
      $atcs
        .attr('hidden', 'true')
        .filter(`[data-product-id="${prodId}"]`)
        .removeAttr('hidden');
      // console.log(prodId, $panels.find(`[data-product-id="${prodId}"]`));
    });
  }

  function init360Images() {
    const threesixtyEls = document.querySelectorAll('.diaper-360-promo__360 .diaper-360-spin');

    const threesixtyElInstances = [];

    threesixtyEls.forEach(function(threesixtyEl) {
      const imgSrc = threesixtyEl.getAttribute('data-image-src');
      const imgCount = threesixtyEl.getAttribute('data-count');
      const imgPerRow = threesixtyEl.getAttribute('data-per-row');
      let widths = threesixtyEl.getAttribute('data-widths');

      widths = widths.split(',').map(function(x) { return parseInt(x, 10) });

      // select the largest width/height for the 360 spinner that fits comfortably
      // inside the window
      let widthHeight = 320;
      let paddingBuffer = 20;

      for (const x of widths) {
        if (x < (window.innerWidth - paddingBuffer)) {
          widthHeight = x;
        }
      }

      var threesixty = new ThreeSixty(threesixtyEl, {
        image: imgSrc,
        width: widthHeight,
        height: widthHeight,
        count: parseInt(imgCount, 10),
        perRow: parseInt(imgPerRow, 10),
        speed: 100,
        keys: true
      });
      threesixtyElInstances.push(threesixty);
    });
  }

  function init() {
    if (!$(selectors.bodyClass).length) {
      return;
    }

    if (window && window.setUpAddToCartFunctions) {
      window.setUpAddToCartFunctions();
    }

    init360Swatches();
    init360Images();
    initCollectionSwatches();
    init3ProductSwatches();
  }

  $(init);
}());

/**
 * Utility functions to toggle a "no-scroll" state where body can't be scrolled.
 * Useful to when opening modals/minicarts, or to "contain" scrolling inside
 * them on iOS.
 *
 * @exports window.rfd.noscroll.contain()
 * @exports window.rfd.noscroll.apply()
 * @exports window.rfd.noscroll.remove()
 */

(function noScrollFunction() {
  'use strict';

  var selectors = {
    main: 'body',
    contain: '[data-scroll-contain]'
  };

  var NO_SCROLL_CLASS = 'no-scroll';
  var scrollPosition = 0;

  var stickySelector = '.sticky-container';
  var stickyFixedClass = 'is-fixed';
  var stickyMq = 'only screen and (min-width: 990px)';

  /**
   * Switches elements with position: stick to fixed position while
   * body.no-scroll is active. Fixes issue in Firefox where sticky position
   * is document relative (not viewport relative) with body "position: fixed"
   */
  function toggleStickyPositions(toggle) {
    // only run in Firefox (causes issues in browser e.g. Safari that don't need it)
    if (navigator.userAgent.search(/Firefox/) === -1) {
      return;
    }

    var $stickies = $(stickySelector);

    // ignore when has inline position (Stickyfill active, no fix needed)
    if (!$stickies.length || $stickies.get(0).style.position !== '') {
      return;
    }

    if (!toggle) {
      $stickies.each(function noScrollResetStickies() {
        $(this)
          .removeClass(stickyFixedClass)
          .css({
            position: '',
            left: '',
            right: '',
            top: '',
            width: ''
          });
      });

      return;
    }

    if (!window.matchMedia(stickyMq).matches) {
      return;
    }

    $stickies.each(function noScrollAddStickies() {
      var offset = $(this).offset();
      var offsetMain = $('#MainContent').offset();
      var offsetTopViewport = offset.top - offsetMain.top;
      var offsetLeftViewport = offset.left;
      var width = $(this).outerWidth(true);
      var offsetRight = $(window).outerWidth() - offset.left - $(this).outerWidth();

      $(this)
        .addClass(stickyFixedClass)
        .css({
          left: 'auto',
          right: offsetRight,
          top: offsetTopViewport,
          width: width
        });
    });
  }

  /**
   * Disables scrolling on the body element
   */
  function apply() {
    console.log('noscroll apply');

    toggleStickyPositions(true);

    scrollPosition = window.pageYOffset;
    $('body').addClass(NO_SCROLL_CLASS);
    $(selectors.main).css({
      top: -scrollPosition + 'px',
      position: 'relative'
    });
  }

  /**
   * Restores scrolling on the body element
   */
  function remove() {
    console.log('noscroll remove');

    toggleStickyPositions(false);

    $('body').removeClass(NO_SCROLL_CLASS);
    $(selectors.main).css({
      top: '',
      position: ''
    });
    window.scrollTo(0, scrollPosition);
  }

  /**
   * Contains scrolling within the given element. This is useful on iOS
   * to prevent the body scrolling behind an element with its own
   * overflow scrolling.
   *
   * @param {node} overlayEl - DOM node to contain scrolling within
   */
  function contain(overlayEl) {
    var yPosition = null; // remember Y position on touch start

    overlayEl.addEventListener(
      'touchstart',
      function noScrollDetectTouch(event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          yPosition = event.targetTouches[0].clientY;
        }
      },
      false
    );

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollHeight#Problems_and_solutions
     */
    function isOverlayTotallyScrolled() {
      return (
        overlayEl.scrollHeight - overlayEl.scrollTop <= overlayEl.clientHeight
      );
    }

    function disableRubberBand(event) {
      var clientY = event.targetTouches[0].clientY - yPosition;

      if (overlayEl.scrollTop === 0 && clientY > 0) {
        // element is at the top of its scroll
        event.preventDefault();
      }

      if (isOverlayTotallyScrolled() && clientY < 0) {
        // element is at the top of its scroll
        event.preventDefault();
      }
    }

    overlayEl.addEventListener(
      'touchmove',
      function noScrollDisableRubberBand(event) {
        if (event.targetTouches.length === 1) {
          // detect single touch
          disableRubberBand(event);
        }
      },
      false
    );
  }

  function containScrollers() {
    $(selectors.contain).each(function containScrollersLoop() {
      contain(this);
    });
  }

  function init() {
    containScrollers();
  }

  init();

  window.rfd = window.rfd || {};
  window.rfd.noscroll = {};
  window.rfd.noscroll.apply = apply;
  window.rfd.noscroll.remove = remove;
  window.rfd.noscroll.contain = contain;
})();
/**
 * Module for accordion menu.
 *
 */

(function menuAccordionFunction() {
  var selectors = {
    menu: '.menu-accordion',
    item: '.menu-accordion__item',
    submenu: '.menu-accordion__submenu',
    links: '.menu-accordion__item.has-submenu > .menu-accordion__link'
  };

  var ANIM_LENGTH_MS = 200;

  function handleLinkClick(e) {
    e.preventDefault();

    var $accordion = $(this).closest(selectors.menu);
    var $item = $(this).closest(selectors.item);
    var $submenu = $(this).siblings(selectors.submenu);
    var isOpen = $item.hasClass('is-open');

    if (isOpen) {
      // close clicked accordion items
      $submenu.slideUp(ANIM_LENGTH_MS);
      $item.removeClass('is-open');
    } else {
      // close open accordion items
      $accordion
        .find(selectors.item)
        .filter('.is-open')
        .removeClass('is-open')
        .find(selectors.submenu)
        .slideUp(ANIM_LENGTH_MS);
      // open clicked accordion item
      $submenu.slideDown(ANIM_LENGTH_MS);
      $item.addClass('is-open');
    }
  }

  function initAccordion() {
    $(this)
      .find(selectors.links)
      .on('click', handleLinkClick);
  }

  function _init() {
    var $menus = $(selectors.menu);
    var locationHash = window.location.hash;

    $menus.each(initAccordion);

    if (locationHash) {
      $('html,body').animate(
        {
          scrollTop:
            $(locationHash).offset().top - $('.site-header').outerHeight()
        },
        1000
      );
      $(locationHash)
        .addClass('is-open')
        .children(selectors.submenu)
        .slideDown(ANIM_LENGTH_MS);
    }
  }

  _init();
})();

/**
* Generic module for variant selector buttons that update main ATC control
*
*/

(function mod() {

  const selectors = {
  };

  const attrs = {
    module: 'data-variant-selectors',
    radio: 'data-variant-selectors-radio',
    radioPrice: 'data-variant-selectors-price',
    radioDiscount: 'data-variant-selectors-discount',
    atc: 'data-variant-selectors-atc',
    atcVarIds: 'data-quick-add-to-cart',
    atcMultiText: 'atc-quick-add-multi-text',
    atcUnavailableText: 'atc-quick-add-unavailable-text',
    priceSingle: 'data-bundle-price-single',
    priceBundle: 'data-bundle-price-bundled',
    priceBundleDiscounted: 'data-bundle-price-discounted',
    priceBundleFull: 'data-bundle-price-full'
  };

  const classNames = {
    active: 'is-active'
  };

  // add selector entries for all attributes
  Object.keys(attrs).forEach(function(key) {
    selectors[key] = `[${attrs[key]}]`;
  });

  // add selector entries for all class names
  Object.keys(classNames).forEach(function(key) {
    selectors[key] = `.${classNames[key]}`;
  });

  function initModule(index, module) {
    const $module = $(module);
    const $atc = $module.find(selectors.atc);
    const $radios = $module.find(selectors.radio);
    const initialVarIds = $atc.attr(attrs.atcVarIds);
    const $priceSingle = $module.find(selectors.priceSingle);
    const $priceBundle = $module.find(selectors.priceBundle);
    const $priceBundleDiscounted = $module.find(selectors.priceBundleDiscounted);
    const $priceBundleFull = $module.find(selectors.priceBundleFull);
    const atcInitialVal = $atc.html();
    const atcInitialDisabled = $atc.prop('disabled');
    const atcMultiText = $atc.attr(attrs.atcMultiText);
    const atcUnavailableText = $atc.attr(attrs.atcUnavailableText);

    $radios.on('click', function(e) {
      e.preventDefault();

      const varIds = $(this).attr(attrs.radio);
      const priceFull = parseInt($(this).attr(attrs.radioPrice), 10);
      const priceDiscountPercent = parseInt($(this).attr(attrs.radioDiscount), 10);
      const priceDiscounted = Math.round(priceFull * (1 - (priceDiscountPercent / 100)));
      const singlePriceEl = document.getElementById('ProductPrice');
      const singlePriceAmount = singlePriceEl.getAttribute('content') * 100;

      if ($(this).hasClass(classNames.active)) {
        $(this).removeClass(classNames.active);
        $(this).parent().removeClass(classNames.active);
        $atc
          .attr(attrs.atcVarIds, initialVarIds)
          .prop('disabled', atcInitialDisabled)
          .html(atcInitialVal);
        $priceSingle.show();
        $priceBundle.hide();


        let apConfigBundle = {
          priceSelector: '#ProductPrice',
          locale: 'en_US',
          currency: 'USD',
          afterpayLogoColor: 'black',
          showUpperLimit: false,
          amount: singlePriceAmount,
          minMaxThreshold: {
            min: 3500,
            max: 100000,
          },
        };
        document.querySelectorAll('.afterpay-paragraph').forEach(e => e.remove());
        console.log('initialising afterpay single');
        new presentAfterpay(apConfigBundle).init();
        console.log('afterpay initialised for single:', apConfig.priceSelector);

      } else {
        var fullPrice = Shopify.formatMoney(priceFull);
        var bundleDiscountedPrice = Shopify.formatMoney(priceDiscounted);

        $radios.removeClass(classNames.active);
        $radios.parent().removeClass(classNames.active);
        $(this).addClass(classNames.active);
        $(this).parent().addClass(classNames.active);
        $priceSingle.hide();
        // $priceBundle.show();
        // $priceBundleFull.text(Shopify.formatMoney(priceFull));
        // $priceBundleDiscounted.text(Shopify.formatMoney(priceDiscounted));

        let afterpayPrice = priceDiscounted;
        let apConfigBundle = {
          priceSelector: '#ProductPriceBundle',
          locale: 'en_US',
          currency: 'USD',
          afterpayLogoColor: 'black',
          showUpperLimit: false,
          amount: afterpayPrice,
          minMaxThreshold: {
            min: 3500,
            max: 100000,
          },
        };

        document.querySelectorAll('.afterpay-paragraph').forEach(e => e.remove());
        console.log(priceDiscounted);
        console.log('initialising afterpay bundle');
        new presentAfterpay(apConfigBundle).init();
        console.log('afterpay initialised for bundle:', apConfig.priceSelector);


        if (varIds.length) {
          $atc
            .attr(attrs.atcVarIds, varIds)
            .html(atcMultiText + ` - <span style="text-decoration: line-through;">${fullPrice}</span> ${bundleDiscountedPrice}`)
            .prop('disabled', false);
        } else { // empty string for variant IDs means "Sold Out"
          $atc
            .attr(attrs.atcVarIds, varIds)
            .text(atcUnavailableText)
            .prop('disabled', true);
        }
      }
    });
  }

  function init() {
    $(selectors.module).each(initModule);
  }

  init();
}());

$(document).ready(function() {
  $('[data-tabs]').each(function() {
    const $links = $(this).find('[data-tab-link]');
    const $tabs = $(this).find('[data-tab-pane]');
    $links.on('click', function(e) {
      e.preventDefault();
      var tab_id = $(this).attr('href');
      $links.removeClass('is-active').attr('aria-expanded', false);
      $(this).addClass('is-active').attr('aria-expanded', true);
      $tabs.prop('hidden', true).filter(tab_id).prop('hidden', false);
    });
  });
});

/**
 * Collection filters
 *
 */

(function modFilters() {
  $('body').on('click', '.js-filters-toggle', function(e) {
    e.preventDefault(), $(this).parents('.filters').toggleClass('active'), $(window).width() < 992 && $('html').toggleClass('locked')
  });

  $('body').on('click', '.js-filters-heading', function() {
    $(this).parent().toggleClass('open');
  });

  $('.filters__list').each(function() {
    var $this = $(this);

    if ($this.children().length == 0) {
      $this.closest('.filters__block').remove();
    }
  });

  $('.filters__column').each(function() {
    var $this = $(this);

    if ($this.find('li').length == 0) {
      $this.remove();
    }
  });

  $('body').on('submit', '.js-filters-form', function(e) {
    e.preventDefault();
    var t, a, n = $(this),
      o = window.location.origin,
      r = new RegExp("[?&]sort_by=([^&#]*)").exec(window.location.href),
      s = window.location.pathname.split("/"),
      l = window.location.href,
      d = [],
      u = "",
      i;
    for (t = s.indexOf("collections") + 1, a = s[t], n.find('input[name^="tag"]').each(function() {
        var e = $(this);
        e.is(":checked") && d.push(e.val())
      }), i = 0; i < d.length; i++) u = i > 0 ? u + "+" + d[i] : d[i];
    l = "" !== u ? o + "/collections/" + a + "/" + u : o + "/collections/" + a, r && (l += r = r[0]), window.location.href = l
  });
})();

/**
 * Collection sorting
 *
 */

(function modSorting() {
  $('.js-sort-list').on('change', function() {
    var url = $(this).val();
    if (url) {
      window.location = url;
    }
    return false;
  });

  $('.sortby-link').on('click', function(e) {
    e.preventDefault();
  });
})();

/**
 * Change collection page view
 *
 */

 (function collectionLayout() {
  $('body').on('click', '.js-collection-layout', function(e) {
    e.preventDefault();
    $('.collection-items').toggleClass('details-hidden');
    if($('.collection-items').data('alternate-view') === 'compact'){ $('.collection-items').toggleClass('compact'); }
    $('.layout__cta').toggleClass('details-hidden');
  });
})();
