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

export const getData = async (params: any, locale: any) => {
    if (!params) return 'empty';
    const data = await fetchAPI(createLinkAPI(params.slug, locale));
    return data[0];
}

export const getSubByArchive = async (postType: string) => {
    if (!postType) return;
    console.log(postType);
    return await fetchAPI(`/${postType}`).then(datas => datas.map((data: any) => data.slug));
}

const createLinkAPI = (slugArr: Array<string>, locale: string) => {
    if (!slugArr) return '';

    switch(slugArr.length) {
        case 1: 
            return `/pages?slug=${slugArr.join('/')}&_locale=${locale}`
        case 2:
            return `/${slugArr[0]}?slug=${slugArr[1]}&_locale=${locale}`
        default:
            return ''
    }
}

// Get site data from Strapi (metadata, navbar, footer...)
export async function getGlobalData(locale: string) {
    // const global = await fetchAPI(`/global?_locale=en`);
    const global = await fetchAPI(`/global?_locale=${locale}`);
    return global;
}
