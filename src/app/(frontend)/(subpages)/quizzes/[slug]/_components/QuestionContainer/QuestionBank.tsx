import React, { Suspense, useCallback, useEffect, useState } from "react";
import { QuestionItemInterface } from "../../_definition";
import { useQuizContext } from "../QuizContainer/QuizProvider";
import QuestionItem from "./QuestionItem";
import dynamic from "next/dynamic";

// Define a constant for a blank question
export const blankQuestion: QuestionItemInterface = {
    type: 'questions',
    question_id: 0,
    question_number: 0,
    content: {
        statement: '',
        choices: []
    },
};

const QuestionBank = () => {
    const [question, setQuestion] = useState<QuestionItemInterface>(blankQuestion);
    const { state, dispatch } = useQuizContext();
    const { current, quizData } = state;
    const currentQuestion = quizData.questions.find((question) => question.question_number === current);

    // Function to update the question content in the context
    const updateQuestion = useCallback((question: QuestionItemInterface) => {
        dispatch({
            type: 'SET_QUESTION_CONTENT',
            payload: {
                questionId: question.question_id,
                content: question.content
            }
        })
    }, [dispatch])

    
    const handleQuestionChange = useCallback(async () => {
        const { prepareQuestionData } = await import('./prepareQuestionData');
        const currentQuestionId = currentQuestion?.question_id;
        setQuestion(blankQuestion);
        if (currentQuestion?.content) {
            // Use the existing question content if available
            setQuestion(currentQuestion);
        } else {
            // Fetch and update question data if not available
            prepareQuestionData(current, currentQuestionId).then((data) => {
                setQuestion(data);
                updateQuestion(data);
            })
        }
    }, [current, currentQuestion, updateQuestion])

    useEffect(() => {
        handleQuestionChange();
    }, [handleQuestionChange])

    return (
        <div className="question-container">
            <Suspense fallback={<div>Loading</div>}>
                <QuestionItem data={question} />
            </Suspense>
        </div>
    );
}

export default QuestionBank;
