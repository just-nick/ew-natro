import { TextContent, ImageContent } from './../common/content';
import { PrismicData } from "../common/content";

export interface Service extends PrismicData {
    title: string,
    description: TextContent[];
    image: ImageContent;
}

export interface ServiceLanding extends PrismicData {
    title: TextContent[];
    header_image: ImageContent;
    pricing: Array<{
        description: TextContent[],
        price: number
    }>;
}