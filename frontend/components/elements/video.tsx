import { getStrapiMedia } from "utils/media";

interface typesVideo {
    media: {
        url: string;
        mime: string;
    };
    poster?: {
        url: string;
    };
    className: string;
    controls?: boolean;
    autoPlay?: boolean;
}

const Video : React.FC<typesVideo> = ({
    media,
    poster,
    className,
    controls = true,
    autoPlay = false,
}) => {
    const fullVideoUrl = getStrapiMedia(media.url);
    const fullPosterUrl = getStrapiMedia(poster?.url);

    return (
        <video
            className={className}
            //@ts-ignore
            poster={fullPosterUrl}
            controls={controls}
            autoPlay={autoPlay}
        >
            <source
            //@ts-ignore
            src={fullVideoUrl}
            type={media.mime} />
        </video>
    );
};

export default Video;
