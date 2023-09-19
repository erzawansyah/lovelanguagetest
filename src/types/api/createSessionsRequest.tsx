// use for createSessionsRequest in the start of the quiz
export interface UserInitialData {
    uuid: string;
    user_name: string;
    user_email: string;
    quiz_id: number;
    start_date: string;
    finish_date?: string;
    duration?: number;
    user_os?: string;
    user_browser?: string;
    user_agent?: string;
}

export interface WpCreateSessionRequestBody {
    title: string;
    status: 'publish';
    acf: Omit<UserInitialData, 'uuid'>;
}
export type WpUpdateSessionRequestBody = Omit<UserInitialData, 'uuid' | 'user_name' | 'user_email' | 'quiz_id'>;

export interface UserSession {
    session_id: number;
    session_uuid: string;
    quiz_id: number;
    start_date: string;
    user: {
        user_name: string;
        user_email: string;
    }
}
