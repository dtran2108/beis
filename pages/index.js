import Link from 'next/link';
import React from 'react';
import Meta from '~/views/SEO/meta';
import Home from '~/container/Home/index';
import HOCApp from '~/views/HOCApp';

export default function Index() {
  return (
    <HOCApp>
      <Meta
        title={'Beis Travel | The Ultimate Travel Essential'}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={
          'The best travel gear and accessories for the modern traveler. These are perfect for weekend sleepovers, beach days, and summers in the south of France. Designed and created by Shay Mitchell.'
        }
      />
      <Home />
    </HOCApp>
  );
}
