import { PrismicData, ImageContent, TextContent } from './../common/content';

export interface HealthProgram extends PrismicData {
    title: string;
    image: ImageContent;
    thumbnail: ImageContent;
    content: TextContent[];
}