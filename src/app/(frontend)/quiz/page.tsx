import { getQuizById } from "@/helpers/data/getQuizData";
import { cookies as nextCookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

const QuizPage = async () => {
    const cookies = nextCookies();
    const sessionCookie = cookies.has('session') ? cookies.get('session')?.value : null;
    const session = JSON.parse(sessionCookie!);
    const quizId = session?.quiz_id;

    if (!quizId) {
        throw new Error('There is no quiz id in the session cookie. Please activate the browser cookies and try again.');
    }
    const quizData = await getQuizById(quizId);
    const slug = quizData?.slug;

    if (!slug) {
        notFound();
    }
    redirect(`/quiz/${slug}`);
}

export default QuizPage;