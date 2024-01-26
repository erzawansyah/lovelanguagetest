'use client'
import { useQuizStore } from '@/helpers/store/quiz'
import React, { useMemo } from 'react'

const ProgressBar = () => {
    const { paginate } = useQuizStore()
    const { current, total } = paginate

    const progress = useMemo(() => {
        return parseFloat(((current / total) * 100).toFixed(2))
    }, [current, total])

    return (
        <div>
            <div className='w-full h-3 border border-gray-500 rounded-full overflow-hidden'>
                <div className='bg-accent-dark h-full transition-all duration-500 ease-out' style={{ width: `${progress}%` }}>
                </div>
            </div>
            <div>
                <div className='text-center mt-2'>
                    <h5 className='text-xs'>{`Question ${current} of ${total}`}</h5>
                </div>
            </div>
        </div>
    );
}

export default ProgressBar