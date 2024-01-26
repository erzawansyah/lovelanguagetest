import { UserSession } from '@/types/api/createSessionsRequest';
import { cookies as nextCookies } from 'next/headers';
import Image from 'next/image'
import { redirect } from 'next/navigation';
import React from 'react'
import { SubmitButton } from './submit';
import { login } from './action';

const LoginPage = () => {
    const cookies = nextCookies()
    const session = cookies.has('session') ? cookies.get('session') : undefined;

    // check if session value fits the type of Session
    // if so, redirect to quiz page
    if (session) {
        const sessionObject: UserSession = JSON.parse(session.value)
        const { user: { user_name, user_email }, quiz_id, session_id, session_uuid } = sessionObject

        if (user_name && user_email && quiz_id && session_id && session_uuid) {
            redirect(`/?quiz_id=${quiz_id}&email=${user_email}&name=${user_name}`)
        }
    }

    return (
        <main className="bg-white flex flex-col items-center justify-center gap-4 p-4 md:p-12">
            <a title='homepage-link' href={process.env.NEXT_PUBLIC_WP_URL}>
                <div className='relative h-16 w-[360px]'>
                    <Image src='/logo-light.png' alt='logo love language test' fill={true} sizes='33vw' priority={true} style={{
                        objectFit: 'contain',
                    }} />
                </div>
            </a>
            <div className="bg-gray-100 p-16 rounded-lg shadow-lg flex flex-col items-center max-w-[400px]">
                <div className='mb-8 text-center'>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900">
                        Start the Quiz
                    </h1>
                    <p className="text-gray-500 text-sm italic">Please enter your full name and email address to start the quiz.</p>
                </div>
                <form action={login} className="w-full max-w-sm">
                    <div className="mb-4">
                        <label htmlFor="fullname" className="block text-gray-500 text-xs font-bold mb-1">Full Name</label>
                        <input type="text" name="fullname" id="fullname" required className="border rounded py-2 px-3 w-full bg-gray-200 text-gray-900" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-500 text-xs font-bold mb-1">Email</label>
                        <input type="email" name="email" id="email" required className="border rounded py-2 px-3 w-full bg-gray-200 text-gray-900" />
                    </div>
                    <SubmitButton />
                </form>
            </div>
        </main>
    )
}

export default LoginPage