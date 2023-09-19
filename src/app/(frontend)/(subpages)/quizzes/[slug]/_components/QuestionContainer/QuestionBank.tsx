import React, { Suspense, useCallback, useEffect, useState } from "react";
import { QuestionItemInterface } from "../../_definition";
import { useQuizContext } from "../QuizContainer/QuizProvider";
import QuestionItem from "./QuestionItem";
import { prepareQuestionData } from "./prepareQuestionData";

const QuestionBank = () => {
    const [question, setQuestion] = useState<QuestionItemInterface>();
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
        const currentQuestionId = currentQuestion?.question_id;
        setQuestion(undefined);
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
            <QuestionItem data={question} />
        </div>
    );
}

export default QuestionBank;
