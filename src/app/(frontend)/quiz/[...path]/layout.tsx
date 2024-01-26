import Navigator from '@/components/QuizNavigation/Navigator'
import ProgressBar from '@/components/QuizNavigation/ProgressBar'
import StoreProvider from '@/components/Utils/StoreProvider'
import { getQuizById } from '@/helpers/data/getQuizData'
import { cookies as nextCookies } from 'next/headers'
import { Suspense } from 'react'
const QuizLayout = async ({ children }: { children: React.ReactNode }) => {
    const cookies = nextCookies()
    const sessionCookies = cookies.has('session') ? cookies.get('session')?.value : null
    const session = sessionCookies ? JSON.parse(sessionCookies) : null
    const quizId = session?.quiz_id
    if (!quizId) {
        return <div>Quiz not found</div>
    }
    const quizData = await getQuizById(quizId)


    return <Suspense>
        <StoreProvider data={quizData} />
        <ProgressBar />
        <main className='overflow-auto'>
            {children}
        </main>
        <Navigator />
    </Suspense>
}

export default QuizLayout