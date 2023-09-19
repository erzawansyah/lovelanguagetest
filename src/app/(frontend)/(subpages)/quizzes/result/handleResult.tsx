import { CreateAnswersResponseBody } from "@/app/(backend)/api/answers/route"
import { wpApi } from "@/app/(helper)/handleWpApi"
import { QuizSettingsState, ResultState } from "./page"
import { WpLanguagesPostTypeResponse } from "@/types/wpLanguagesPostTypeResponse"
import { WpDefaultPostTypeResponse } from "@/types/wpDefaultPostTypeResponse"

export const getSettings = async (qId: number) => {
    const wpRequest = await wpApi(`quizzes/${qId}`)
    const mapping = wpRequest.acf.c_mapping.map((item: any) => ({
        value: item.c_value,
        result_id: item.c_output
    }))

    return mapping
}


type FeaturedImageItem = { id: number, url: string }
type ResultItem = {
    result_id: number,
    title: string,
    subtitle: string,
    excerpt: string,
    image: number,
}

export const handleResult = async (
    data: CreateAnswersResponseBody,
    settings: QuizSettingsState[]
): Promise<ResultState[]> => {
    const resultIds: string = settings.map((item) => item.result_id).join(',')
    const wpRequest: WpLanguagesPostTypeResponse[] = await wpApi(`languages?include=${resultIds}`)

    const results: ResultItem[] = wpRequest.map((item: WpLanguagesPostTypeResponse) => ({
        result_id: item.id,
        title: item.title.rendered,
        subtitle: item.acf.subtitle,
        excerpt: item.acf.excerpt,
        image: item.featured_media,
    }))

    const featuredMedia: FeaturedImageItem[] = await wpApi(`media?include=${results.map((item) => item.image).join(',')}`)
        .then((res: WpDefaultPostTypeResponse[]) => res.map((item) => ({
            id: item.id,
            url: item.guid.rendered,
        })))

    const groupped = settings.map((item) => {
        const match = data.answers.filter((answer) => answer.answer_value === item.value)
        const details = results.filter((rItem: ResultItem) => rItem.result_id === item.result_id)[0]
        const image = featuredMedia.filter((fItem: FeaturedImageItem) => fItem.id === details.image)[0]
        return {
            value: item.value,
            result_id: item.result_id,
            answers: match,
            count: match.length,
            image: image.url,
            title: details.title,
            subtitle: details.subtitle,
            excerpt: details.excerpt,
        }
    }).sort((a, b) => b.count - a.count)

    return groupped
}

