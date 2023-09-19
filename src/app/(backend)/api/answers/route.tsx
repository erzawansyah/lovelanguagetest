import { SubmitUserAnswerInterface } from "@/app/(frontend)/(subpages)/quizzes/[slug]/_definition";
import { generateInitials } from "@/app/(helper)/handleName";
import { wpApi } from "@/app/(helper)/handleWpApi";
import { UserSession } from "@/types/api/createSessionsRequest";
import { WpAnswersPostTypeResponse } from "@/types/wpAnswersPostTypeResponse";
import { WpSessionPostTypeResponse } from "@/types/wpSessionsPostTypeResponse";
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
        question_id: number,
        question_number: number,
        answer_value: number | string,
        answer_label?: string
    }
}

interface WpBulkCreateAnswerRequestBody {
    requests: {
        method: 'POST' | 'PUT',
        path: '/wp/v2/user_answers',
        body: WpCreateAnswerRequestBody
    }[]
}

interface WpBulkItemCreateAnswerResponseBody {
    body: WpAnswersPostTypeResponse,
    status: number;
    headers: any
}

interface WpBulkCreateAnswerResponseBody {
    responses: WpBulkItemCreateAnswerResponseBody[]
}

export interface CreateAnswersResponseBody {
    session_id: number,
    user_data: {
        user_name: string,
        user_email: string,
        quiz_id: number,
    },
    answers: {
        id: number,
        question_id: number,
        answer_value: number | string,
        answer_label?: string
    }[]
}

export async function POST(request: NextRequest): Promise<NextResponse<CreateAnswersResponseBody>> {
    const data: SubmitUserAnswerInterface[] = await request.json()
    const username: string = process.env.WP_USERNAME || "";
    const token: string = process.env.WP_TOKEN || "";
    const cookies = request.cookies.get('session')?.value || '{}';
    const session: UserSession = JSON.parse(cookies);
    const maxRequest = 20;

    const sessionId: number = session.session_id;
    const user_name: string = session.user.user_name
    const user_email: string = session.user.user_email
    const quiz_id: number = session.quiz_id;
    const initial_name = generateInitials(user_name);
    const rawAnswers = data;

    const answers: WpCreateAnswerRequestBody[] = rawAnswers.map((item) => {
        return {
            title: `[${item.question_number}]${initial_name}-${sessionId}|${quiz_id}-${item.question_id}`,
            status: 'publish',
            acf: {
                session_id: sessionId,
                question_id: item.question_id,
                question_number: item.question_number,
                answer_value: item.answer_value,
                answer_label: item.answer_label
            }
        }
    })
    const chunkedAnswers: WpCreateAnswerRequestBody[][] = splitArrayIntoChunks(answers, maxRequest);
    const prepareData: WpBulkCreateAnswerRequestBody[] = chunkedAnswers.map((item) => {
        return {
            requests: item.map((answer) => {
                return {
                    method: 'POST',
                    path: '/wp/v2/user_answers',
                    body: answer
                }
            })
        }
    })

    const prepareRequest = prepareData.map((item: WpBulkCreateAnswerRequestBody) => {
        return fetch(`${process.env.NEXT_PUBLIC_WP_URL}/wp-json/batch/v1`, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Buffer.from(`${username}:${token}`).toString('base64')
            }
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`Request gagal untuk ${res.status}`);
            }
            return res.json();
        })
    })

    const wpRequests: Promise<void | WpAnswersPostTypeResponse[]> = Promise.all(prepareRequest).then((res) => {
        const result: WpAnswersPostTypeResponse[] = res
            .map((item: WpBulkCreateAnswerResponseBody) => item.responses)
            .map((item) => {
                return item.map((item) => {
                    return item.body
                })
            }).flat()
        return result
    })

    const createdAnswers = await wpRequests.then((res) => {
        const result = res?.map((item) => {
            return {
                id: item.id,
                question_id: item.acf.question_id,
                answer_value: item.acf.answer_value,
                answer_label: item.acf.answer_label
            }
        })
        return result
    })

    return NextResponse.json({
        session_id: sessionId,
        user_data: {
            user_name: user_name,
            user_email: user_email,
            quiz_id: quiz_id,
        },
        answers: await createdAnswers || []
    })
}

function splitArrayIntoChunks(arr: any[], chunkSize: number): any[][] {
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize));
    }
    return result;
}