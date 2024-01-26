import { WpQuizzesPostTypeResponse } from "@/types/wpQuizzesPostTypeResponse";

export type QuizApiParams = {
  id: string;
};

export type QuizApiResponse = {
  id: number;
  title: string;
  slug: string;
  description: string;
  instruction: string;
  image_id?: number;
  category_ids?: number[] | [];
  page: {
    id: number;
    layout: WpQuizzesPostTypeResponse["acf"]["quiz_flow"][0]["acf_fc_layout"];
    data: any;
  }[];
  question_ids: number[];
};
