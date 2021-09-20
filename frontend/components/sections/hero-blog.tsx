import ButtonLink from "../elements/button-link";
import { getButtonAppearance } from "utils/button";

interface typesHeroBlog{
    data: {
        Title: string;
        Description: string[];
    }
}

const HeroBlog: React.FC<typesHeroBlog> = ({ data }) => {

    console.log(data, "blog data")

    return (
        <section className="py-20 text-center">
            <h2 className="mb-10 title">{data.Title}</h2>
            {/* Buttons row */}
            <div className="container flex flex-row flex-wrap justify-center gap-4">
                <p className="">{data.Description}</p>
            </div>
        </section>
    );
};

export default HeroBlog;
