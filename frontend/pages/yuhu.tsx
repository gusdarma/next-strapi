import * as React from "react";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";
import Gambar from 'pages/components/plaiceholder';

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

const Page: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
	imageProps,
}) => (
    <div>
		<Image {...imageProps} placeholder="blur" alt="yuhu" />
        {console.log(imageProps, 'ini propsnya')}
		{/* <Gambar /> */}
	</div>
);

export default Page;
