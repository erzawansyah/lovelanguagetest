import { cookies as nextCookies } from "next/headers";
import { UserInitialData, UserSession } from "../../types/api/createSessionsRequest"
import { v4 as uuidv4 } from 'uuid';

export const initSession: (data: Omit<Omit<UserInitialData, 'uuid'>, 'start_date'>) => Promise<UserSession> = async (data) => {
    return await fetch('http://localhost:3000/api/sessions/start', {
        method: 'POST',
        body: JSON.stringify({
            ...data,
            uuid: uuidv4(),
            start_date: Date.now().toString(),
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(res => res.json())
}

export const getSessionCookie: (key: string) => any | undefined = (key) => {
    const cookies = nextCookies()
    const session = cookies.has(key) ? cookies.get(key) : undefined
    return session ? JSON.parse(session.value) : undefined
}