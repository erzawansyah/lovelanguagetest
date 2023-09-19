import { wpApi } from '@/app/(helper)/handleWpApi'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { getSessionCookie } from '@/app/(helper)/handleSession'
import { UserSession } from '@/types/api/createSessionsRequest'
import { WpQuizzesPostTypeResponse } from '@/types/wpQuizzesPostTypeResponse'

interface SearchParamsProps {
    searchParams: {
        quiz_id: string,
        name: string,
        email: string,
    }
}

const MainPage: NextPage<SearchParamsProps> = async (params) => {
    const { quiz_id } = params.searchParams
    const session: UserSession = getSessionCookie('session')

    // get slug from quiz_id
    const wpRequest: WpQuizzesPostTypeResponse = await wpApi(`quizzes/${quiz_id || session.quiz_id}`)
    const quizSlug = wpRequest.slug
    redirect(`/quizzes/${quizSlug}/?session_id=${session.session_id}&session_uuid=${session.session_uuid}`)
}

export default MainPage