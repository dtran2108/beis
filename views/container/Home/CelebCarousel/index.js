import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

export default function CelebCarousel(props) {
  return (
    <div {...props}>
      <Carousel
        className="celebrity"
        style={{
          border: '1px solid transparent',
          boxShadow: '3px 5px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px'
        }}
        prevIcon={<FontAwesomeIcon icon={faChevronCircleLeft} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}
        nextIcon={<FontAwesomeIcon icon={faChevronCircleRight} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}>
        {props.itemList.map((item) => (
          <Carousel.Item key={item.key} interval={3000}>
            <img
              className="d-block w-100"
              style={{ height: '400px' }}
              src="vninturist-assets/wp-content/uploads/2020/12/transparent-bg.png"
              alt="First slide"
            />
            <Carousel.Caption className="d-flex flex-column align-items-center justify-content-center">
              <div
                style={{
                  backgroundImage: `url(${item.celebImg})`,
                  backgroundRepeat: 'no-repeat',
                  width: '100px',
                  border: '1px solid transparent',
                  borderRadius: '999px',
                  height: '100px',
                  backgroundPosition: 'center',
                  marginBottom: '16px'
                }}
              />
              <h1 style={{ color: '#000', marginBottom: '0' }}>{item.celebName}</h1>
              <p style={{ color: '#000', padding: '0 56px', fontSize: '.8rem', marginBottom: '32px' }}>{item.celebTitle}</p>
              <p className="title-carousel" style={{ color: '#6d6d6d', fontSize: '1rem', marginBottom: 0 }}>
                <i>{item.celebQuote}</i>
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
