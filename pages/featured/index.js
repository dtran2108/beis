import React from 'react';
import Meta from '~/views/SEO/meta';
import { UISecondaryButton } from '~/views/presentation/ui/buttons';
import HOCApp from '~/views/HOCApp';
import { Select } from 'antd';
import ProductItem from '~/views/container/components/ProductItem';
import { useWindowSize } from 'react-use';

export default function Index() {
  // eslint-disable-next-line no-unused-vars
  const { width, height } = useWindowSize();
  return (
    <HOCApp>
      <Meta
        title={'Featured Collection - Beis'}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={
          'The best travel gear and accessories for the modern traveler. These are perfect for weekend sleepovers, beach days, and summers in the south of France. Designed and created by Shay Mitchell.'
        }
      />
      <main className="main" style={{ marginTop: width <= 768 ? '10rem' : '5rem' }}>
        <div className="container-fluid plp">
          <div className="plp__header">
            <h1 className="product-header color-black">Featured Collection</h1>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="d-flex" style={{ marginTop: '50px' }}>
                <UISecondaryButton width="75px" className="mr-2">
                  FILTERS
                </UISecondaryButton>
                <Select style={{ width: 120 }} onChange={() => {}} defaultValue="sortBy">
                  <Select.Option value="sortBy">SORT BY</Select.Option>
                  <Select.Option value="jack">Jack</Select.Option>
                  <Select.Option value="lucy">Lucy</Select.Option>
                  <Select.Option value="Yiminghe">yiminghe</Select.Option>
                </Select>
              </div>
            </div>
          </div>

          <div className="row collection-items">
            {[1, 2, 3, 4, 6, 7, 8, 9, 10].map((product, i) => (
              <ProductItem key={i} product={product} />
            ))}
          </div>
        </div>
      </main>
    </HOCApp>
  );
}
