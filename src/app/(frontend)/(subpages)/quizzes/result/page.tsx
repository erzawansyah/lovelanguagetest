'use client'
import { CreateAnswersResponseBody } from '@/app/(backend)/api/answers/route';
import { secretStorage } from '@/app/(helper)/handleStorage';
import { useEffect, useState } from 'react';
import { getSettings, handleResult } from './handleResult';
import Image from 'next/image';

export type QuizSettingsState = {
    value: string | number,
    result_id: number,
}

type AnswerState = Omit<CreateAnswersResponseBody, 'session_id' | 'user_data'>;

export type ResultState = {
    value: string | number;
    result_id: number;
    answers: AnswerState['answers'];
    count: number;
    image: string;
    title: string;
    subtitle: string;
    excerpt: string;
}

const ResultPage = () => {
    const [data, setData] = useState<CreateAnswersResponseBody>()
    const [settings, setSettings] = useState<QuizSettingsState[]>()
    const [result, setResult] = useState<ResultState[]>()

    useEffect(() => {
        // if data is not exist, get data from local storage
        if (!data) {
            const answers = secretStorage.getItem('answers')
            setData(JSON.parse(answers!))
        }
    }, [data, settings])

    useEffect(() => {
        // if data is exist, but settings is not exist, get settings from API
        if (data && !settings) {
            getSettings(data.user_data.quiz_id).then((res) => {
                setSettings(res)
            })
        }
    }, [data, settings])

    useEffect(() => {
        // if data and settings is exist, handle result
        if (data && settings) {
            handleResult(data, settings).then((res) => {
                setResult(res)
            })

        }
    }, [data, settings])

    return (result ? (
        <div className="quiz-container mx-auto p-4 flex justify-center items-start">
            <section className="w-full lg:w-3/5 p-0 lg:p-6 rounded-lg grid grid-cols-2 gap-8 lg:gap-16">
                <div className="mt-4 lg:hidden w-full col-span-2">
                    <Image
                        className='mx-auto'
                        src={result[0].image}
                        alt={result[0].title}
                        width={340}
                        height={340}
                    />
                </div>
                {/* Kolom 1 */}
                <div className="col-span-2 lg:col-span-1 bg-accent-light rounded-md p-6 shadow">
                    <h1 className="text-2xl font-semibold text-center prose mb-2">
                        {result[0].title}
                    </h1>
                    <h4 className="text-gray-600 text-center prose mb-4">
                        {result[0].subtitle}
                    </h4>

                    <div className='text-gray-600 prose'>
                        <p dangerouslySetInnerHTML={{ __html: result[0].excerpt }} />
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa atque facilis deserunt, mollitia itaque nemo voluptatum. Molestiae nam iusto consectetur consequuntur, inventore quaerat porro libero. Reiciendis accusantium ipsam sapiente fugiat!
                        </p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Necessitatibus eligendi magnam repellendus officiis quae explicabo quia ullam velit eum, temporibus, quis aut maxime! Atque, labore obcaecati quam ipsum suscipit voluptatem!
                        </p>
                    </div>


                </div>

                {/* Kolom 2 */}
                <div className="col-span-2 lg:col-span-1">
                    <div className="mt-0 lg:mt-4 hidden lg:block">
                        <Image
                            className='mx-auto'
                            src={result[0].image}
                            alt={result[0].title}
                            width={250}
                            height={250}
                        />
                    </div>
                    <div className="mt-0 lg:mt-4 flex flex-col gap-4">
                        {result.map((item) => (
                            <div
                                key={item.result_id}
                                className='bg-accent-light rounded-md p-4 shadow'
                            >
                                {item.title} ({Number((item.answers.length / 40 * 100).toFixed(2))}%)
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-2 col-span-2 flex flex-col gap-4 items-center">
                    <button className="btn-primary w-full lg:w-1/2 rounded-full">Bagikan</button>
                    <button className="btn-primary bg-secondary w-full lg:w-1/2 rounded-full">Kirim hasil ke email</button>
                    <button className="btn-primary bg-accent w-full lg:w-1/2 rounded-full">Kembali ke Beranda</button>
                </div>
            </section>

        </div>
    ) : (
        <div className='p-8 flex flex-col gap-4'>
            <Image
                className="m-auto animate-spin"
                alt='' src='/loading-icon.svg' width={48} height={48}
            />
            <p className="text-xs text-center">Calculate the results</p>
        </div>
    ))
}

export default ResultPage
