import { UserSession } from "@/types/api/createSessionsRequest";
import { cookies as nextCookies } from 'next/headers';

export const login = async (formData: FormData) => {
    'use server'
    const getDefaultQuizId = async (): Promise<number> => {
        /**
         * TODO: get default quiz id from WP API
         * 1. [ ] create options page in WP that allows admin to set default quiz id
         * 2. [ ] fetch default quiz id from WP API
         * 3. [ ] return default quiz id
         */

        /**
         * TEMPORARY: return default quiz id
         * for now, just return the default quiz id (223)
         * this will be replaced with the code above
         */
        return 223
    }

    const fullname = formData.get("fullname");
    const email = formData.get("email");
    const quizId = await getDefaultQuizId();

    const localUrl = process.env.NEXT_PUBLIC_BASE_URL as string;
    const url = new URL(localUrl);
    url.pathname = '/api/sessions/create';

    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            name: fullname,
            email: email,
            quizId: quizId
        }),
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json'
        }
    })

    try {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: UserSession = await response.json()
        const { user: { user_name, user_email }, quiz_id, session_id, session_uuid } = data

        if (user_name && user_email && quiz_id && session_id && session_uuid) {
            const cookies = nextCookies()
            cookies.set('session', JSON.stringify(data), {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
            })

        }
    } catch (error) {
        console.error(error)
    }
};