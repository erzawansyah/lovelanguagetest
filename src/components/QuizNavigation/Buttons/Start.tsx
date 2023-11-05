import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    handleClick: () => void,
}


const StartButton = (props: Props) => {
    const router = useRouter()
    const params = useSearchParams()
    const total = params.get('total')

    return (
        <button
            onClick={props.handleClick}
            type='button'
            aria-label='Start Quiz question'
            className='btn-primary w-full'
        >
            Start Quiz
        </button>
    )
}

export default StartButton