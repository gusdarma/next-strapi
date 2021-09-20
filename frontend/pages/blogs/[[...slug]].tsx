import ErrorPage from "next/error";
import { getPageData, fetchAPI, getGlobalData } from "utils/api";
import Sections from "../../components/sections";
import Seo from "../../components/elements/seo";
import { useRouter } from "next/router";
import Layout from "../../components/layout";
import { getLocalizedPaths } from "utils/localize";

// Plaiceholder
import * as React from "react";
import type { InferGetStaticPropsType } from "next";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";


// The file is called [[...slug]].js because we're using Next's
// optional catch all routes feature. See the related docs:
// https://nextjs.org/docs/routing/dynamic-routes#optional-catch-all-routes

const DynamicPage = ({ sections, metadata, preview, global, pageContext } : any) => {
    const router = useRouter();

    // Check if the required data was provided
    if (!router.isFallback && !sections?.length) {
        return <ErrorPage statusCode={404} />;
    }

    // Loading screen (only possible in preview mode)
    if (router.isFallback) {
        return <div className="container">Loading...</div>;
    }

    console.log(sections, 'ini sectionsnya');

    return (
        <Layout global={global} pageContext={pageContext}>
            {/* Add meta tags for SEO*/}
            {/* <Seo metadata={metadata} /> */}
            {/* Display content sections */}
            <Sections sections={sections} preview={preview}/>
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
        const localePages = await fetchAPI(`/blogs?_locale=${locale}`);
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

    return { paths, fallback: true };
}






export async function getStaticProps(context: { params: any; locale: any; locales: any; defaultLocale: any; preview?: null | undefined; }) {
    const { params, locale, locales, defaultLocale, preview = null } = context;

    const { base64, img } = await getPlaiceholder("/example.jpg");

    console.log(img, '======img');

    var collectionType = 'blogs';

    const globalLocale = await getGlobalData(locale);
    // Fetch pages. Include drafts if preview mode is on
    const pageData = await getPageData(
        { slug: !params.slug ? [""] : params.slug },
        locale,
        preview,
        collectionType,
    );

    if (pageData == null) {
        // Giving the page no props will trigger a 404 page
        console.log('gaada page datanya');
        return { props: {} };
    }

    // We have the required page data, pass it to the page component
    const { contentSections, metadata, localizations, slug } = pageData;

    const pageContext = {
        locale: pageData.locale,
        locales,
        defaultLocale,
        slug,
        localizations,
    };

    const localizedPaths = getLocalizedPaths(pageContext);

    return {
        props: {
            preview,
            sections: contentSections,
            // metadata,
            global: globalLocale,
            pageContext: {
                ...pageContext,
                localizedPaths,
            },
        },
    };
}

export default DynamicPage;
