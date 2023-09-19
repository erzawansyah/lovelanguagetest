import { NextResponse, NextRequest } from 'next/server';
import { initSession } from './app/(helper)/handleSession';

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

            // create session
            return await initSession({
                user_name: queryParams.get('name') || '',
                user_email: queryParams.get('email') || '',
                quiz_id: Number(queryParams.get('quiz_id') || '0'),
            }).then((session) => {
                response.cookies.set('session', JSON.stringify(session), {
                    path: '/',
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'strict',
                });
                return response;
            })
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

