import { WpCustomPostType } from "./wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export type WpQuestionsPostTypeResponse = WpCustomPostType<WpQuestionsCustomFields>;

interface WpQuestionsCustomFields {
    q_statement: string;
    choices: {
        c_statement: string;
        value: number | string;
    }[]
}