'use client';

import Head from 'next/head';

export default function CustomHead() {
  return (
    <Head>
      <link rel="icon" href="/assets/images/favicon_io/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/images/favicon_io/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/images/favicon_io/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/images/favicon_io/apple-touch-icon.png" />
      <link rel="manifest" href="/assets/images/favicon_io/site.webmanifest" />
    </Head>
  );
}
