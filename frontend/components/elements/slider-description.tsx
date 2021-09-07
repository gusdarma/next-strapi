import Markdown from "react-markdown";
import classNames from "classnames";
import { MdClose } from "react-icons/md";

interface typesSliderDescription {
    data: {
        description: string;
    }
}

const SliderDescription : React.FC<typesSliderDescription> = ({data}) => {
    return (
        <div className="">
            <p className="">{data.description}</p>
        </div>
    );
};

export default SliderDescription;
