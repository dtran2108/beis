import React from 'react';
// import Example from '~/container/Example';
// import { head } from 'lodash';
import Meta from '~/views/SEO/meta';

/**
 * wrapper: connect with Redux in getStaticProps({store})
 */
const Index = () => {
  // const dispatch = useDispatch();
  // dispatch(setProvinces(props.provinces));
  return (
    <>
      <Meta
        title={'ERA EXAMPLE '}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={'Description alasldkasjdlask jd'}
      />
      {/*send props(data fetch from api) to component*/}
      {/* <Example {...props} /> */}
    </>
  );
};

// export async function getStaticProps({ preview = false }) {
//   const allPosts = ['title', 'date', 'slug', 'author', 'coverImage', 'excerpt'];
//   const provinces = await (await fetch('http://45.76.152.153:8080/api/v1/provinces')).json();
//   return {
//     props: { allPosts, provinces: [head(provinces)] || null, preview }
//   };
// }

export default Index;
