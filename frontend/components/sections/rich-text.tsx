import PropTypes from "prop-types";
import Markdown from "react-markdown";

interface typesRichText{
    data: {
        content: string;
    }
}

const RichText: React.FC<typesRichText> = ({ data }) => {
    return (
        <div className="container py-12 prose prose-lg">
            <Markdown>{data.content}</Markdown>
        </div>
    );
};

export default RichText;
