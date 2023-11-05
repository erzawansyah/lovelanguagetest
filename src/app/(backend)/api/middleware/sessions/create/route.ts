import { wpApi } from "@/helpers/handleWpApi";
import {
  UserSession,
  WpCreateSessionRequestBody,
} from "@/types/api/createSessionsRequest";
import { WpSessionPostTypeResponse } from "@/types/wpSessionsPostTypeResponse";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
// to create a session, we need to get the name, email, and quiz id from the request body

type RequestBody = {
  name: string;
  email: string;
  quizId: string | number;
};

export const POST = async (req: NextRequest) => {
  const body = (await req.json()) as RequestBody;
  const { name, email, quizId } = body;
  const sessionId = uuidv4();
  const start_date = Date.now().toString();

  const preparedBody: WpCreateSessionRequestBody = {
    title: sessionId,
    status: "publish",
    acf: {
      user_name: name,
      user_email: email,
      quiz_id: Number(quizId),
      start_date,
    },
  };

  const wpRequest: WpSessionPostTypeResponse = await wpApi("quiz_sessions", {
    method: "POST",
    body: JSON.stringify(preparedBody),
  });

  const session: UserSession = {
    session_id: wpRequest.id,
    session_uuid: wpRequest.slug,
    quiz_id: wpRequest.acf.quiz_id,
    start_date: wpRequest.acf.start_date,
    user: {
      user_name: wpRequest.acf.user_name,
      user_email: wpRequest.acf.user_email,
    },
  };
  return NextResponse.json(session, {
    status: 200,
  });
};
