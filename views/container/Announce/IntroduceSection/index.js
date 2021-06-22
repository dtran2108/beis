import React from 'react';
import AnnounceSectionWrapper from '../AnnounceSectionWrapper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

export default function IntroduceSection(props) {
  return (
    <AnnounceSectionWrapper
      layout="medium-6 small-12 large-6"
      dividerWidth="250px"
      title={
        <div style={{ fontFamily: 'Montserrat' }}>
          <h1 className="mb-2 mt-5" style={{ textAlign: 'center', fontSize: '64px', letterSpacing: '.3rem', color: '#000' }}>
            GIỚI THIỆU
          </h1>
          <h5 style={{ textAlign: 'center', letterSpacing: '.3rem', color: 'gray' }}>THẺ ĐẦU TƯ KỲ NGHỈ CBP RIVIERA</h5>
        </div>
      }
      {...props}>
      {props.jumptoList.map((item, i) => (
        <div key={item.key}>
          <button onClick={() => props.scrollToRef(props.refs.current[i])}>
            <p
              className="d-flex align-items-center"
              style={{ textAlign: 'left', fontFamily: 'Montserrat', color: '#000', fontSize: '16px' }}>
              <FontAwesomeIcon icon={faAngleDoubleRight} style={{ width: '1rem', height: '1rem', marginLeft: '.5rem', fontWeight: 200 }} />
              &nbsp;{item.title}
            </p>
          </button>
        </div>
      ))}
    </AnnounceSectionWrapper>
  );
}
