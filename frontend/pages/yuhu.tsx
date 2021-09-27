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
}) => {

	const allNumber = [1,2,3,4,5,6,7,8,9,10];
	const [count, setCount] = React.useState(0);

	// const filterArray = () => {
	// 	var item = allNumber[Math.floor(Math.random()*allNumber.length)];
	// 	console.log(item, 'ini randomnya');
	// }



	React.useEffect(() => {
		setTimeout(()=>{

			//Get random value from array
			var item = allNumber[Math.floor(Math.random()*allNumber.length)];
			console.log(item, 'ini randomnya');

			setCount(count + 1)
		}, 5000)
	}, [count])



	return(
		<div>
			{/* <Image {...imageProps} placeholder="blur" alt="yuhu" /> */}
			{/* <Gambar /> */}
			<div className="">yuhu</div>
			{allNumber.map((number: number, id : number) => (
				<>
					{id < 5 ? (
						<div className="p-4" key={number}>
							<p className="">{number}</p>
						</div>
					) : ('')
					}
				</>
			))}

		</div>
	)
};

export default Page;
