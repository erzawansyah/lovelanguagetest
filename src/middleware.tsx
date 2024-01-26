import { NextResponse, NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
    // Active only on homepage
    if (request.nextUrl.pathname === '/') {
        const next = NextResponse.next();

        // check session in request cookies
        const cookies = request.cookies
        const hasSession = cookies.has('session');

        // if there is session, return next
        if (hasSession) return next

        // if there is no session, check if there is query params
        const queryParams = request.nextUrl.searchParams;
        const hasQueryParams = queryParams.has('quiz_id') && queryParams.has('name') && queryParams.has('email');

        // if there is query params, create session
        if (hasQueryParams) {
            const hostname = request.nextUrl.hostname
            const protocol = request.nextUrl.protocol;
            const port = request.nextUrl.port || '80';
            const endpoint = '/api/sessions/create'
            const url = `${protocol}//${hostname}:${port}${endpoint}`

            const session = await fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    name: queryParams.get('name') || '',
                    email: queryParams.get('email') || '',
                    quizId: queryParams.get('quiz_id')
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => {
                if (res.status >= 400) {
                    throw new Error(`Error fetch api: ${res.status}. Message: ${res.statusText}`);
                }
                return res.json()
            }).catch(err => {
                throw new Error(err)
            })

            try {
                if (!session) {
                    throw new Error("Failed to create session")
                }
                next.cookies.set('session', JSON.stringify(session), {
                    path: '/',
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7,
                    sameSite: 'strict',
                });

                return next
            } catch (error) {
                console.error(error)
                throw new Error("Failed to create session")
            }
        }

        // if there is no query params, redirect to login 
        return next
    }

    // If in result page, check if there is session
    if (request.nextUrl.pathname === '/quizzes/result') {
        // remove session
        const cookies = request.cookies
        const hasSession = cookies.has('session');
        const response = NextResponse.next();
        if (hasSession) {
            response.cookies.delete('session');
        }
        return NextResponse.next();
    }

    return NextResponse.next();
}