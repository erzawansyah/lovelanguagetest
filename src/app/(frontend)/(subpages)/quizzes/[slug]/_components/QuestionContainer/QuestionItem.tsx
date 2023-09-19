'use strict';
import React, { useCallback, useEffect, useState } from 'react'
import { useQuizContext } from '../QuizContainer/QuizProvider'
import { ChoicesInterface, QuestionItemInterface, UserAnswerInterface } from '../../_definition'
import Image from 'next/image';

// QuestionItem component
const QuestionItem = ({ data }: { data: QuestionItemInterface | undefined }) => {
    const [answer, setAnswer] = useState<UserAnswerInterface>()
    const { state, dispatch } = useQuizContext()

    // Effect to set the answer when userAnswers change
    useEffect(() => {
        const userAnswer: UserAnswerInterface | undefined = state.userAnswers.find((answer) => answer.question_number === data?.question_number)
        if (userAnswer) setAnswer(userAnswer)
        return () => {
            setAnswer(undefined)
        }
    }, [state.userAnswers, data?.question_number])

    // Function to handle user answers
    const handleAnswer = useCallback((value: number | string) => {
        if (!data?.question_id) return
        const userAnswer: UserAnswerInterface = {
            question_id: data?.question_id,
            question_number: data?.question_number,
            answer: value,
            answer_label: data?.content?.choices.find((choice) => choice.value === value)?.statement || 'No Label'
        }
        if (answer) {
            dispatch({ type: 'UPDATE_USER_ANSWER', payload: userAnswer })
            if (state.status === 'finished') {
                dispatch({ type: 'SET_STATUS', payload: 'updated' })
            }

            if (answer.answer !== userAnswer.answer) {
                setTimeout(() => dispatch({ type: 'NEXT_QUESTION' }), 100)
            }
        } else {
            dispatch({ type: 'SET_USER_ANSWER', payload: userAnswer })
            dispatch({ type: 'UPDATE_PROGRESS' })
            setTimeout(() => dispatch({ type: 'NEXT_QUESTION' }), 100)
        }
    }, [answer, data?.question_id, data?.question_number, data?.content?.choices, dispatch, state.status])

    return (
        <div className='mt-6'>
            <div className='text-center mb-6'>
                <h5 className='text-xl font-semibold'>{`${data?.content?.statement || "Waiting"}`}</h5>
            </div>
            {
                data ? <div className='flex flex-col gap-4'>
                    {data?.content?.choices.map((choice, index) => <ChoiceButton
                        key={index}
                        answer={answer}
                        isAnswer={answer?.answer === choice.value}
                        content={choice}
                        handleAnswer={handleAnswer}
                    />)}
                </div> : <div className='p-8 flex flex-col gap-4'>
                    <Image
                        className="m-auto animate-spin"
                        alt='' src='/loading-icon.svg' width={48} height={48}
                    />
                    <p className="text-xs text-center">Fetching questions</p>
                </div>
            }
        </div>
    )
}

export default QuestionItem

// ChoiceButton component
interface ChoiceButtonProps {
    answer: UserAnswerInterface | undefined;
    isAnswer: boolean;
    content: ChoicesInterface;
    handleAnswer: (value: number | string) => void;
}

const ChoiceButton = (props: ChoiceButtonProps) => {
    const { content, isAnswer, handleAnswer } = props

    return (
        <button
            className={`w-full rounded-lg flex items-center justify-center text-left px-4 py-6
            ${isAnswer ? 'bg-accent' : 'bg-accent-light'} 
            hover:bg-accent shadow drop-shadow
            active:bg-opacity-70 active:shadow-none active:drop-shadow-none
            transition-all duration-300 ease-out
            `}
            onClick={() => handleAnswer(content.value)}
        >
            <div className='flex-1'>
                <p className='text-base'>{content.statement}</p>
            </div>
        </button>
    )
}
