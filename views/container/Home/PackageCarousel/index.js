import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';
import { AOS_DATA } from '~/configs/index';

export default function FeatureCarousel(props) {
  return (
    <>
      <Carousel
        className="product-package"
        prevIcon={<FontAwesomeIcon icon={faChevronCircleLeft} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}
        nextIcon={<FontAwesomeIcon icon={faChevronCircleRight} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}>
        {props.itemList.map((item) => (
          <Carousel.Item interval={3000} key={item.key}>
            <img
              className="d-block w-100"
              style={{ height: '800px' }}
              src="vninturist-assets/wp-content/uploads/2020/12/transparent-bg.png"
              alt="First slide"
              data-aos={AOS_DATA.zoomInUp}
            />
            <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center" data-aos={AOS_DATA.fadeUp}>
              <img src={item.imgSrc} alt="product" width="70%" height="auto" />
              <h1 style={{ color: '#000', marginBottom: '0' }}>{item.title}</h1>
              <hr className="style-hr-package" />
              <p className="title-carousel" style={{ color: '#6d6d6d', fontSize: '1rem', marginBottom: '56px' }}>
                {item.content}
              </p>
              <Link href={item.link}>
                <span className="button is-large btn-package" style={{ borderRadius: '99px' }}>
                  Tìm hiểu ngay
                </span>
              </Link>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
}
