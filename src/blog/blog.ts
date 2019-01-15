import { TextContent, PrismicData, ImageContent } from './../common/content';
export interface Blog extends PrismicData {
    title: string;
    body: TextContent[];
    feature_image: ImageContent;
}
