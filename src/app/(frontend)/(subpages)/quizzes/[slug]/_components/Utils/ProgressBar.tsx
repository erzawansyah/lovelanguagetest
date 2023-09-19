'use client'
import React, { FC, useEffect, useReducer } from 'react';
import { useQuizContext } from '../QuizContainer/QuizProvider';

const ProgressBar = () => {
    const { state } = useQuizContext();
    const { current, progress, total } = state;

    return (
        <div>
            <div className='w-full h-3 border border-gray-500 rounded-full overflow-hidden'>
                <div className='bg-accent-dark h-full transition-all duration-500 ease-out' style={{ width: `${progress}%` }}>
                </div>
            </div>
            <div>
                <div className='text-center mt-2'>
                    <h1 className='text-xs'>{`Question ${current} of ${total} (${parseFloat(progress.toFixed(2))}%)`}</h1>
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
