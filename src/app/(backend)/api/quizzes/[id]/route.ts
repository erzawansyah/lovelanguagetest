import { wpApi } from "@/helpers/handleWpApi";
import { WpQuizzesPostTypeResponse } from "@/types/wpQuizzesPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";

import { QuizApiParams, QuizApiResponse } from "../types";

export const GET = async (
  req: NextRequest,
  context: { params: QuizApiParams }
) => {
  const { id } = context.params;
  const wpRequest: Promise<WpQuizzesPostTypeResponse> = await wpApi(
    `quizzes/${id}`
  );
  const wpResponse = await wpRequest;

  const data: QuizApiResponse = {
    id: wpResponse.id,
    title: wpResponse.title.rendered,
    slug: wpResponse.slug,
    description: wpResponse.acf.quiz_description,
    instruction: wpResponse.acf.quiz_instruction,
    image_id: wpResponse.featured_media,
    category_ids: wpResponse.ll_classification,
    page: wpResponse.acf.quiz_flow.map((item, i) => {
      return {
        id: i + 1,
        layout: item.acf_fc_layout,
        data: item.question_item,
      };
    }),
    question_ids: wpResponse.acf.quiz_flow
      .filter((item) => item.acf_fc_layout === "questions")
      .map((item) => item.question_item as number),
  };
  return NextResponse.json(data);
};
