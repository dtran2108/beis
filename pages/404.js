import React from 'react';
import Meta from '~/views/SEO/meta';
import HOCApp from '~/views/HOCApp';

export default function Index() {
  return (
    <HOCApp>
      <Meta
        title={'404 Not Found - Beis'}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={
          'The best travel gear and accessories for the modern traveler. These are perfect for weekend sleepovers, beach days, and summers in the south of France. Designed and created by Shay Mitchell.'
        }
      />
      <center>
        <div>
          <br />
          <img
            alt="beis"
            src="https://cdn.shopify.com/s/files/1/0032/3423/4479/files/Logo_300x168_small_30eb8a98-7569-4e8b-8c1c-880fbddbe46b.png?6227089005472032858"
          />
          <br />
          <h5 className="mb-0">404 Page Not Found</h5>
          <p className="mb-0">
            The page you requested does not exist. Click <a href="/">here</a> to continue shopping.
          </p>
          <br />
          <br />
          <br />
          <br />
        </div>
      </center>
    </HOCApp>
  );
}
