'use client';
import Modal from "@frontend/(components)/Modal";
import { useQuizContext } from "../QuizContainer/QuizProvider";
import { useState } from "react";

export const StartQuizButton = () => {
    const [modal, setModal] = useState(false);
    const { dispatch } = useQuizContext();
    const handleOpenModal = () => {
        modal ? setModal(false) : setModal(true);
    };

    const handleStartQuiz = () => {
        setModal(false);
        dispatch({ type: 'NEXT_QUESTION' });
        dispatch({ type: 'UPDATE_PROGRESS' });
        dispatch({
            type: 'SET_USER_START',
            payload: Date.now().toString()
        });
    };

    return (
        <div className='flex mt-8 justify-center gap-4'>
            <button onClick={handleOpenModal} className='btn-primary'>Start Quiz</button>
            <Modal isOpen={modal}>
                <div className='flex flex-col gap-4'>
                    <h1 className='text-lg lg:text-xl text-center'>Are you sure you want to start the quiz?</h1>
                    <div className='flex gap-4 justify-center'>
                        <button onClick={handleStartQuiz} className='btn-primary'>Yes</button>
                        <button onClick={() => setModal(false)} className='btn-primary'>No</button>
                    </div>
                </div>
            </Modal>
        </div>
    );

};
