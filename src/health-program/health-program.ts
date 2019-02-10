import { PrismicData, ImageContent, TextContent } from './../common/content';

export interface HealthProgram extends PrismicData {
    title: string;
    image: ImageContent;
    icon: ImageContent;
    thumbnail: ImageContent;
    content: TextContent[];
}