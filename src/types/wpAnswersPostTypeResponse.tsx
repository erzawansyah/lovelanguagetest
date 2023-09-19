import { WpCustomPostType } from "./wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export type WpAnswersPostTypeResponse = WpCustomPostType<WpAnswerssCustomField>;

interface WpAnswerssCustomField {
    session_id: number,
    question_id: number,
    question_number: number,
    answer_value: number | string,
    answer_label?: string
}