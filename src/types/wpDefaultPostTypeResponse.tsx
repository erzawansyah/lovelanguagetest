export interface WpRequiredPostTypeResponse {
    id: number;
    date: string;
    date_gmt: string;
    guid: { rendered: string };
    modified: string;
    modified_gmt: string;
    slug: string;
    status: string;
    type: string;
    link: string;
    title: { rendered: string };
    template?: string;
    _links: {
        self: { href: string }[];
        collection: { href: string }[];
        about: { href: string }[];
        'wp:featuredmedia': { embeddable: boolean; href: string }[];
        'wp:attachment': { href: string }[];
        'wp:term': { taxonomy: string; embeddable: boolean; href: string }[];
        curies: { name: string; href: string; templated: boolean }[];
    }
}

export interface WpDefaultPostTypeResponse extends WpRequiredPostTypeResponse {
    content: { rendered: string; protected: boolean };
    excerpt: { rendered: string };
    author: number;
    comment_status: string;
    ping_status: string;
    format: string;
    sticky: boolean;
    featured_media?: number;
    meta: any
}

export interface WpCustomPostType<CustomFields> extends WpRequiredPostTypeResponse {
    acf: CustomFields;
}