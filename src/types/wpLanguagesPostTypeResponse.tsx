import { WpCustomPostType, WpDefaultPostTypeResponse } from "./wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export interface WpLanguagesPostTypeResponse extends WpCustomPostType<WpLanguagesCustomFields> {
    featured_media: number;
}

interface WpLanguagesCustomFields {
    subtitle: string;
    excerpt: string;
    description: string;
}