/**
 * Toggle rules and info
 *
 */

(function modDropdown() {
  'use strict';

  var selectors = {
    dropdownButton: '.cta-dropdown__button',
    dropdownButtonSpan: '.cta-dropdown__button span',
    dropdownWrapper: '.cta-dropdown__wrapper'
  };

  if (document.querySelector(selectors.dropdownButton) === null) {
    return;
  }

  function dropdownFunction() {
    document.querySelector(selectors.dropdownButton).addEventListener("click", (e) => {
      e.preventDefault();
      $(selectors.dropdownWrapper).slideToggle(200);

      var dropdownButtonSpan = document.querySelector(selectors.dropdownButtonSpan);
      if (dropdownButtonSpan.innerHTML === "Show") {
        dropdownButtonSpan.innerHTML = "Hide";
      } else {
        dropdownButtonSpan.innerHTML = "Show";
      }
    });
  }

  dropdownFunction();

  document.addEventListener("shopify:section:load", function(event) {
    if(event.detail.sectionId == "holiday-landing-dropdown-cta") {
      dropdownFunction();
    }
  });
})();

/**
 * Gift guide carousel
 *
 * @requires jQuery
 * @requires Slick
 * @see http://kenwheeler.github.io/slick/
 *
 */

(function modGiftGuideCarousel() {
  var selectors = {
    giftGuideCarousel: '.gift-guide__carousel'
  };

  var opts = {
    slidesToShow: 3,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  var $giftGuideCarousels = $(selectors.giftGuideCarousel);

  $giftGuideCarousels.slick(opts);

  document.addEventListener("shopify:section:load", function(event) {
    if(event.detail.sectionId == "holiday-landing-gift-guide") {
      var selectors = {
        giftGuideCarousel: '.gift-guide__carousel'
      };

      var opts = {
        slidesToShow: 3,
        infinite: false,
        autoplay: false,
        autoplaySpeed: 4000,
        arrows: false,
        dots: true,
        responsive: [
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      };

      var $giftGuideCarousels = $(selectors.giftGuideCarousel);

      $giftGuideCarousels.slick(opts);
    }
  });
})();