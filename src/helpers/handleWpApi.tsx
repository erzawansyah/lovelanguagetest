// global request

export const wpApi = async (endpoint: string, config?: RequestInit) => {
    const username: string = process.env.WP_USERNAME as string;
    const token: string = process.env.WP_TOKEN as string;
    const route = process.env.NEXT_PUBLIC_API_URL as string;
    const url = `${route}/${endpoint}`

    const headers = {
        "Content-Type": "application/json",
        "Authorization": "Basic " + Buffer.from(`${username}:${token}`).toString("base64"),
    }

    const request = await fetch(url.toString(), {
        ...config,
        headers: {
            ...config?.headers,
            ...headers,
        },
    });

    if (request.status >= 400) {
        throw new Error(`Error fetch api: ${request.status}. Message: ${request.statusText}`);
    }
    return await request.json();
}