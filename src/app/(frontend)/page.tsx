import { wpApi } from '@/app/(helper)/handleWpApi'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { getSessionCookie } from '@/app/(helper)/handleSession'
import { UserSession } from '@/types/api/createSessionsRequest'
import { WpQuizzesPostTypeResponse } from '@/types/wpQuizzesPostTypeResponse'
import WaitingCookies from './WaitingForCookies'

interface SearchParamsProps {
    searchParams: {
        quiz_id: string,
        name: string,
        email: string,
    }
}

const MainPage: NextPage<SearchParamsProps> = async (params) => {
    const { quiz_id, name, email } = params.searchParams
    const session: UserSession = getSessionCookie('session')


    // get slug from quiz_id
    if (quiz_id && name && email) {
        const wpRequest: WpQuizzesPostTypeResponse = await wpApi(`quizzes/${quiz_id || session.quiz_id}`)
        const quizSlug = wpRequest.slug

        redirect(`/quizzes/${quizSlug}/`)
    }

    // wait for cookies
    return <div>
        {/* Inform that the query parameter must be included */}
        <WaitingCookies />
    </div>
}

export default MainPage