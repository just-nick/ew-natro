import { TextContent, ImageContent } from './../common/content';
import { PrismicData } from "../common/content";

export interface News extends PrismicData {
    title: string,
    summary: string;
    content: TextContent[];
    feature_image: ImageContent;
    thumbnail: ImageContent;
}