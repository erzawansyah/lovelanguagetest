'use client'
import { UserSession } from '@/types/api/createSessionsRequest'
import { useRouter } from 'next/navigation'
import React from 'react'

const LoginForm = () => {
    const [quizId, setQuizId] = React.useState<number>()
    const router = useRouter()

    React.useEffect(() => {
        /**
         * TEMPORARY SOLUTION
         * Since we don't have the dynamic quiz id yet, we will use the absolute value of the quiz id 
         */

        // comment this block of code when we have the dynamic quiz id
        const quizIds = [223, 2158];
        const randomQuizId = quizIds[Math.floor(Math.random() * quizIds.length)];
        setQuizId(randomQuizId)

        /*
        * TODO
        * 1. Provide a way to get the quiz id from the url in the backend (we can add the options in the wordpress dashboard using ACF)
        * 2. Fetch the quiz id from the backend
        * 3. Set the quiz id to the state
        */

        /* add dynamic quiz id logic here */
    }, [])

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const fullname = data.get('fullname')
        const email = data.get('email')
        const quizId = data.get('quiz_id')

        console.log(fullname, email, quizId)

        createSession(fullname as string, email as string, Number(quizId)).then((res) => {
            if (!res) {
                throw new Error("Failed to create session")
            }
            router.push(`/quiz/${quizId}`)
        }).catch(err => {
            throw new Error(err)
        })
    }

    return (
        <>{quizId && <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="mb-4">
                <label htmlFor="fullname" className="block text-gray-500 text-xs font-bold mb-1">Full Name</label>
                <input type="text" name="fullname" id="fullname" required className="border rounded py-2 px-3 w-full bg-gray-200 text-gray-900" />
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-500 text-xs font-bold mb-1">Email</label>
                <input type="email" name="email" id="email" required className="border rounded py-2 px-3 w-full bg-gray-200 text-gray-900" />
            </div>
            <div>
                <input type="hidden" name="quiz_id" id="quiz_id" value={quizId} />
            </div>
            <button type="submit" className="bg-primary hover:bg-primary-dark w-full mt-4 text-white font-bold py-2 px-4 rounded">
                Start Quiz
            </button>
        </form>}
        </>
    )
}

export default LoginForm

const createSession: (
    name: string,
    email: string,
    quizId: number
) => Promise<UserSession> = async (name, email, quizId) => {
    const session = await fetch("/api/sessions/create", {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            quizId,
        }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => {
            if (res.status >= 400) {
                throw new Error(
                    `Error fetch api: ${res.status}. Message: ${res.statusText}`
                );
            }
            return res.json();
        })
        .catch((err) => {
            throw new Error(err);
        });

    return session;
};
