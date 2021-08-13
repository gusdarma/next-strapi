import NextImage from "./image";
import CustomLink from "./custom-link";

interface typesFooter {
    footer: {
        logo: {
            url: string;
            alternativeText: string;
            width: number;
            height: number;
        };
        smallText: string;
        columns: (string | number)[];
    }
};

const Footer: React.FC<typesFooter> = ({ footer }) => {
    return (
        <footer className="pt-12 bg-gray-100">
            <div className="container flex flex-col lg:flex-row lg:justify-between">
                <div>
                    {footer.logo && (
                        <NextImage
                            width={120}
                            height={33}
                            media={footer.logo}
                        />
                    )}
                </div>
                <nav className="flex flex-row flex-wrap items-start mb-10 lg:gap-20 lg:justify-end">
                    {footer.columns.map((footerColumn : any) => (
                        <div
                            key={footerColumn.id}
                            className="w-6/12 mt-10 lg:mt-0 lg:w-auto"
                        >
                            <p className="font-semibold tracking-wide uppercase">
                                {footerColumn.title}
                            </p>
                            <ul className="mt-2">
                                {footerColumn.links.map((link : any) => (
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


export default Footer;
