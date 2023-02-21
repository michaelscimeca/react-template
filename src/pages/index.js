import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { CSSTransition } from 'react-transition-group';
import { client } from 'lib/sanity';
const BlockContent = require('@sanity/block-content-to-react')
// import BlockContent from '@sanity/block-content-to-react';
import { urlFor } from '../utils/imageUrlFor';

const duration = 300;

const query = `*[title == "home"][0]`;

export default function Home({data}) {
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };
  const nodeRef = useRef(null);
  const imageUrl = urlFor(data.poster).url()

  return (
    <>

      {/* {JSON.stringify(data.poster, null, 2)} */}
      {/* {data.overview} */}
      <img src={urlFor(imageUrl)}  />

      <BlockContent blocks={data.overview} />
     
      <button onClick={handleClick}>Toggle visibility</button>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <CSSTransition
          in={isVisible}
          timeout={duration}
          classNames="fade"
          nodeRef={nodeRef}
        >
          <div ref={nodeRef}>
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              width={100}
              height={24}
              priority
            />
          </div>
        </CSSTransition>
      </a>
    </>
  );
}

export const getStaticProps = async () => {
  const data = await client.fetch(query);
  return { props: { data } };
};
