import React from 'react';
import Header from '~/container/components/Header/Header';
import VideoSection from './VideoSection';
import SummerSection from './SummerSection';
import WorkHardSection from './WorkHardSection';
import WineSection from './WineSection';
import WeLoveThemSection from './WeLoveThemSection';

const Home = () => {
  return (
    <>
      <VideoSection />
      <SummerSection />
      <WorkHardSection />
      <WineSection />
      <WeLoveThemSection />
    </>
  );
};

export default Home;
