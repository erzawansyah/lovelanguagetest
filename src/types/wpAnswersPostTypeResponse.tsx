import { WpCustomPostType } from "@definition/wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export type WpAnswersPostTypeResponse = WpCustomPostType<WpAnswerssCustomField>;

interface WpAnswerssCustomField {
    session_id: number,
    quiz_id: number,
    answer_value: string,
}