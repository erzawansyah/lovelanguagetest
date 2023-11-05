import React from 'react'

type Props = {
    handleClick: () => void,
}


const PrevButton = (props: Props) => {
    return (
        <button
            onClick={props.handleClick}
            type='button'
            aria-label='Previous question'
            className='btn-primary w-full'
        >
            Previous
        </button>
    )
}

export default PrevButton