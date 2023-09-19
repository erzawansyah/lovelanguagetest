import { QuestionItemInterface } from "../../_definition";
import { wpApi } from "@/app/(helper)/handleWpApi";
import { WpQuestionsPostTypeResponse } from "@/types/wpQuestionsPostTypeResponse";
import { blankQuestion } from "./QuestionBank";
import { secretStorage } from "@/app/(helper)/handleStorage";

// Async function to fetch question data from the API
export const prepareQuestionData = async (current: number, questionId: number | undefined) => {
    // if there is no question id passed, return blank question
    if (questionId === undefined) return blankQuestion;

    // check if question data is already available in local storage
    const secretStorageQuestion = secretStorage.getItem(`question-${questionId}`);
    if (secretStorageQuestion) {
        const questionData = JSON.parse(secretStorageQuestion);
        return questionData;
    }

    // if question data is not available in local storage, fetch from API
    try {
        const request: Promise<WpQuestionsPostTypeResponse> = await wpApi(`questions/${questionId}`);
        const response: WpQuestionsPostTypeResponse = await request;
        const questionData: QuestionItemInterface = {
            type: 'questions',
            question_id: response.id,
            question_number: current,
            content: {
                statement: response.acf.q_statement,
                choices: response.acf.choices.map((choice) => {
                    return {
                        statement: choice.c_statement,
                        value: choice.value
                    };
                })
            },
        };
        // save question data to local storage
        secretStorage.setItem(`question-${questionId}`, JSON.stringify(questionData));
        return questionData;
    } catch (error) {
        console.error("Error fetching question data:", error);
        return blankQuestion;
    }
};