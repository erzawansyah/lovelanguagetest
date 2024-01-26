import { WpCustomPostType } from "@definition/wpDefaultPostTypeResponse";

// Add the layout type to the interface based on the afc_fc_layout name in the backend 
export interface WpLanguagesPostTypeResponse extends WpCustomPostType<WpLanguagesCustomFields> {
    featured_media: number;

}

interface WpLanguagesCustomFields {
    results: string;
    colours: string;
    subtitle: string;
    excerpt: string;
    description: string;
}
