import Head from 'next/head';
import React from 'react';
import {
  SEO_NAME,
  SEO_LOGO,
  SEO_KEYWORDS,
  SEO_OGTITLE,
  SEO_TITLE,
  SEO_COMPANY,
  SEO_PUBLISHER,
  SEO_SITENAME,
  SEO_CANONICAL,
  SEO_URL,
  SEO_FAVICON
} from '~/lib/constants';

const Meta = (props) => {
  return (
    <Head>
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta content="INDEX,FOLLOW" name="robots" />
      <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1, maximum-scale=1, user-scalable=0" />
      <title>{props.title ? props.title : SEO_TITLE}</title>

      <meta name="description" content={props.description ? props.description : SEO_NAME} />
      <meta property="og:site_name" content={props.siteName ? props.siteName : SEO_SITENAME} />
      <meta property="og:title" content={props.ogTitle ? props.ogTitle : SEO_OGTITLE} />
      <meta property="og:image" content={props.ogImage ? props.ogImage : SEO_LOGO} />
      <meta property="og:description" itemProp="description" content={props.description ? props.description : `${SEO_NAME}.`} />
      <meta property="og:url" itemProp="url" content={SEO_URL} />
      <meta name="keywords" content={props.keywords + SEO_KEYWORDS} />

      <meta name="copyright" content={SEO_COMPANY} />
      <meta name="author" content={SEO_COMPANY} />
      <meta name="GENERATOR" content={SEO_COMPANY} />
      <meta itemProp="description" content={props.description ? props.description : `${SEO_NAME}.`} />
      <meta itemProp="image" content={props.image ? props.image : props.ogImage} />
      <meta itemProp="name" content={SEO_NAME} />

      <link rel="canonical" href={SEO_CANONICAL}></link>
      <link rel="publisher" href={SEO_PUBLISHER} />
      <link rel="icon" type="image/png" sizes="32x32" href={SEO_LOGO} />
      <link rel="icon" type="image/png" sizes="16x16" href={SEO_LOGO} />
      <link rel="shortcut icon" href={SEO_LOGO} />
      <link rel="icon" href={SEO_FAVICON} type="image/x-icon" />

      <meta name="revisit-after" content="1 days" />

      <meta httpEquiv="audience" content="General" />
      <meta name="resource-type" content="Document" />
      <meta name="distribution" content="Global" />

      <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />

      <meta property="og:type" content="website" />
      <meta property="og:locale" content="vi_VN" />
      <meta property="fb:app_id" content="419645584142044" />
      <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
      <link rel="manifest" href="/favicon/site.webmanifest" />
      <link rel="mask-icon" href="/favicon/safari-pinned-tab.svg" color="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/favicon/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />

      {/* FONTS */}
      <link href="https://fonts.googleapis.com/css?family=Satisfy" rel="stylesheet" />
    </Head>
  );
};

export default Meta;
