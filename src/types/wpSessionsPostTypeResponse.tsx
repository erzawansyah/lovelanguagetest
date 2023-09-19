import { WpCustomPostType } from "./wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export type WpSessionPostTypeResponse = WpCustomPostType<WpSessionsCustomField>;

interface WpSessionsCustomField {
    user_name: string,
    user_email: string,
    quiz_id: number,
    start_date: string,
    finish_date: string,
    duration: number,
    user_os?: string,
    user_browser?: string,
    user_agent?: string,
    quiz_answers?: number[]
}