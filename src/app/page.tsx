import { wpApi } from '@helpers/handleWpApi'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { WpQuizzesPostTypeResponse } from '@/types/wpQuizzesPostTypeResponse'

interface SearchParamsProps {
    searchParams: {
        quiz_id: string,
        name: string,
        email: string,
    }
}

const MainPage: NextPage<SearchParamsProps> = async (params) => {
    const { quiz_id, name, email } = params.searchParams

    if (quiz_id && name && email) {
        const wpRequest: WpQuizzesPostTypeResponse = await wpApi(`quizzes/${quiz_id}`)
        const quizSlug = wpRequest.slug

        redirect(`/quizzes/${quizSlug}/`)
    }

    redirect('/login')
}

export default MainPage