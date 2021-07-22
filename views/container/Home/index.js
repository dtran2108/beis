import React from 'react';
import Header from '~/views/container/components/Header';
import VideoSection from './VideoSection';
import SummerSection from './SummerSection';
import WorkHardSection from './WorkHardSection';

const Home = () => {
  return (
    <>
      <Header />
      <VideoSection />
      <SummerSection />
      <WorkHardSection />
    </>
  );
};

export default Home;
