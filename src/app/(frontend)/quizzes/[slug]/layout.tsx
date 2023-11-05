import { getSessionCookie } from "@helpers/handleSession";
import { wpApi } from "@helpers/handleWpApi";
import { UserSession } from "@definition/api/createSessionsRequest";
import { WpQuizzesPostTypeResponse } from "@definition/wpQuizzesPostTypeResponse";

import { QuizProvider } from "./_components/QuizContainer/QuizProvider"
import { QuizDataInterface } from "./_definition"
import ProgressBar from "./_components/Utils/ProgressBar";
import QuizNavigator from "./_components/Utils/QuizNavigation";
import { Suspense } from "react";

const QuizzesLayout = async ({ children }: { children: React.ReactNode }) => {
    const session: UserSession = getSessionCookie('session');
    const quizId: number = session.quiz_id;
    const quizData = await prepareQuizData(quizId);
    const user = session.user;
    const userData = {
        name: user.user_name,
        email: user.user_email,
    }
    return (
        <Suspense>
            <QuizProvider data={quizData} user={userData} session={{
                session_id: session.session_id,
                uuid: session.session_uuid,
            }}>
                <div className='container-quiz'>
                    <ProgressBar />
                    <div className="flex-grow">
                        {children}
                    </div>
                    <QuizNavigator />
                </div>
            </QuizProvider>
        </Suspense>
    )
}

export default QuizzesLayout

const prepareQuizData = async (quizId: number) => {
    const request: Promise<WpQuizzesPostTypeResponse> = await wpApi(`quizzes/${quizId}`);
    const response: WpQuizzesPostTypeResponse = await request;
    const quizData: QuizDataInterface = {
        id: response.id,
        title: response.title.rendered,
        description: response.acf.quiz_description,
        summary: response.acf.quiz_summary,
        instruction: response.acf.quiz_instruction,
        slug: response.slug,
        questions: response.acf.quiz_flow.map((item, i) => {
            if (item.acf_fc_layout === 'questions') {
                return {
                    type: item.acf_fc_layout,
                    question_number: i + 1,
                    question_id: item.question_item
                }
            } else {
                return {
                    type: item.acf_fc_layout,
                    question_number: i + 1
                }
            }
        }).filter(item => item?.question_id !== undefined)
    }

    return quizData;

}