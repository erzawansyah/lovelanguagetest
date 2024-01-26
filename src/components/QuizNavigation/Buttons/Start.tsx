import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'

type Props = {
    handleClick: () => void,
}


const StartButton = (props: Props) => {
    return (
        <button
            onClick={props.handleClick}
            type='button'
            aria-label='Start Quiz question'
            className='btn-primary w-full max-w-lg mx-auto'
        >
            Start Quiz
        </button>
    )
}

export default StartButton