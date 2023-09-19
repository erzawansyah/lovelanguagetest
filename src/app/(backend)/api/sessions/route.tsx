import { SubmitUserDataInterface } from "@/app/(frontend)/(subpages)/quizzes/[slug]/_definition";
import { UserInitialData } from "@/types/api/createSessionsRequest";
import { WpSessionPostTypeResponse } from "@/types/wpSessionsPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";


interface CreateSessionsRequestBody {
    title: string;
    status: 'publish';
    acf: {
        user_name?: string,
        user_email?: string,
        quiz_id: number,
        start_date: string,
        finish_date: string,
        duration: number,
        user_os: string,
        user_browser: string,
        user_agent: string
    }
}

interface CreateSessionsResponseBody {
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

export async function POST(request: NextRequest): Promise<NextResponse<CreateSessionsResponseBody>> {
    const data: Promise<UserInitialData> = await request.json()
    const username:string = process.env.WP_USERNAME || "";
    const token:string = process.env.WP_TOKEN || "";

    const prepareData: CreateSessionsRequestBody = {
        title: (await data).uuid,
        status: 'publish',
        acf: {
            user_name: (await data).user_name,
            user_email: (await data).user_email,
            quiz_id: (await data).quiz_id,
            start_date: (await data).start_date!,
            finish_date: (await data).finish_date!,
            duration: (await data).duration!,
            user_os: (await data).user_os!,
            user_browser: (await data).user_browser!,
            user_agent: (await data).user_agent!
        }
    }

    const wpRequest = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quiz_sessions`, {
        method: 'POST',
        body: JSON.stringify(prepareData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64')
        }
    })

    const response: Promise<WpSessionPostTypeResponse> = await wpRequest.json()

    const session = {
        session_id: (await response).id,
        session_uuid: (await response).slug,
    }

    return NextResponse.json({
        session: session,
        body: (await response).acf
    })
}