import { getPlaiceholder } from "plaiceholder";

const yuhuAsik = async (url: string) => {
    const { base64, img } = await getPlaiceholder(url);
    const sharp = require('sharp');

  return {
      props: {
      imageProps: {
          ...img,
          blurDataURL: base64,
      },
      },
  };
  };
export default yuhuAsik;
