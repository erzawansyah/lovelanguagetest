import React from 'react'


type Props = {
    title: string,
    description: string,
}

const QuizIntro = (props: Props) => {
    const { title, description } = props

    return (
        <div className="bg-white rounded-lg mx-auto p-0 py-4 text-center">
            <h1 className="prose prose-h1 text-2xl font-bold mb-4">{title}</h1>
            <h4 className="prose prose-h4 text-base font-bold mb-4 mx-auto">This quiz will help you determine if you are a good candidate for a hair transplant.</h4>
            <div
                className='prose prose-slate text-justify w-full mx-auto flex flex-col gap-2'
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}

export default QuizIntro