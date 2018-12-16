import { TextContent, PrismicData, ImageContent } from './../common/content';
export interface Blog extends PrismicData {
    title: TextContent[];
    body: TextContent[];
    feature_image: ImageContent;
}
