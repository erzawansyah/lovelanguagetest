import { SubmitUserAnswerInterface } from "@frontend/quizzes/[slug]/_definition";
import { generateInitials } from "@helpers/handleName";
import { wpApi } from "@helpers/handleWpApi";
import { UserSession } from "@/types/api/createSessionsRequest";
import { WpAnswersPostTypeResponse } from "@/types/wpAnswersPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";


export interface BulkCreateAnswersRequestBody {
    session_id: number,
    user_data: {
        user_name: string,
        user_email: string,
        quiz_id: number,
    }
    answers: SubmitUserAnswerInterface[]
}

interface WpCreateAnswerRequestBody {
    title: string;
    status: 'publish';
    acf: {
        session_id: number,
        quiz_id: number,
        answer_value: number | string
    }
}

export interface CreateAnswersResponseBody {
    session_id: number,
    user_data: {
        user_name: string,
        user_email: string,
        quiz_id: number,
    },
    answers: {
        question_number: number,
        question_id: number,
        answer_value: string,
        answer_label?: string
    }[]
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateAnswersResponseBody>> {
    const data: SubmitUserAnswerInterface[] = await request.json()
    const formatedData: string = data.map((item) => {
        return `${item.question_number}|${item.question_id}|${item.answer_value}|${item.answer_label}`
    }).join('\n')


    const username: string = process.env.WP_USERNAME || "";
    const token: string = process.env.WP_TOKEN || "";
    const cookies = request.cookies.get('session')?.value || '{}';
    const session: UserSession = JSON.parse(cookies);

    const sessionId: number = session.session_id;
    const user_name: string = session.user.user_name
    const user_email: string = session.user.user_email
    const quiz_id: number = session.quiz_id;
    const initial_name = generateInitials(user_name);

    const answers: WpCreateAnswerRequestBody = {
        title: `${initial_name}-${sessionId}|${quiz_id}`,
        status: 'publish',
        acf: {
            session_id: sessionId,
            quiz_id: quiz_id,
            answer_value: formatedData
        }
    }

    const wp: WpAnswersPostTypeResponse = await wpApi('user_answers', {
        method: 'POST',
        headers: {
            'Authorization': `Basic ${btoa(`${username}:${token}`)}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(answers)
    })

    const createdAnswers = {
        answer_id: wp.id,
        session_id: wp.acf.session_id,
        quiz_id: wp.acf.quiz_id,
        answers: wp.acf.answer_value.split('\n').map((item) => {
            const [question_number, question_id, answer_value, answer_label] = item.split('|')
            return {
                question_number: Number(question_number),
                question_id: Number(question_id),
                answer_value: answer_value,
                answer_label: answer_label
            }
        })
    }

    return NextResponse.json({
        session_id: sessionId,
        user_data: {
            user_name: user_name,
            user_email: user_email,
            quiz_id: quiz_id,
        },
        answers: createdAnswers.answers
    })
}
