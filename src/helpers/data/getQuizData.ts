import { QuizApiResponse } from "@/app/(backend)/api/quizzes/types";
import { handleLocalFetch } from "../handleLocalFetch";

export const getQuizById = async (id: string) => {
  const request: Response = await handleLocalFetch(`/api/quizzes/${id}`, {
    next: {
      revalidate: 60 * 60,
    },
  });
  const response: QuizApiResponse = await request.json();
  return response;
};

export const getQuizBySlug = async (slug: string) => {
  const request: Response = await handleLocalFetch(
    `/api/quizzes/slug/${slug}`,
    {
      next: {
        revalidate: 60 * 60,
      },
    }
  );
  const response: QuizApiResponse = await request.json();
  return response;
};
