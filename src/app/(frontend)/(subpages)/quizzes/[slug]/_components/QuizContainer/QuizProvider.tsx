'use client'
import { Suspense, createContext, useContext, useEffect, useReducer } from "react";
import { quizReducer, quizInitialState, QuizActionTypeInterface } from "../../reducer";
import { QuizActionInterface, QuizDataInterface, QuizStateInterface } from "../../_definition";
import { useRouter } from "next/navigation";

const QuizContext = createContext<{
    state: QuizStateInterface,
    dispatch: React.Dispatch<QuizActionInterface<QuizActionTypeInterface>>
}>({
    state: quizInitialState,
    dispatch: () => null
});

interface QuizProviderProps {
    data: QuizDataInterface;
    user: { name: string, email: string }
    session: { session_id: number, uuid: string }
    children: React.ReactNode;
}

export const QuizProvider = (props: QuizProviderProps) => {
    const [state, dispatch] = useReducer(quizReducer, quizInitialState);
    const router = useRouter();
    const { children, data, user, session } = props;

    useEffect(() => {
        router.replace(`?session_id=${session.session_id}&session_uuid=${session.uuid}`)
    }, [router, session])

    useEffect(() => {
        if (data) {
            dispatch({ type: 'SET_QUIZ_NAME', payload: data.slug })
            dispatch({ type: 'SET_QUIZ_DATA', payload: data })
            dispatch({ type: 'SET_TOTAL_QUESTIONS', payload: data.questions?.length })
        }
    }, [data])

    useEffect(() => {
        if (user) {
            dispatch({ type: 'SET_USER_DATA', payload: user })
        }
    }, [user])


    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            <Suspense fallback={<div>Waiting</div>}>
                {children}
            </Suspense>
        </QuizContext.Provider>
    );
};

export const useQuizContext = () => useContext(QuizContext);