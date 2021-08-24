export function getStrapiURL(path: string) {
    return `${
        process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337"
    }${path}`;
}

// Helper to make GET requests to Strapi
export async function fetchAPI(path: string , options = {}) {
    const defaultOptions = {
        headers: {
            "Content-Type": "application/json",
        },
    };
    const mergedOptions = {
        ...defaultOptions,
        ...options,
    };
    const requestUrl = getStrapiURL(path);
    const response = await fetch(requestUrl, mergedOptions);

    // console.log(response, "ini response nya");

    if (!response.ok) {
        console.error(response.statusText);
        // throw `An error occured please try again`;
        return;
    }
    const data = await response.json();
    return data;
}

/**
 *
 * @param {object} params The router params object with slug: { slug: [<slug>] }
 * @param {string} locale The current locale specified in router.locale
 * @param {boolean} preview router isPreview value
 */
export async function getPageData(params: { slug: any; }, locale: any, preview: any) {

    console.log(params.slug, 'ini di api');

    const slug = params.slug.join("/");
    // Find the pages that match this slug
    const pagesData = await fetchAPI(
        `/pages?slug=${slug}&_locale=${locale}&status=published${
            preview ? "&status=draft" : ""
        }`,
    );

    // Make sure we found something, otherwise return null
    if (pagesData == null || pagesData.length === 0) {
        return null;
    }

    // Return the first item since there should only be one result per slug
    return pagesData[0];
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale: string) {
    // const global = await fetchAPI(`/global?_locale=en`);
    const global = await fetchAPI(`/global?_locale=${locale}`);
    return global;
}
