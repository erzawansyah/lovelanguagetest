export const handleLocalFetch = (path: string, config?: RequestInit) => {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    const url = new URL(baseUrl);
    url.pathname = path;
    return fetch(url.toString(), config);
};