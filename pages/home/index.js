import Link from 'next/link';
import React from 'react';
import Meta from '~/views/SEO/meta';

const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(resolve(['hihi', 'haha']), 3000);
  });

/**
 * SSR: call api in getStaticProps -> return
 */
export default function Index({ data }) {
  const heroPost = data[0];
  return (
    <>
      <Meta
        title={'ERA EXAMPLE '}
        image={'https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png'}
        ogImage={'https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png'}
        description={'Description alasldkasjdlask jd'}
      />
      <div>{heroPost}</div>
      <Link href="/example">Go example</Link>
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const data = await fetchData();
  return {
    props: { preview, data }
  };
}
