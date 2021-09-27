import { Component } from 'react';
import ReactDOM from 'react-dom';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

import Image from 'next/image';

interface typesSliderText {
  data: any;
  image: any;
}

const SliderText: React.FC<typesSliderText> = ({ data, image }) => {
  const { SliderDescription } = data;

  return (
    <div className="container py-12">
      <Carousel
        infiniteLoop={true}
        swipeable={true}
        autoPlay={true}
        showThumbs={false}
      >
        {SliderDescription.map((datas: any) => (
          <div className="" key={datas.id}>
            <div className="">
              <p
                className=""
                dangerouslySetInnerHTML={{
                  __html: datas.SliderDescription,
                }}
              ></p>
            </div>
          </div>
        ))}
      </Carousel>
      <Image
        {...image}
        placeholder="blur"
        alt="yuhu"
        width={600}
        height={900}
      />
      <div className="py-40">
        <div className="">
          <p className="">yuhu</p>
        </div>
      </div>
    </div>
  );
};

// export const getStaticProps = async () => {
//   const { base64, img } = await getPlaiceholder("/plaiceholder.jpg");

//   return {
//       props: {
//       imageProps: {
//           ...img,
//           blurDataURL: base64,
//       },
//       },
//   };
//   };

// const SliderText: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
//     imageProps,
// }) => (
//     <div>
//       <Image {...imageProps} placeholder="blur" />
//     </div>
//   );

export default SliderText;
