'use client';
import { QuizDataInterface, UserAnswerInterface } from "../../_definition";

export const answerPreparation = (quizData: QuizDataInterface, userAnswers: UserAnswerInterface[]) => {
    const answers = quizData.questions.map((item) => {
        const answer = userAnswers.find((answer) => answer.question_id === item.question_id);
        return {
            question_id: item.question_id!,
            question_number: item.question_number,
            answer_value: answer?.answer.toString() || '0',
            answer_label: answer?.answer_label || 'No Label',
            answer_id: answer?.answer_id
        };
    });
    return answers;
};
