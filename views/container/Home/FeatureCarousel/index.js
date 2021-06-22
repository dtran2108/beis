import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-bootstrap/Carousel';

export default function FeatureCarousel(props) {
  return (
    <div {...props}>
      <Carousel
        prevIcon={<FontAwesomeIcon icon={faChevronCircleLeft} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}
        nextIcon={<FontAwesomeIcon icon={faChevronCircleRight} style={{ width: '1.5rem', height: '1.5rem', color: '#b6b6b6' }} />}>
        {props.itemList.map((item) => (
          <Carousel.Item interval={3000} key={item.key}>
            <img
              className="d-block w-100"
              style={{ height: '500px' }}
              src="vninturist-assets/wp-content/uploads/2020/12/transparent-bg.png"
              alt="First slide"
            />
            <Carousel.Caption className="row">
              <div
                className="col small-12 large-6"
                style={{
                  backgroundImage: "url('/vninturist-assets/wp-content/uploads/2020/12/Slide-1-nghiduong-768x574.jpg')",
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }}
              />
              <div className="col small-12 large-6 d-flex flex-column justify-content-center">
                <h1 style={{ color: '#000' }}>{item.title}</h1>
                <p style={{ color: '#000' }} className="title-carousel">
                  {item.content}
                </p>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
