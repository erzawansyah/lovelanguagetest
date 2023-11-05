'use client'
import React from 'react'
import StartButton from './Buttons/Start'
import NextButton from './Buttons/Next'
import PrevButton from './Buttons/Previous'
import SubmitButton from './Buttons/Submit'

type Props = {
    current: number,
    total: number,
    next: number,
    prev: number,
    control: {
        next: (next: number) => void,
        prev: (prev: number) => void,
        submit: () => void,
        start: () => void,
    }
}

const Navigator = (props: Props) => {
    const { current, total, next, prev } = props;

    const handleStartButton = () => {
        props.control.start();
    }

    const handleNextButton = () => {
        props.control.next(next);
    }

    const handlePrevButton = () => {
        props.control.prev(prev);
    }

    const handleSubmitButton = () => {
        props.control.submit();
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