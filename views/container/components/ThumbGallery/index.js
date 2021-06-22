import { useEffect } from 'react';
import Swiper from 'swiper';
import styled from 'styled-components';
import { getArray } from '~/utils/helpers/utilObject';

const WrapperThumbsGallery = styled.div`
  .swiper-container {
    width: 100%;
    height: 300px;
    margin-left: auto;
    margin-right: auto;
  }

  .swiper-slide {
    background-size: cover;
    background-position: center;
  }

  .gallery-top {
    height: 80%;
    width: 100%;
  }

  .gallery-thumbs {
    height: 20%;
    box-sizing: border-box;
    padding: 10px 0;
  }

  .gallery-thumbs .swiper-slide {
    width: 25%;
    height: 100%;
    opacity: 0.4;
  }

  .gallery-thumbs .swiper-slide-thumb-active {
    opacity: 1;
  }
`;

const ThumbsGallery = (props) => {
  const { config, listItem, allowArrow } = props;

  useEffect(() => {
    const galleryThumbs = new Swiper(`.${config.type}`, config.options);

    const galleryTop = new Swiper('.gallery-top', {
      spaceBetween: 10,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      thumbs: {
        swiper: galleryThumbs
      }
    });
  });
  return (
    <WrapperThumbsGallery>
      <div class="swiper-container gallery-top">
        <div class="swiper-wrapper">
          {listItem &&
            getArray(listItem, undefined, []).map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item}
              </div>
            ))}
        </div>
        {allowArrow && <div class="swiper-button-next swiper-button-white"></div>}
        {allowArrow && <div class="swiper-button-prev swiper-button-white"></div>}
      </div>
      <div class="swiper-container gallery-thumbs">
        <div class="swiper-wrapper">
          {listItem &&
            getArray(listItem, undefined, []).map((item, index) => (
              <div className="swiper-slide" key={index}>
                {item}
              </div>
            ))}
        </div>
      </div>
    </WrapperThumbsGallery>
  );
};

ThumbsGallery.defaultProps = {
  config: {
    type: 'gallery-thumbs',
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
    options: {
      autoplay: {
        delay: 5000
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20
        },
        768: {
          slidesPerView: 3,
          spaceBetween: 40
        },
        1024: {
          slidesPerView: 4,
          spaceBetween: 50
        }
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      loop: false
    }
  }
};

export default ThumbsGallery;
