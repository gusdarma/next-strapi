import PropTypes from "prop-types";
import { linkPropTypes, mediaPropTypes } from "utils/types";
import NextImage from "./image";
import CustomLink from "./custom-link";

const Footer = ({ footer }) => {
    return (
        <footer className="pt-12 bg-gray-100">
            <div className="container flex flex-col lg:flex-row lg:justify-between">
                <div>
                    {footer.logo && (
                        <NextImage
                            width="120"
                            height="33"
                            media={footer.logo}
                        />
                    )}
                </div>
                <nav className="flex flex-row flex-wrap items-start mb-10 lg:gap-20 lg:justify-end">
                    {footer.columns.map((footerColumn) => (
                        <div
                            key={footerColumn.id}
                            className="w-6/12 mt-10 lg:mt-0 lg:w-auto"
                        >
                            <p className="font-semibold tracking-wide uppercase">
                                {footerColumn.title}
                            </p>
                            <ul className="mt-2">
                                {footerColumn.links.map((link) => (
                                    <li
                                        key={link.id}
                                        className="px-1 py-1 -mx-1 text-gray-700 hover:text-gray-900"
                                    >
                                        <CustomLink link={link}>
                                            {link.text}
                                        </CustomLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </div>
            <div className="py-6 text-sm text-gray-700 bg-gray-200">
                <div className="container">{footer.smallText}</div>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    footer: PropTypes.shape({
        logo: mediaPropTypes.isRequired,
        columns: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                title: PropTypes.string.isRequired,
                links: PropTypes.arrayOf(linkPropTypes),
            }),
        ),
        smallText: PropTypes.string.isRequired,
    }),
};

export default Footer;
