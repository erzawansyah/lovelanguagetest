import { wpApi } from "@/app/(helper)/handleWpApi";
import { UserSession, WpUpdateSessionRequestBody } from "@/types/api/createSessionsRequest";
import { WpSessionPostTypeResponse } from "@/types/wpSessionsPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest): Promise<NextResponse<UpdateSessionsResponseBody>> {
    const data: WpUpdateSessionRequestBody = await request.json()
    const username: string = process.env.WP_USERNAME || "";
    const token: string = process.env.WP_TOKEN || "";

    const cookies = request.cookies
    const session: UserSession = JSON.parse(cookies.get("session")?.value || "{}")


    const wpResponse: Promise<WpSessionPostTypeResponse> = await wpApi(`quiz_sessions/${session.session_id}`, {
        method: "PUT",
        body: JSON.stringify({
            acf: {
                user_name: session.user.user_name,
                user_email: session.user.user_email,
                quiz_id: session.quiz_id,
                start_date: data.start_date,
                finish_date: data.finish_date,
                duration: data.duration,
                user_os: data.user_os,
                user_browser: data.user_browser,
                user_agent: data.user_agent
            }
        }),
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Basic ${Buffer.from(`${username}:${token}`).toString("base64")}`
        }
    })

    return NextResponse.json({
        session: {
            session_id: session.session_id,
            session_uuid: session.session_uuid
        },
        body: {
            user_name: (await wpResponse).acf.user_name,
            user_email: (await wpResponse).acf.user_email,
            quiz_id: (await wpResponse).acf.quiz_id,
            start_date: (parseInt((await wpResponse).acf.start_date) / 1000).toFixed().toString(),
            finish_date: (parseInt((await wpResponse).acf.finish_date) / 1000).toFixed().toString(),
            duration: (await wpResponse).acf.duration,
            user_os: (await wpResponse).acf.user_os,
            user_browser: (await wpResponse).acf.user_browser,
            user_agent: (await wpResponse).acf.user_agent
        }
    })
}

export interface UpdateSessionsResponseBody {
    session: {
        session_id: number,
        session_uuid: string
    },
    body: {
        user_name?: string,
        user_email?: string,
        quiz_id: number,
        start_date: string,
        finish_date: string,
        duration: number,
        user_os?: string,
        user_browser?: string,
        user_agent?: string
    }
}