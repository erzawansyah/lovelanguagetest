import { wpApi } from '@helpers/handleWpApi'
import { NextPage } from 'next'
import { redirect } from 'next/navigation'
import { WpQuizzesPostTypeResponse } from '@/types/wpQuizzesPostTypeResponse'
import WaitingCookies from '@frontend/(components)/WaitingForCookies'

/**
 * Props for the main page component.
 */
interface SearchParamsProps {
    searchParams: {
        quiz_id: string,
        name: string,
        email: string,
    }
}

/**
 * The main page component.
 * @param params The search parameters for the quiz.
 * @returns The main page component.
 */
const MainPage: NextPage<SearchParamsProps> = async (params) => {
    const { quiz_id, name, email } = params.searchParams

    // get slug from quiz_id
    if (quiz_id && name && email) {
        const wpRequest: WpQuizzesPostTypeResponse = await wpApi(`quizzes/${quiz_id}`)
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

