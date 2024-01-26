'use client'
import { CreateAnswersResponseBody } from '@/app/(backend)/api/answers/route';
import { secretStorage } from '@helpers/handleStorage';
import { useEffect, useState } from 'react';
import { getSettings, handleResult } from './handleResult';
import Image from 'next/image';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

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
    results: string;
    colours: string;
}

type ChartState = {
    labels: string[];
    datasets: {
        data: number[];
        backgroundColor: string[];
        hoverBackgroundColor: string[];
    }[]
}

const ResultPage = () => {
    const [data, setData] = useState<CreateAnswersResponseBody>()
    const [settings, setSettings] = useState<QuizSettingsState[]>()
    const [result, setResult] = useState<ResultState[]>()
    const [chartData, setChartData] = useState<ChartState>()

    useEffect(() => {
        ChartJS.register(ArcElement, Tooltip);
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
                const result = res.map((item) => {
                    const text = item.results.split('\n').map((item) => item === "\r" ? "" : `<p>${item}</p>`).join('')
                    return {
                        ...item,
                        results: text,
                    }
                })

                const chartData = {
                    labels: result.map((item) => item.title),
                    datasets: [{
                        data: result.map((item) => item.count),
                        backgroundColor: result.map((item) => item.colours),
                        hoverBackgroundColor: result.map((item) => item.colours),
                    }]
                }

                setResult(result)
                setChartData(chartData)
            })

        }
    }, [data, settings])

    return (result ? (
        <div className="quiz-container mx-auto p-4 flex justify-center items-start">
            <section className="w-full lg:w-3/5 p-0 lg:p-6 rounded-lg grid grid-cols-2 gap-8 lg:gap-16">

                {/* Bagian untuk Doughnut Chart pada perangkat mobile */}
                <div className="mt-4 lg:hidden w-full col-span-2">
                    {/* {chartData && <Doughnut data={chartData} />} */}
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
                    <div className="mt-0 lg:mt-4 mb-8 hidden lg:block">
                        <Image
                            className='mx-auto'
                            src={result[0].image}
                            alt={result[0].title}
                            width={250}
                            height={250}
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-center prose mb-2">
                        {result[0].title}
                    </h1>
                    <h4 className="text-gray-600 text-center prose mb-4">
                        {result[0].subtitle}
                    </h4>

                    <div className='text-gray-600 prose'>
                        <div dangerouslySetInnerHTML={{ __html: result[0].results }} />
                    </div>
                </div>

                {/* Kolom 2 */}
                <div className="col-span-2 lg:col-span-1">
                    <div className="mt-0 lg:mt-4 mb-8">
                        {chartData && <Doughnut data={chartData} />}
                    </div>
                    <div className="mt-0 lg:mt-4 flex flex-col gap-4">
                        {result.map((item, index) => (
                            <div
                                key={item.result_id}
                                className='bg-accent-light rounded-md shadow'
                            >
                                <div className='p-4 -z-10 flex align-middle gap-4'>
                                    <div className='w-4 h-4 self-center' style={{
                                        backgroundColor: item.colours,
                                        borderRadius: '50%',
                                    }} />
                                    <p className='z-30'>
                                        {item.title} ({Number((item.answers.length / 40 * 100).toFixed(2))}%)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tombol Aksi */}
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
