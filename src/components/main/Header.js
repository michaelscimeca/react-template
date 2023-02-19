import Head from "next/head";
import { NextSeo } from 'next-seo';

export default function Layout(props) {
  return (
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <NextSeo
        title="My Website"
        description="This is my website"
        openGraph={{
          type: 'website',
          title: 'My Website',
          description: 'This is my website',
          images: [
            {
              url: 'https://example.com/image.jpg',
              alt: 'Image alt text',
            },
          ],
        }}
      />
      </Head>
  );
}
