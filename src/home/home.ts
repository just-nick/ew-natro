import { Hero } from './../hero/hero';
import { PrismicData, ImageContent } from './../common/content';

export interface Home extends PrismicData {
    hero_banner: Hero[];
    quote: string;
    by_line: string;
    quote_photo: ImageContent;
}