import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ButtonLink from "./button-link";
import NextImage from "./image";
import CustomLink from "./custom-link";
import LocaleSwitch from "../locale-switch";
import { getButtonAppearance } from "utils/button";
import NotificationBanner from "./notification-banner";



interface typesNavbar {
    navbar :{
        logo: {
            url: string;
            alternativeText: string;
            width: number;
            height: number;
        };
        links: (string | number)[];
        button: {
            id: number;
            url: string;
            text: string;
            newTab: boolean;
            type: string;
        };
    };
    pageContext: {
        localizedPaths: string;
    };
    notificationBanner: {
        text: string;
        type: string;
    };
}

const Navbar : React.FC<typesNavbar> = ({ navbar, pageContext, notificationBanner }) => {
    const router = useRouter();
    const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false);
    const [bannerIsShown, setBannerIsShown] = useState(true);

    return (
        <>
            {/* The actual navbar */}
            <nav className="fixed z-10 w-full py-0 duration-100 delay-100 bg-white border-b-2 border-gray-200">
                {notificationBanner && bannerIsShown && (
                    <NotificationBanner
                        data={notificationBanner}
                        closeSelf={() => setBannerIsShown(false)}
                    />
                )}
                <div className="container flex flex-row items-center justify-between py-4">
                    {/* Content aligned to the left */}
                    <div className="flex flex-row items-center">
                        <Link href="/">
                            <a className="w-32 h-8">
                                <NextImage
                                    width={120}
                                    height={33}
                                    media={navbar.logo}
                                />
                            </a>
                        </Link>
                    </div>
                    <div className="flex">
                        {/* Locale Switch Mobile */}
                        {pageContext.localizedPaths && (
                            <div className="md:hidden">
                                <LocaleSwitch pageContext={pageContext} />
                            </div>
                        )}
                        {/* Hamburger menu on mobile */}
                        <button
                            onClick={() => setMobileMenuIsShown(!mobileMenuIsShown)}
                            className="block p-1 md:hidden"
                        >
                            {/* <MdMenu className="w-auto h-8" /> */}
                            <div className={`hamburger-menu ${mobileMenuIsShown ?'open':''}`}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </button>
                        {/* List of links on desktop */}
                        <ul className="flex-row items-baseline hidden gap-4 ml-10 list-none md:flex">
                            {navbar.links.map((navLink : any) => (
                                <li key={navLink.id}>
                                    <CustomLink
                                        link={navLink}
                                        // locale={router.locale}
                                    >
                                        <div className="p-2 hover:text-gray-900">
                                            {navLink.text}
                                        </div>
                                    </CustomLink>
                                </li>
                            ))}
                        </ul>
                        {/* Locale Switch Desktop */}
                        {pageContext.localizedPaths && (
                            <div className="hidden md:block">
                                <LocaleSwitch pageContext={pageContext} />
                            </div>
                        )}
                        {/* CTA button on desktop */}
                        {navbar.button && (
                            <div className="hidden md:block">
                                <ButtonLink
                                    button={navbar.button}
                                    appearance={getButtonAppearance(
                                        navbar.button.type,
                                        "light",
                                    )}
                                    compact
                                />
                            </div>
                        )}
                    </div>
                </div>
                {mobileMenuIsShown && (
                    <div className="container absolute pt-12 pb-6 duration-1000 delay-1000 bg-white shadow-lg md:hidden">
                        <ul className="flex flex-col items-baseline gap-4 mb-10 text-xl list-none">
                            {navbar.links.map((navLink: any) => (
                                <li key={navLink.id} className="block w-full">
                                    <CustomLink link={navLink}>
                                        <div className="flex flex-row items-center justify-between hover:text-gray-900">
                                            <span>{navLink.text}</span>
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
                            compact
                        />
                    </div>
                )}
            </nav>

            {/* Mobile navigation menu panel */}
            {/* {mobileMenuIsShown && (
                <MobileNavMenu
                    navbar={navbar}
                    closeSelf={() => setMobileMenuIsShown(false)}
                />
            )} */}
        </>
    );
};

export default Navbar;
