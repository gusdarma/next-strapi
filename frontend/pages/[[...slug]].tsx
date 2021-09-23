import ErrorPage from "next/error";
import { getPageData, fetchAPI, getGlobalData, getData, getSubByArchive, getMenus } from "utils/api";
import Sections from "../components/sections";
import Seo from "../components/elements/seo";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { getLocalizedPaths } from "utils/localize";

// Plaiceholder
import * as React from "react";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

// export const getStaticPropss = async () => {
// 	const { base64, img } = await getPlaiceholder("/example.jpg");

// 	return {
// 		props: {
// 			imageProps: {
// 				...img,
// 				blurDataURL: base64,
// 			},
// 		},
// 	};
// };




// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({ sections, metadata, preview, global, pageContext, imageProps, menus } : any) => {
    const router = useRouter();

    // Check if the required data was provided
    if (!router.isFallback && !sections?.length) {
        return <ErrorPage statusCode={404} />;
    }

    // Loading screen (only possible in preview mode)
    if (router.isFallback) {
        return <div className="container">Loading...</div>;
    }

    return (
        <Layout global={global} pageContext={pageContext} menus={menus}>
            {/* Add meta tags for SEO*/}
            <Seo metadata={metadata} />
            {/* Display content sections */}
            <Sections sections={sections} preview={preview} imageProps={imageProps}/>
        </Layout>
    );
};

export async function getStaticPaths(context: { locales: any[]; }) {
    // Get all pages from Strapi
    // const allPages = context.locales.map(async (locale) => {
    //     const localePages = await fetchAPI(`/pages?_locale=${locale}`);
    //     return localePages;
    // });

    const allPages = context.locales.map(async (locale) => {
        const localePages = await fetchAPI(`/pages?_locale=${locale}`);
        return localePages;
    });

    const pages = await (await Promise.all(allPages)).flat();

    const paths = pages.map((page) => {
        // Decompose the slug that was saved in Strapi
        const slugArray = !page.slug ? false : page.slug.split("/");

        return {
            params: { slug: slugArray },
            // Specify the locale to render
            locale: page.locale,
        };
    });

    await Promise.all(pages.map(async (page) => {
        if (!page.isArchive) return;
        const dataSlugDetailArchive = await getSubByArchive(page.slug);

        dataSlugDetailArchive.map((slug: any) => {
            console.log(slug);
            console.log(({
                params: { slug: [`${page.slug}`, slug] },
                // Specify the locale to render
                locale: page.locale,
            }));

            paths.push(({
                params: { slug: [`${page.slug}`, slug] },
                // Specify the locale to render
                locale: page.locale,
            }));
        });
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context: { params: any; locale: any; locales: any; defaultLocale: any; preview?: null | undefined; }) {
    const { params, locale, locales, defaultLocale, preview = null } = context;

    const { base64, img } = await getPlaiceholder("/example.jpg");

    console.log(img, '======img');
    console.log(params, '======params');

    await getData(params, locale);

    const globalLocale = await getGlobalData(locale);
    // Fetch pages. Include drafts if preview mode is on
    const pageData = await getData(params, locale);
    // console.log(pageData);
    const menus = await getMenus(locale);


    if (pageData == null) {
        // Giving the page no props will trigger a 404 page
        return { props: {} };
    }

    // We have the required page data, pass it to the page component
    const { contentSections, localizations, slug } = pageData;

    const pageContext = {
        locale: pageData.locale,
        locales,
        defaultLocale,
        slug,
        localizations,
    };

    const metadata = {
        metaTitle : pageData.metaTitle,
        metaDescription : pageData.metaDescription,
        shareImage : pageData.shareImage,
    }

    const localizedPaths = getLocalizedPaths(pageContext);

    return {
        props: {
            imageProps: {
				...img,
				blurDataURL: base64,
            },
            menus,
            preview,
            sections: contentSections,
            metadata,
            global: globalLocale,
            pageContext: {
                ...pageContext,
                localizedPaths,
            },
        },
    };
}

export default DynamicPage;
