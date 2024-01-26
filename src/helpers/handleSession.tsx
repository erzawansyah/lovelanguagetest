import { cookies as nextCookies } from "next/headers";

export const getSessionCookie: (key: string) => any | undefined = (key) => {
    const cookies = nextCookies()
    const session = cookies.has(key) ? cookies.get(key) : undefined
    return session ? JSON.parse(session.value) : undefined
}