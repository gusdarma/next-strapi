import classNames from "classnames";
import CustomLink from "./custom-link";

interface typesButtonContent {
    button: {
        text: string;
    };
    appearance: string;
    compact: boolean;
}

interface typesButtonLink {
    button: {
        id: number;
        url: string;
        text: string;
        newTab: boolean;
    };
    appearance: string;
    compact: boolean;
}

const ButtonContent = ({ button, appearance, compact }: typesButtonContent) => {
    return (
        <div
            className={classNames(
                // Common classes
                "block w-full lg:w-auto text-center uppercase tracking-wide font-semibold text-base md:text-sm border-2 rounded-md",
                // Full-size button
                {
                    "px-8 py-4": compact === false,
                },
                // Compact button
                {
                    "px-6 py-2": compact === true,
                },
                // Specific to when the button is fully dark
                {
                    "bg-primary-600 text-white border-primary-600":
                        appearance === "dark",
                },
                // Specific to when the button is dark outlines
                {
                    "text-primary-600 border-primary-600":
                        appearance === "dark-outline",
                },
                // Specific to when the button is fully white
                {
                    "bg-white text-primary-600 border-white":
                        appearance === "white",
                },
                // Specific to when the button is white outlines
                {
                    "text-white border-white": appearance === "white-outline",
                },
            )}
        >
            {button.text}
        </div>
    );
};

const ButtonLink: React.FC<typesButtonLink> = ({
    button,
    appearance,
    compact = false,
}) => {
    return (
        <CustomLink link={button}>
            <ButtonContent
                button={button}
                appearance={appearance}
                compact={compact}
            />
        </CustomLink>
    );
};

export default ButtonLink;
