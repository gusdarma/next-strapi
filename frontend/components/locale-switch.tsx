import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import Cookies from "js-cookie";
import { MdExpandMore } from "react-icons/md";
import WorldIcon from "./icons/world";

import { useOnClickOutside } from "../utils/hooks";
import { getLocalizedPage, localizePath } from "utils/localize";
import { string } from "yup/lib/locale";

interface typesLocaleSwitch{
    pageContext:{
        locale?: string;
        localizedPaths: any;
    };
}

const LocaleSwitch: React.FC<typesLocaleSwitch> = ({ pageContext }) => {

    const isMounted = useRef(false);
    const select = useRef();
    const router = useRouter();
    const [locale, setLocale] = useState();
    const [showing, setShowing] = useState(false);

    const handleLocaleChange = async (selectedLocale: any) => {
        // Persist the user's language preference
        // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
        Cookies.set("NEXT_LOCALE", selectedLocale);
        setLocale(selectedLocale);
    };

    const handleLocaleChangeRef = useRef(handleLocaleChange);
    useOnClickOutside(select, () => setShowing(false));

    useEffect(() => {
        const localeCookie = Cookies.get("NEXT_LOCALE");
        if (!localeCookie) {
            handleLocaleChangeRef.current(router.locale);
        }

        const checkLocaleMismatch = async () => {
            if (
                !isMounted.current &&
                localeCookie &&
                localeCookie !== pageContext.locale
            ) {
                // Redirect to locale page if locale mismatch
                const localePage = getLocalizedPage(localeCookie, pageContext);

                router.push(
                    `${localizePath({ ...pageContext, ...localePage })}`,
                    `${localizePath({ ...pageContext, ...localePage })}`,
                    //@ts-ignore
                    { locale: localePage.locale },
                );
            }
            setShowing(false);
        };

        //@ts-ignore
        setLocale(localeCookie || router.locale);
        checkLocaleMismatch();

        return () => {
            isMounted.current = true;
        };
    }, [locale, router, pageContext]);

    console.log(select, 'ini refnya');

    return (
        //@ts-ignore
        <div ref={select} className="relative ml-4 ">
            <button
                type="button"
                className="flex items-center justify-between w-20 h-full px-2 py-2 rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-600 focus:bg-primary-50 focus:text-primary-600 focus:outline-none"
                onClick={() => setShowing(!showing)}
            >
                <WorldIcon />
                <span className="capitalize">{locale}</span>
                <MdExpandMore className="ml-1 text-primary-600" />
            </button>
            <div
                className={`w-full bg-white p-1 mt-1 shadow-lg rounded-md ${
                    showing ? "absolute" : "hidden"
                }`}
            >
                {pageContext.localizedPaths &&
                    pageContext.localizedPaths.map(({ href, locale}: any) => {
                        return (
                            <Link
                                href={href}
                                key={locale}
                                locale={locale}
                                passHref
                            >
                                <p
                                    onClick={() => handleLocaleChange(locale)}
                                    className="p-2 text-center capitalize rounded-md cursor-pointer hover:bg-primary-50 hover:text-primary-600"
                                >
                                    {locale}
                                </p>
                            </Link>
                        );
                    })}
            </div>
        </div>
    );
};


export default LocaleSwitch;
