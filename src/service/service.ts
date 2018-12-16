import { TextContent, ImageContent } from './../common/content';
import { PrismicData } from "../common/content";

export interface Service extends PrismicData {
    title: string,
    description: TextContent[];
    image: ImageContent;
}