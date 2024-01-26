import { WpCustomPostType, WpDefaultPostTypeResponse } from "@definition/wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export type WpQuizzesPostTypeResponse = WpCustomPostType<WpQuizzesCustomFields> & {
    ll_classification: number[];
}

export type QuizContentAcfFcLayout = "questions" | "section_start" | "section_end";
interface WpQuizzesCustomFields {
    quiz_flow: {
        acf_fc_layout: QuizContentAcfFcLayout;
        question_item?: number;
    }[],
    quiz_summary: string;
    quiz_description: string;
    quiz_instruction: string;
}