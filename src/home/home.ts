import { Hero } from './../hero/hero';
import { PrismicData, TextContent, ImageContent } from './../common/content';

export interface Home extends PrismicData {
    hero_banner: Hero[],
    quote: TextContent[],
    by_line: TextContent[]
    quote_photo: ImageContent
}