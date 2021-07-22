import React from 'react';
import Header from '~/views/container/components/Header';
import VideoSection from './VideoSection';
import SummerSection from './SummerSection';
import WorkHardSection from './WorkHardSection';
import WineSection from './WineSection';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';

const Home = () => {
  return (
    <>
      <Header />
      <VideoSection />
      <SummerSection />
      <WorkHardSection />
      <WineSection />
    </>
  );
};

export default Home;
