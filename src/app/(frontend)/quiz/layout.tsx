import { getSessionCookie } from "@helpers/handleSession";
import { UserSession } from "@definition/api/createSessionsRequest";
import { Metadata } from "next"
import { wpApi } from "@/helpers/handleWpApi";
import { WpQuizzesPostTypeResponse } from "@/types/wpQuizzesPostTypeResponse";
import ProgressBar from "@/components/QuizNavigation/ProgressBar";
import Navigator from "@/components/QuizNavigation/Navigator";

// Generate metadata for the page layout from the quiz data
export const generateMetadata = async (): Promise<Metadata> => {
    // get session data from cookies
    const session: UserSession = getSessionCookie('session');
    const quizId: number = session.quiz_id as number;
    const quizData: Promise<WpQuizzesPostTypeResponse> = await wpApi(`quizzes/${quizId}`, {
        method: 'GET',
        next: {
            revalidate: 300,
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
    const session: UserSession = getSessionCookie('session');
    const quizId: number = session.quiz_id as number;
    const request: Promise<WpQuizzesPostTypeResponse> = await wpApi(`quizzes/${quizId}`);
    const data = await request;

    





    return (
        <div className='container-quiz'>
            {children}
        </div>
    )
}

export default QuizzesLayout