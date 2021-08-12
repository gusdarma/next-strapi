import PropTypes from "prop-types";
import { MdClose, MdChevronRight } from "react-icons/md";
import {
    mediaPropTypes,
    linkPropTypes,
    buttonLinkPropTypes,
} from "utils/types";
import { useLockBodyScroll } from "utils/hooks";
import { getButtonAppearance } from "utils/button";
import ButtonLink from "./button-link";
import NextImage from "./image";
import CustomLink from "./custom-link";

const MobileNavMenu = ({ navbar, closeSelf }) => {
    // Prevent window scroll while mobile nav menu is open
    useLockBodyScroll();

    return (
        <div className="fixed top-0 left-0 z-10 w-screen h-screen pb-6 overflow-y-scroll bg-white">
            <div className="container flex flex-col justify-between h-full">
                {/* Top section */}
                <div className="flex flex-row items-center justify-between py-2">
                    {/* Company logo */}
                    <NextImage width="120" height="33" media={navbar.logo} />
                    {/* Close button */}
                    <button onClick={closeSelf} className="px-1 py-1">
                        <MdClose className="w-auto h-8" />
                    </button>
                </div>
                {/* Bottom section */}
                <div className="flex flex-col justify-end w-9/12 mx-auto">
                    <ul className="flex flex-col items-baseline gap-6 mb-10 text-xl list-none">
                        {navbar.links.map((navLink) => (
                            <li key={navLink.id} className="block w-full">
                                <CustomLink link={navLink}>
                                    <div className="flex flex-row items-center justify-between py-6 hover:text-gray-900">
                                        <span>{navLink.text}</span>
                                        <MdChevronRight className="w-auto h-8" />
                                    </div>
                                </CustomLink>
                            </li>
                        ))}
                    </ul>
                    <ButtonLink
                        button={navbar.button}
                        appearance={getButtonAppearance(
                            navbar.button.type,
                            "light",
                        )}
                    />
                </div>
            </div>
        </div>
    );
};

MobileNavMenu.propTypes = {
    navbar: PropTypes.shape({
        logo: mediaPropTypes,
        links: PropTypes.arrayOf(linkPropTypes),
        button: buttonLinkPropTypes,
    }),
    closeSelf: PropTypes.func,
};

export default MobileNavMenu;
