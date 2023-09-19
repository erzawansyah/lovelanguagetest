import { CreateAnswersResponseBody } from "@/app/(backend)/api/answers/route";
import { QuizStateInterface, SubmitUserAnswerInterface } from "../../_definition";
import { WpUpdateSessionRequestBody } from "@/types/api/createSessionsRequest";

export type HandleFinishQuizProps = {
    status: QuizStateInterface['status'];
    session: WpUpdateSessionRequestBody;
    answers: SubmitUserAnswerInterface[];
};

export const handleFinishQuiz = async (props: HandleFinishQuizProps) => {
    const { status, session, answers } = props;

    const handleUpdateSession = async () => {
        return await fetch(`/api/sessions/update`, {
            method: 'PUT',
            body: JSON.stringify(session),
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            }
        }).then(r => r.json())
    }

    const handleSubmitAnswer = async () => {
        return await fetch('/api/answers', {
            method: 'POST',
            body: JSON.stringify(answers),
            headers: {
                'Content-Type': 'application/json',
                'credentials': 'include'
            }
        }).then(r => r.json())
    }

    return handleUpdateSession().then(() => {
        if (status !== "finished") {
            return handleSubmitAnswer().then((ans: CreateAnswersResponseBody) => {
                return ans
            })
        }
    })
};
