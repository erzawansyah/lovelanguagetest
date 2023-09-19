import { QuestionItemContentInterface, QuizActionInterface, QuizStateInterface } from "./_definition";

export const quizInitialState: QuizStateInterface = {
    current: 0,
    progress: 0,
    total: 0,
    quizData: {
        id: 0,
        title: '',
        description: '',
        summary: '',
        instruction: '',
        slug: '',
        questions: []
    },
    userAnswers: [],
    userData: {
        name: '',
        email: '',
        os: '-',
        browser: '-',
        user_agent: '-'
    },
    userLog: {
        start: Date.now().toString(),
        end: '',
        duration: ''
    },
    status: 'idle',
}

export type QuizActionTypeInterface = 'SET_QUIZ_NAME' | 'SET_TOTAL_QUESTIONS' | 'SET_QUIZ_DATA' | 'NEXT_QUESTION' | 'PREV_QUESTION' | 'UPDATE_PROGRESS' | 'SET_USER_ANSWER' | 'SET_QUESTION_CONTENT' | 'UPDATE_USER_ANSWER' | 'SET_USER_DATA' | 'SET_USER_START' | 'SET_USER_END' | 'SET_DURATION' | 'SET_STATUS';

export const quizReducer = (
    state: QuizStateInterface,
    action: QuizActionInterface<QuizActionTypeInterface>
) => {
    switch (action.type) {
        case "SET_QUIZ_NAME":
            return {
                ...state,
                name: action.payload
            }
        case "SET_TOTAL_QUESTIONS":
            return {
                ...state,
                total: action.payload
            }
        case "SET_QUIZ_DATA":
            return {
                ...state,
                quizData: action.payload
            }
        case "NEXT_QUESTION":
            if (state.current < state.total) {
                return {
                    ...state,
                    current: state.current + 1
                }
            } else {
                return state;
            }
        case "PREV_QUESTION":
            if (state.current > 0) {
                return {
                    ...state,
                    current: state.current - 1
                }
            } else {
                return state;
            }
        case "UPDATE_PROGRESS":
            if (state.progress < 100) {
                return {
                    ...state,
                    progress: state.userAnswers.length / state.total * 100
                }
            }

            if (state.progress > 100) {
                return {
                    ...state,
                    progress: 100
                }
            }

            return state;
        case "SET_USER_ANSWER":
            return {
                ...state,
                userAnswers: [
                    ...state.userAnswers || [],
                    action.payload 
                ]
            }
        case 'UPDATE_USER_ANSWER':
            return {
                ...state,
                userAnswers: [
                    ...state.userAnswers.map((answer) => {
                        if (answer.question_number === action.payload.question_number ) {
                            return {
                                ...answer,
                                answer: action.payload.answer
                            }
                        }
                        return answer;
                    })
                ]
            }
        case 'SET_QUESTION_CONTENT':
            return {
                ...state,
                quizData: {
                    ...state.quizData,
                    questions: [
                        ...state.quizData.questions.map((question) => {
                            if (question.question_id === action.payload.questionId ) {
                                return {
                                    ...question,
                                    content: action.payload.content 
                                }
                            }
                            return question;
                        })
                    ]
                }
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                userData: {
                    ...state.userData,
                    ...action.payload
                }
            }
        case 'SET_USER_START':
            return {
                ...state,
                userLog: {
                    ...state.userLog,
                    start: action.payload
                }
            }
        case 'SET_USER_END':
            return {
                ...state,
                userLog: {
                    ...state.userLog,
                    end: action.payload 
                }
            }
        case 'SET_DURATION':
            let duration = 0;
            if (state.userLog?.start && state.userLog?.end) {
                duration = parseInt(state.userLog.end) - parseInt(state.userLog.start);
            }
            return {
                ...state,
                userLog: {
                    ...state.userLog,
                    duration: duration.toString() 
                }
            }
        case 'SET_STATUS':
            return {
                ...state,
                status: action.payload
            }
        default:
            return state
    }
}
