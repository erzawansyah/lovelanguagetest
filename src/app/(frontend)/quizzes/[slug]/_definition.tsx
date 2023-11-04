import { QuizContentAcfFcLayout } from "@/types/wpQuizzesPostTypeResponse";

export interface QuizActionInterface<ActionType> {
    type: ActionType,
    payload?: any
}

export interface QuizStateInterface {
    current: number;
    progress: number;
    total: number;
    quizData: QuizDataInterface;
    userAnswers: UserAnswerInterface[];
    userData?: UserDataInterface;
    userLog?: UserLogInterface;
    status?: 'idle' | 'loading' | 'finished' | 'updated';
}

export interface UserDataInterface {
    name: string;
    email: string;
    os?: string;
    browser?: string;
    user_agent?: string;
}

export interface UserLogInterface {
    start?: string;
    end?: string;
    duration?: string;
}

export interface QuizDataInterface {
    id: number,
    title: string,
    description: string,
    summary: string,
    instruction: string,
    slug: string,
    questions: QuestionItemInterface[]
}

export interface QuestionItemInterface {
    type: QuizContentAcfFcLayout,
    question_number: number,
    question_id?: number,
    content?: QuestionItemContentInterface
}

export interface QuestionItemContentInterface {
    statement: string,
    choices: ChoicesInterface[]
}

export interface ChoicesInterface {
    statement: string,
    value: string | number
}

export interface UserAnswerInterface {
    question_number: number,
    question_id: number,
    answer: number | string,
    answer_label?: string,
    answer_id?: number
}

export interface SubmitUserAnswerInterface {
    question_id: number,
    question_number: number,
    answer_value: number | string,
    answer_label?: string,
}

export interface SubmitUserDataInterface {
    uuid: string,
    user_name?: string,
    user_email?: string,
    quiz_id: number,
    start_date: string,
    finish_date: string,
    duration: number,
    user_os: string,
    user_browser: string,
    user_agent: string
}

type MaxLengthArray<T> = readonly [T, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?, T?,];
export type SubmitBulkUserAnswerInterface = MaxLengthArray<SubmitUserAnswerInterface>;