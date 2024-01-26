"use client";
import QuizIntro from "@/components/Quiz/Intro";
import { useQuizStore } from "@/helpers/store/quiz";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

const QuizPage = () => {
    const quizStore = useQuizStore();
    const { paginate } = quizStore;
    const { current } = paginate;
    const router = useRouter();
    const params = useParams();
    const path = params.path;
    const slug = path[0];

    // if current changes, update the url
    useEffect(() => {
        // if current is not null, update the url
        if (current) {
            router.push(`/quiz/${slug}/${current}`);
        }
    }, [current, router, slug]);

    return (
        <>{current === 0 ?
            <QuizIntro
                title={quizStore.data.title}
                description={quizStore.data.description}
            /> : (
                <>
                    <div>QuizPage</div>
                    <div>
                        {/* <h1>{data.title}</h1> */}
                        <div id="pagination">
                            Current Question: {current}<br />
                            Previous Question: {paginate.prev}<br />
                            Next Question: {paginate.next}<br />
                        </div>
                    </div>
                </>
            )}</>
    )
}
export default QuizPage