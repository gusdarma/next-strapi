import { Component } from 'react';
import ReactDOM from 'react-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import yuhuAsik from 'pages/api/plaiceholder';


import Image from "next/image";
import { getPlaiceholder } from 'plaiceholder';
import { InferGetStaticPropsType } from 'next';

interface typesSliderText {
    data: any;
    image: any;
}

export const getStaticProps = async () => {
  const { base64, img } = await getPlaiceholder("/example.jpg");

  return {
      props: {
      imageProps: {
          ...img,
          blurDataURL: base64,
      },
      },
  };
  };

const Gambar: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
    imageProps,
}) => (
    <div>
      <Image {...imageProps} placeholder="blur" />
    </div>
  );


export default Gambar;
