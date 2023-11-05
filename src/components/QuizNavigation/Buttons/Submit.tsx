import React from 'react'

type Props = {
    handleClick: () => void,
}


const SubmitButton = (props: Props) => {
    return (
        <button
            onClick={props.handleClick}
            type='button'
            aria-label='Submit answers'
            className='btn-primary w-full'
        >
            Submit
        </button>
    )
}

export default SubmitButton