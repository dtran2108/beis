import React from 'react';
import { Carousel } from 'react-bootstrap';
import SectionHeader from '~/views/container/components/SectionHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons';
import { AOS_DATA } from '~/configs/index';
import styled from 'styled-components';

const CarouselStyled = styled(Carousel)`
  .carousel-caption {
    top: 210px !important;
    background-color: rgba(0, 0, 0, 0.3);
    height: 90px;
    position: absolute;
    top: 400px !important;
    font-family: Montserrat;
  }

  .carousel-indicators {
    bottom: -16px !important;
  }
  .carousel-indicators li.active {
    background-color: #fff !important;
  }
  .carousel-indicators li {
    background-color: rgba(255, 255, 255, 0.5) !important;
  }
  .carousel-control-prev {
    left: -37px;
  }
  .carousel-control-next {
    right: -37px;
  }
`;

const RoomSection = (props) => {
  const serviceList = [
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Slide-Room-1.jpg',
      title: 'Deluxe Ocean View'
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Slide-Room-1.jpg',
      title: 'Deluxe Ocean View'
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Slide-Room-1.jpg',
      title: 'Deluxe Ocean View'
    },
    {
      imgSrc: '/vninturist-assets/wp-content/uploads/2020/12/Slide-Room-1.jpg',
      title: 'Deluxe Ocean View'
    }
  ];
  return (
    <section {...props}>
      <div className="row text-center mb-2">
        <SectionHeader
          layout="col-12"
          dividerWidth="200px"
          title={
            <h1 className="mb-2" style={{ textAlign: 'center', fontSize: '30px', color: '#000' }}>
              PHÒNG NGHỈ SANG TRỌNG
            </h1>
          }
        />
      </div>
      <div className="row text-center mb-4" style={{ maxWidth: '100%' }} data-aos={AOS_DATA.zoomIn}>
        <div className="col-12 col-lg-8 col-md-8">
          <h4 style={{ color: '#000' }}>
            Tận hưởng không gian sống tràn ngập hơi thở của thiên nhiên với hệ thống phòng nghỉ sang trọng hoặc biệt thự và bungalow có hồ
            bơi riêng; du khách có thể tùy thích lựa chọn loại phòng có hướng nhìn ra đại dương xanh biếc hoặc khu vườn tươi mát.
          </h4>
        </div>
      </div>

      <div className="row" data-aos={AOS_DATA.fadeRight}>
        <CarouselStyled
          prevIcon={<FontAwesomeIcon icon={faChevronCircleLeft} style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />}
          nextIcon={<FontAwesomeIcon icon={faChevronCircleRight} style={{ width: '1.5rem', height: '1.5rem', color: 'white' }} />}>
          {serviceList.map((item, i) => (
            <CarouselStyled.Item key={i}>
              <img className="d-block w-100" src={item.imgSrc} alt="First slide" />
              <CarouselStyled.Caption className="d-flex flex-column justify-content-start align-items-center">
                <h3 style={{ color: 'white' }}>
                  <b>{item.title}</b>
                </h3>
              </CarouselStyled.Caption>
            </CarouselStyled.Item>
          ))}
        </CarouselStyled>
      </div>
    </section>
  );
};

export default RoomSection;
