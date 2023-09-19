'use client'
import { useQuizContext } from "../QuizContainer/QuizProvider";
import { useEffect, useState } from "react";
import FinishConfirmatonModal from "./FinishConfirmatonModal";
import { StartQuizButton } from "./StartQuizButton";
import { useRouter, useSearchParams } from "next/navigation";
import { handleFinishQuiz as onFinish } from "./handleFinishQuiz";
import { dataPreparation } from "./dataPreparation";
import { answerPreparation } from "./answerPreparation";
import { secretStorage } from "@/app/(helper)/handleStorage";

const QuizNavigation = () => {
    const [finishModal, setFinishModal] = useState(false);
    const { state, dispatch } = useQuizContext();
    const router = useRouter()
    const query = useSearchParams();

    const { current, total, quizData, userLog, userAnswers, progress, status } = state;
    const disabledPrevButton = current === 1 ? true : false;
    const currentQuestionData = quizData.questions.find((item) => item.question_number === current)
    const disabledNotReadyQuestion = currentQuestionData?.content ? false : true;
    const isLast = total === current ? true : false;
    const data = dataPreparation(userLog!);
    const answers = answerPreparation(quizData!, userAnswers!);

    useEffect(() => {
        if (status === 'finished') {
            setFinishModal(false);
            const sessionId = query.get('session_id');
            const sessionUuid = query.get('session_uuid');

            setTimeout(() => {
                router.push(`/quizzes/result?session_id=${sessionId}&session_uuid=${sessionUuid}`)
            }, 1000)
        }
    }, [status, router, query])

    const handleFinishQuiz = () => {
        if (status !== 'finished'){
            dispatch({type: 'SET_STATUS', payload: 'loading'})
        } 
        onFinish({ status: status, session: data, answers: answers })
            .then((data) => {
                secretStorage.setItem('answers', JSON.stringify(data));
                dispatch({ type: 'SET_STATUS', payload: 'finished' });
            })
    }

    const handleNextQuestion = () => {
        if (isLast) {
            dispatch({ type: 'SET_USER_END', payload: Date.now().toString() });
            dispatch({ type: 'SET_DURATION' });
            setFinishModal(true);
        }
        dispatch({ type: 'NEXT_QUESTION' })
    }

    const handlePrevQuestion = () => {
        dispatch({ type: 'PREV_QUESTION' })
    }

    return current === 0 ? <StartQuizButton /> :
        <div className='flex mt-8 justify-center gap-8'>
            <button
                onClick={handlePrevQuestion}
                className='btn-primary w-full'
                disabled={disabledPrevButton}
            >
                Previous
            </button>
            <button
                onClick={handleNextQuestion}
                className={`btn-primary w-full ${isLast ? 'submit' : ''}`}
                disabled={disabledNotReadyQuestion || (current === total && progress < 100)}
            >
                {isLast ? 'Submit' : 'Next'}
            </button>
            <FinishConfirmatonModal
                isOpen={finishModal}
                handleFinishQuiz={handleFinishQuiz}
                handleCloseModal={() => {
                    setFinishModal(false);
                }}
                status={status}
            />
        </div>
}

export default QuizNavigation;
