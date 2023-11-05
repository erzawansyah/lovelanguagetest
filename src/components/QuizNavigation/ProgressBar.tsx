'use client'
import React from 'react'

type Props = {
    current: number,
    total: number,
}

const ProgressBar = (props: Props) => {
    const { current, total } = props
    const [progress, setProgress] = React.useState(0)

    React.useEffect(() => {
        const progress = ((current + 1) / total) * 100
        setProgress(progress)
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