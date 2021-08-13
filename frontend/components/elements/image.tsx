import { getStrapiMedia } from "utils/media";
import Image from "next/image";
import PropTypes from "prop-types";
import { mediaPropTypes } from "utils/types";

interface typesNextImage{
    media: {
        url: string;
        alternativeText: string;
        width: number;
        height:number;
    };
    width?: number;
    height?: number;
}

const NextImage: React.FC<typesNextImage> = ({ media, ...props }) => {
    const { url, alternativeText } = media;

    const loader = ({ src } : any) => {
        return getStrapiMedia(src);
    };

    // The image has a fixed width and height
    if (props.width && props.height) {
        return (
            <Image
                loader={loader}
                src={url}
                alt={alternativeText || ""}
                {...props}
            />
        );
    }

    // The image is responsive
    return (
        <Image
            loader={loader}
            layout="responsive"
            width={media.width}
            height={media.height}
            objectFit="contain"
            src={url}
            alt={alternativeText || ""}
        />
    );
};


export default NextImage;
