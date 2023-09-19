// global request

export const wpApi = async (endpoint: string, config?: RequestInit) => {
    const request = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${endpoint}`, config);
    
    if (request.status >= 400) {
        throw new Error("Failed to fetch API");
    }
    return await request.json();
}