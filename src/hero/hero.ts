import { TextContent, ImageContent } from './../common/content';
export interface Hero {
    title: TextContent[];
    content: TextContent[];
    cta: {
        label: string;
        url: string;
    };
    image: ImageContent;
}