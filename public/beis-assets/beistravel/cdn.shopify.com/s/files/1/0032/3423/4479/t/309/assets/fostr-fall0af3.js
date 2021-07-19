(function() {
  const collectionPage = document.querySelector('.js-collection-fall');
  const productPage = document.querySelector('.js-pdp-fall');
  const blocker = document.querySelector('.js-modal-fall-blocker');
  const html = document.querySelector('html');
  const blockerMobileModals = ['menu', 'reviews', 'instagram', 'spec', 'beistv'];
  function modals() {

    const openers = Array.from(document.querySelectorAll('[data-modal-opener]'));
    const closers = Array.from(document.querySelectorAll('[data-modal-closer]'));
    const windows = Array.from(document.querySelectorAll('[data-modal-window]'));
    for (let opener of openers) {
      opener.addEventListener('click', () => {
        const modalId = opener.dataset.modalOpener;
        const modalWindow = windows.find(window => window.dataset.modalWindow === modalId);
        if (modalWindow) {
          modalWindow.classList.add('active');
          if (blockerMobileModals.includes(modalId) && blocker) {
            blocker.classList.add('active');
            html.classList.add('overflow-hidden-mobile');
          }
        }
      })
    }

    const videoPlaceholder = document.querySelector('[data-modal-video-placeholder]');
    if (videoPlaceholder) {
      videoPlaceholder.addEventListener('click', () => {
        const iframe = document.querySelector(`.${videoPlaceholder.dataset.modalVideoPlaceholder}`);
        if (iframe) {
          iframe.src = iframe.dataset.video;
          iframe.classList.add('active');
        }
      })
    }

    const yoptoWidget = document.querySelector('.product__reviews-widget .yotpo');
    if (yoptoWidget) {
      yoptoWidget.addEventListener('click', () => {
        const modalWindow = document.querySelector('[data-modal-window="reviews"]');
        if (modalWindow) {
          modalWindow.classList.add('active');
        }
      })
    }

    for (let closer of closers) {
      closer.addEventListener('click', () => {
        const modalId = closer.dataset.modalCloser;
        const modalWindow = windows.find(window => window.dataset.modalWindow === modalId);
        if (blocker) {
          blocker.classList.remove('active');
          html.classList.remove('overflow-hidden-mobile');
        }
        if (modalWindow) {
          modalWindow.classList.remove('active');

          if (modalId === 'beistv') {
            const iframe = modalWindow.querySelector('iframe');
            if (iframe && iframe.src.includes('&autoplay=1')) {
              iframe.src = iframe.src.replace('&autoplay=1', '');
            }

          }
        }
      })
    }
  }

  function chatModal() {
    if (collectionPage || productPage){
      function isWidget() {
        const initialized = window.fcWidget && window.fcWidget.isInitialized() === true;
        if (initialized) {
          stopInterval();
        }
      }
    }

    const checkInterval = setInterval(isWidget, 500);

    function stopInterval() {
      clearInterval(checkInterval);
      const widget = document.getElementById('fc_frame');
      widget.classList.add('d-none');
      const opener = document.querySelector('[data-chat-opener]');
      if (opener) {
        opener.addEventListener('click', () => {
          if (window.fcWidget.isOpen() !== true) {
            window.fcWidget.open();
            widget.classList.remove('d-none');
          }
        })
      }
      window.fcWidget.on("widget:closed", function(resp) {
        widget.classList.add('d-none');
      });
      opener.style.opacity = '1';
      opener.style.visibility = 'visible';
    }
  }

  function pdpThumbnails() {
    if (productPage) {
      const thumbnails = Array.from(productPage.querySelectorAll("[data-thumbnail]"));
      const images = Array.from(productPage.querySelectorAll("[data-featured-image]"));
      for (let thumbnail of thumbnails) {
        thumbnail.addEventListener('click', () => {
          const src = thumbnail.dataset.thumbnail;
          if (src) {
            const relatedImage = images.find(image => image.dataset.id === thumbnail.dataset.id);
            if (relatedImage) {
              for (let image of images) {
                if (image === relatedImage) {
                  relatedImage.classList.add('desktop-active');
                }
                else {
                  image.classList.remove('desktop-active');
                }
              }

            }
          }
        })
      }
    }
  }

  function draggable() {

    const draggables = Array.from(document.querySelectorAll(".js-draggable"));
    for (let draggable of draggables) {
      draggable.style.height = draggable.offsetHeight + 'px';
      draggable.style.width = draggable.offsetWidth + 'px';
      draggable.style.position = 'absolute';

      createHollow(draggable);
      dragElement(draggable);
    }

    function createHollow(el) {
      if (el.classList.contains('js-draggable--hollow')) {
        const hollow = document.createElement('span');
        hollow.classList.add('js-hollow');
        hollow.style.height = el.offsetHeight + 'px';
        hollow.style.width = el.offsetWidth + 'px';
        el.parentNode.insertBefore(hollow, el.nextSibling);
      }
    }

    function dragElement(elmnt) {





      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      const header = elmnt.querySelector('.js-draggable__header');
      if (header) {
        // if present, the header is where you move the DIV from:
        header.style.cursor = 'move';
        header.onmousedown = dragMouseDown;

      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }

      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;

      }

      function elementDrag(e) {

        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position

        let newTop = elmnt.offsetTop - pos2;
        let newLeft = elmnt.offsetLeft - pos1;

        // const isOut = isOutLeft || isOutTop || isOutRight || isOutBottom;

        let parent = elmnt.closest('.js-drag-area');
        if (!parent) parent = document.querySelector('body');
        const minLeft =  - parent.offsetLeft;
        const minTop = - parent.offsetTop + 44;
        const maxLeft = window.innerWidth - parent.getBoundingClientRect().left - elmnt.offsetWidth;
        const maxTop = window.innerHeight - parent.getBoundingClientRect().top - elmnt.offsetHeight;
        if (newLeft < minLeft) newLeft = minLeft;
        if (newTop < minTop) newTop = minTop;
        if (newLeft > maxLeft) newLeft = maxLeft;
        if (newTop > maxTop) newTop = maxTop;
        elmnt.style.top = newTop + "px";
        elmnt.style.left = newLeft + "px";
      }

      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }

  }

  function scrollbars() {
    new SimpleBar($('.fall-simplebar')[0], { autoHide: false });
  }

  modals();
  chatModal();
  pdpThumbnails();

  // draggable on tablet and up
  if (window.innerWidth >= 768) {
    draggable();
  } else {
    scrollbars();
  }
})();
