import React from 'react';
import { AOS_DATA } from '~/configs/index';
import WelcomeSection from './WelcomeSection';
import HeavenSection from './HeavenSection';
import FeatureSection from './FeatureSection';
import ServiceSection from './ServiceSection';
import RoomSection from './RoomSection';
import PrizeSection from './PrizeSection';
import MoreInfoSection from './MoreInfoSection';

const CBPIntroduce = () => {
  return (
    <>
      <main id="main" className="">
        <div id="content" role="main" className="content-area">
          <WelcomeSection data-aos={AOS_DATA.zoomInLeft} />

          <HeavenSection />

          <FeatureSection className="mt-5" />

          <ServiceSection className="my-5" />

          <RoomSection className="my-5" />

          <PrizeSection className="my-5" />

          <MoreInfoSection className="my-5" />
        </div>
      </main>
    </>
  );
};

export default CBPIntroduce;
