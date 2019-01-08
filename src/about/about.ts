import { PrismicData, TextContent, ImageContent } from './../common/content';

export interface About extends PrismicData {
    heading: string;
    content: TextContent[];
    image: ImageContent;
}