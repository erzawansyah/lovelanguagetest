'use client'
import React, { useMemo } from 'react'
import StartButton from './Buttons/Start'
import NextButton from './Buttons/Next'
import PrevButton from './Buttons/Previous'
import SubmitButton from './Buttons/Submit'

import { useParams, useRouter } from 'next/navigation'
import { useQuizStore } from '@/helpers/store/quiz'


const Navigator = () => {
    const quizStore = useQuizStore()
    const { current, next, prev, total } = quizStore.paginate
    const { setCurrent } = quizStore
    const router = useRouter()
    const params = useParams()
    const path = params.path
    const slug = path[0]

    const handleNextButton = () => {
        setCurrent(next)
    }

    const handlePrevButton = () => {
        setCurrent(prev)
    }

    const handleStartButton = () => {
        setCurrent(1)
    }

    const handleSubmitButton = () => {
        router.replace(`/quiz/${slug}/result`)
    }



    if (current === 0) {
        return <StartButton handleClick={handleStartButton} />;
    } else if (current === total - 1) {
        return (
            <div className='flex gap-4'>
                <PrevButton handleClick={handlePrevButton} />
                <SubmitButton handleClick={handleSubmitButton} />
            </div>
        );
    } else {
        return (
            <div className='flex gap-4'>
                <PrevButton handleClick={handlePrevButton} />
                <NextButton handleClick={handleNextButton} />
            </div>
        );
    }
}

export default Navigator