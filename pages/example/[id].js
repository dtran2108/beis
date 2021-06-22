import React from 'react';
import Meta from '~/views/SEO/meta';

/**
 * Dynamic routing
 * when use getStaticProps -> required getStaticPaths
 * getStaticPaths: return {
 *   paths: [],
 *   fallback: true
 * }
 */

const ExampleDetail = (props) => {
  return (
    <>
      <Meta
        title={'EXAMPLE DETAIL '}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={'Description alasldkasjdlask jd'}
      />
      <div>
        Detail example
        {JSON.stringify(props.district)}
      </div>
    </>
  );
};

export async function getStaticProps({ params }) {
  // params contains the district `id`.
  // If the route is like /districts/1, then params.id is 1
  const res = await fetch(`http://45.76.152.153:8080/api/v1/districts?provinceId=${params.id}`);
  const district = await res.json();

  // Pass district data to the page via props
  return {
    props: { district },
    // Re-generate the district at most once per second
    // if a request comes in
    revalidate: 1
  };
}

// This function gets called at build time
export async function getStaticPaths() {
  // Call an external API endpoint to get provinces
  const res = await fetch('http://45.76.152.153:8080/api/v1/provinces?size=63');
  const provinces = await res.json();

  // Get the paths we want to pre-render based on provinces
  const paths = provinces.map((province) => ({
    params: { id: province.id + '' } // string important
  }));

  // We'll pre-render only these paths at build time.
  // { fallback: false }Means other routes should be 404.
  return { paths, fallback: true };
}
export default ExampleDetail;
