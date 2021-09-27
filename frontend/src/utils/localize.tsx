import { fetchAPI } from "./api";

export async function getLocalizedPage(targetLocale: string, pageContext: { locale?: string | undefined; localizedPaths?: any; localizations?: any; }) {
    const localization = pageContext.localizations.find(
        (localization: { locale: string; }) => localization.locale === targetLocale,
    );
    const localePage = await fetchAPI(`/pages/${localization.id}`);
    return localePage;
}

export function localizePath(page: any) {
    const { locale, defaultLocale, slug } = page;

    if (locale === defaultLocale) {
        // The default locale is not prefixed
        return `/${slug}`;
    }

    // The slug should have a localePrefix
    return `/${locale}/${slug}`;
}

export function getLocalizedPaths(page: { locale?: any; locales: any; defaultLocale?: any; slug?: any; localizations?: any; }) {
    const paths = page.locales.map((locale: any) => {
        return {
            locale: locale,
            href: localizePath({ ...page, locale }),
        };
    });

    return paths;
}
