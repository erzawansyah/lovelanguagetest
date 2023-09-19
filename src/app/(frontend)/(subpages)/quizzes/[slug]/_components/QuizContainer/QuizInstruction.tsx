'use client'
import { useQuizContext } from "./QuizProvider";

const QuizInstruction = () => {
    const { state } = useQuizContext();

    return (
        <div className='container-quiz-content'>
            <h1 className="prose-xl lg:prose-2xl font-semibold mb-4">{state.quizData?.title}</h1>
            <h3 className="prose lg:prose-xl font-semibold mb-4">Instructions</h3>
            <p className="lg:prose prose-sm" dangerouslySetInnerHTML={{ __html: state.quizData?.instruction || "Waiting" }} />

        </div>
    )

}

export default QuizInstruction;