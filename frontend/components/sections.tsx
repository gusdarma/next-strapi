import { useRouter } from "next/router";
import Hero from "./sections/hero";
import LargeVideo from "./sections/large-video";
import FeatureColumnsGroup from "./sections/feature-columns-group";
import FeatureRowsGroup from "./sections/feature-rows-group";
import BottomActions from "./sections/bottom-actions";
import TestimonialsGroup from "./sections/testimonials-group";
import RichText from "./sections/rich-text";
import Pricing from "./sections/pricing";
import LeadForm from "./sections/lead-form";
import Embed from "./sections/embed-video";
import ModalContent from "./sections/modal-content";
import SliderText from "./sections/slider-text";

// Map Strapi sections to section components
const sectionComponents: any = {
    "sections.hero": Hero,
    "sections.large-video": LargeVideo,
    "sections.feature-columns-group": FeatureColumnsGroup,
    "sections.feature-rows-group": FeatureRowsGroup,
    "sections.bottom-actions": BottomActions,
    "sections.testimonials-group": TestimonialsGroup,
    "sections.rich-text": RichText,
    "sections.pricing": Pricing,
    "sections.lead-form": LeadForm,
    "sections.embed-video": Embed,
    "sections.modal-content": ModalContent,
    "sections.slider-text": SliderText,
};

interface typesSection{
    sectionData: {
        __component: string;
    }
    plaiceholder: any;
}
interface typesSections{
    sections:(string | number)[];
    preview?: boolean;
    imageProps?:(string | number)[];
}

// Display a section individually
const Section: React.FC<typesSection> = ({ sectionData, plaiceholder }) => {


    // Prepare the component
    const SectionComponent = sectionComponents[sectionData.__component];

    if (!SectionComponent) {
        return null;
    }

    // Display the section
    return <SectionComponent data={sectionData} image={plaiceholder} />;
};

const PreviewModeBanner = () => {
    const router = useRouter();
    const exitURL = `/api/exit-preview?redirect=${encodeURIComponent(
        router.asPath,
    )}`;

    return (
        <div className="py-4 font-semibold tracking-wide text-red-100 uppercase bg-red-600">
            <div className="container">
                Preview mode is on.{" "}
                <a
                    className="underline"
                    href={`/api/exit-preview?redirect=${router.asPath}`}
                >
                    Turn off
                </a>
            </div>
        </div>
    );
};

// Display the list of sections
const Sections: React.FC<typesSections> = ({ sections, preview, imageProps }) => {
    console.log(imageProps, "ini di sections propsnya");
    return (
        <div className="flex flex-col">
            {/* Show a banner if preview mode is on */}
            {preview && <PreviewModeBanner />}
            {/* Show the actual sections */}
            {sections.map((section: any) => (
                <Section
                    sectionData={section}
                    key={`${section.__component}${section.id}`}
                    plaiceholder={imageProps}
                />
            ))}
        </div>
    );
};

export default Sections;
