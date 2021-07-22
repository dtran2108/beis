import React from 'react';
import Meta from '~/views/SEO/meta';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import HOCApp from '~/views/HOCApp';

export default function Index() {
  return (
    <HOCApp>
      <Meta
        title={'rewards - beis'}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={
          'The best travel gear and accessories for the modern traveler. These are perfect for weekend sleepovers, beach days, and summers in the south of France. Designed and created by Shay Mitchell.'
        }
      />
      <div className="swell-reward-beis-travel" style={{ backgroundColor: '#ebd9c9' }}>
        <div className="banner-section">
          <div className="banner-heading-area">
            <div className="banner-text-holder">
              <h1 className="banner-heading">béis rewards</h1>
              <p className="banner-text">As a rewards member, get closer to earning exclusive rewards every time you shop.</p>
              <UISecondaryButton width="200px" size="large">
                SIGN UP
              </UISecondaryButton>
            </div>
          </div>
          <div className="banner-image-area">
            <div className="banner-image-holder">
              <img
                alt="img 1"
                className="swell-desktop-banner"
                src="//cdn.shopify.com/s/files/1/0032/3423/4479/t/323/assets/swell-new-cropped-banner-image.jpg?v=11449237795617414727"
              />
            </div>
          </div>
        </div>

        <div className="how-it-work-section">
          <div className="how-it-work-image-area">
            <div className="how-it-work-image-holder">
              <img
                alt="img 1"
                className="swell-desktop"
                src="//cdn.shopify.com/s/files/1/0032/3423/4479/t/323/assets/swell-new-how-it-work.jpg?v=15418156615084889667"
              />
            </div>
          </div>
          <div className="how-it-work-heading-area">
            <div className="how-it-work-text-holder">
              <h1 className="how-it-work-heading">How it Works</h1>
              <ul className="how-it-work-list">
                <li className="how-it-work-item">
                  <div className="how-it-work-item-content">
                    <p>Join</p>
                    <p className="how-it-work-text">JOIN by signing up today. We’ll even give you 10 points to start!</p>
                  </div>
                </li>
                <li className="how-it-work-item">
                  <div className="how-it-work-item-content">
                    <p>Earn</p>
                    <p className="how-it-work-text">
                      EARN points every time you make a purchase on our site{' '}
                      <span>
                        (click <a href="#swell-campaign-section">here</a> to see more ways to earn points)
                      </span>
                      .
                    </p>
                  </div>
                </li>
                <li className="how-it-work-item">
                  <div className="how-it-work-item-content">
                    <p>Redeem</p>
                    <p className="how-it-work-text">REDEEM your points for BÉIS products and discounts at checkout. No need for a code.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </HOCApp>
  );
}
