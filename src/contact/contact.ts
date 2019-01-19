import { PrismicData, ImageContent, TextContent } from './../common/content';

export interface Contact extends PrismicData {
    content: TextContent[],
    image: ImageContent
}
