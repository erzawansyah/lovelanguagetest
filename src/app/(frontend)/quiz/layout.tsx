import { getSessionCookie } from "@helpers/handleSession";
import { UserSession } from "@definition/api/createSessionsRequest";
import { Metadata } from "next"
import { wpApi } from "@/helpers/handleWpApi";
import { WpQuizzesPostTypeResponse } from "@/types/wpQuizzesPostTypeResponse";


// Generate metadata for the page layout from the quiz data
export const generateMetadata = async (): Promise<Metadata> => {
    // get session data from cookies
    const session: UserSession = getSessionCookie('session');
    const quizId: number = session.quiz_id as number;
    const quizData: Promise<WpQuizzesPostTypeResponse> = await wpApi(`quizzes/${quizId}`, {
        method: 'GET',
        next: {
            tags: [
                `quiz-${quizId}`,
            ],
        }
    });
    const response = await quizData;
    const title = response.title.rendered as string;
    return {
        title: `Quiz | ${title}`,
    }
}


// Layout for the quiz pages
const QuizzesLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='container-quiz'>
            {children}
        </div>
    )
}

export default QuizzesLayout