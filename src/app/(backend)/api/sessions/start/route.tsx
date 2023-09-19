import { UserInitialData, UserSession, WpCreateSessionRequestBody } from "@/types/api/createSessionsRequest";
import { WpSessionPostTypeResponse } from "@/types/wpSessionsPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest): Promise<NextResponse<UserSession>> {
    const data: UserInitialData = await request.json()
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
    return NextResponse.json(session)
}