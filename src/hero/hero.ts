import { ImageContent } from './../common/content';
export interface Hero {
    title: string;
    content: string;
    cta: {
        label: string;
        url: string;
    };
    image: ImageContent;
}