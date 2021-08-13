import classNames from "classnames";
import { useState } from "react";
import NextImage from "../elements/image";
import CustomLink from "../elements/custom-link";

interface typesTestimonialGroup{
    data: {
        title: string;
        description: string;
        testimonials: any;
        logos: (string | number)[];
        link: {
            text: string;
            url: string;
            newTab: boolean;
        }
    }
}

const TestimonialsGroup: React.FC<typesTestimonialGroup> = ({ data }) => {
    // Only show one testimonial at a time
    const [selectedTestimonialIndex, setSelectedTestimonialIndex] = useState(0);
    const selectedTestimonial = data.testimonials[selectedTestimonialIndex];

    return (
        <section className="pt-12 pb-16 text-lg text-center bg-gray-200">
            <h2 className="mb-4 title">{data.title}</h2>
            <p className="mb-4 text-gray-700">{data.description}</p>
            <CustomLink link={data.link}>
                <span className="text-blue-700 with-arrow hover:underline">
                    {data.link.text}
                </span>
            </CustomLink>
            {/* Current testimonial card */}
            <div className="flex flex-col w-8/12 max-w-5xl mx-auto mt-10 text-left bg-white shadow-md sm:w-8/12 sm:shadow-xl sm:flex-row">
                <div className="flex-shrink-0 w-full md:w-4/12">
                    <NextImage media={selectedTestimonial.picture} />
                </div>
                <div className="flex flex-col justify-between px-4 py-4 sm:px-12 sm:pt-12 sm:pb-4">
                    <div>
                        <NextImage
                            width="120"
                            height="33"
                            media={selectedTestimonial.logo}
                        />
                        <p className="mb-6 italic">
                            &quot;{selectedTestimonial.text}&quot;
                        </p>
                        <p className="text-base font-bold sm:text-sm">
                            {selectedTestimonial.authorName}
                        </p>
                        <p className="text-base sm:text-sm">
                            {selectedTestimonial.authorTitle}
                        </p>
                    </div>
                    <CustomLink
                        link={{
                            url: selectedTestimonial.link,
                            newTab: false,
                        }}
                    >
                        <span className="mt-6 tracking-wide text-blue-700 uppercase hover:underline with-arrow sm:self-end sm:mt-0">
                            Read story
                        </span>
                    </CustomLink>
                </div>
            </div>
            {/* Change selected testimonial (only if there is more than one) */}
            {data.testimonials.length > 1 && (
                <div className="flex flex-row justify-center gap-4 mt-10">
                    {data.testimonials.map((testimonial: any, index:number) => (
                        <button
                            onClick={() => setSelectedTestimonialIndex(index)}
                            className={classNames(
                                // Common classes
                                "rounded-full h-3 w-3",
                                {
                                    "bg-gray-500":
                                        index !== selectedTestimonialIndex,
                                    "bg-primary-600":
                                        index === selectedTestimonialIndex,
                                },
                            )}
                            key={testimonial.id}
                        />
                    ))}
                </div>
            )}
            {/* Logos list */}
            <div className="flex flex-row flex-wrap items-center justify-center gap-6 px-6 mt-10 sm:gap-20 sm:px-0 ">
                {data.logos.map((logo: any) => (
                    <NextImage
                        key={logo.id}
                        width="120"
                        height="33"
                        media={logo.logo}
                    />
                ))}
            </div>
        </section>
    );
};

export default TestimonialsGroup;
