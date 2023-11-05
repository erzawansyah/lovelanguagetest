import React from 'react'

type Props = {
    handleClick: () => void,
}

const NextButton = (props: Props) => {

    return (
        <button
            onClick={props.handleClick}
            type='button'
            aria-label='Previous question'
            className='btn-primary w-full'
        >
            Next
        </button>
    )
}

export default NextButton