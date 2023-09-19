import { NextResponse, NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { UserInitialData, UserSession, WpCreateSessionRequestBody } from './types/api/createSessionsRequest';
import { WpSessionPostTypeResponse } from './types/wpSessionsPostTypeResponse';


export async function middleware(request: NextRequest) {

    // Active only on homepage
    if (request.nextUrl.pathname === '/') {
        // check session in request cookies
        const cookies = request.cookies
        const hasSession = cookies.has('session');

        // if there is session, return next
        if (hasSession) {
            return NextResponse.next();
        }

        // if there is no session, check if there is query params
        const queryParams = request.nextUrl.searchParams;
        const hasQueryParams = queryParams.has('quiz_id') && queryParams.has('name') && queryParams.has('email');

        // if there is query params, create session
        if (hasQueryParams) {
            const response = NextResponse.next();
            const session: UserSession = await createSession({
                user_name: queryParams.get('name') || '',
                user_email: queryParams.get('email') || '',
                quiz_id: Number(queryParams.get('quiz_id') || '0'),
                uuid: uuidv4(),
                start_date: Date.now().toString(),
            })
            
            response.cookies.set('session', JSON.stringify(session), {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7,
                sameSite: 'strict',
            });
            return response;
        }

        // if there is no query params, throw error
        return NextResponse.next()
    }

    // If in result page, check if there is session
    if (request.nextUrl.pathname === '/quizzes/result') {
        // mark as finished if there is session for 1 days
        const cookies = request.cookies
        const hasSession = cookies.has('session');
        const response = NextResponse.next();
        if (hasSession) {
            response.cookies.set('finished', 'true', {
                path: '/',
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 1,
                sameSite: 'strict',
            });
        }
        return NextResponse.next();
    }


    // if there is no session, throw error
    return NextResponse.next();
}

const createSession = async (data: UserInitialData) => {
    const username: string = process.env.WP_USERNAME || "";
    const token: string = process.env.WP_TOKEN || "";

    const preparedBody: WpCreateSessionRequestBody = {
        title: data.uuid,
        status: 'publish',
        acf: {
            user_name: data.user_name,
            user_email: data.user_email,
            quiz_id: data.quiz_id,
            start_date: data.start_date,
        }
    }

    // create session
    const wpRequest: Response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz_sessions`, {
        method: 'POST',
        body: JSON.stringify(preparedBody),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64')
        }
    })
    const result: WpSessionPostTypeResponse = await wpRequest.json()

    // prepare session data
    const session: UserSession = {
        session_id: result.id,
        session_uuid: result.slug,
        quiz_id: result.acf.quiz_id,
        start_date: result.acf.start_date,
        user: {
            user_name: result.acf.user_name,
            user_email: result.acf.user_email,
        }
    }
    return session
}