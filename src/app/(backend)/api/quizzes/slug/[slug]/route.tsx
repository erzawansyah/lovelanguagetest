import { wpApi } from "@/helpers/handleWpApi";
import { WpQuizzesPostTypeResponse } from "@/types/wpQuizzesPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";
import { QuizApiResponse } from "../../types";


type Params = {
    slug: string;
};

export const GET = async (
    req: NextRequest,
    context: { params: Params }
) => {
    const { slug } = context.params;
    const wpRequest: Promise<[WpQuizzesPostTypeResponse]> = await wpApi(
        `quizzes/?slug=${slug}`
    );
    const wpResponse = await wpRequest
    const quizData = wpResponse[0];
    if (!quizData) {
        throw new Error("Quiz not found");
    }
    
    const data: QuizApiResponse = {
        id: quizData.id,
        title: quizData.title.rendered,
        slug: quizData.slug,
        description: quizData.acf.quiz_description,
        instruction: quizData.acf.quiz_instruction,
        image_id: quizData.featured_media,
        category_ids: quizData.ll_classification,
        page: quizData.acf.quiz_flow.map((item, i) => {
            return {
                id: i + 1,
                layout: item.acf_fc_layout,
                data: item.question_item,
            };
        }),
        question_ids: quizData.acf.quiz_flow
            .filter((item) => item.acf_fc_layout === "questions")
            .map((item) => item.question_item as number),
    };
    return NextResponse.json(data);
};
