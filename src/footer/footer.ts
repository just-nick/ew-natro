import { PrismicData, ImageContent } from './../common/content';
export interface Footer extends PrismicData {
    social_links: Array<{
        image: ImageContent,
        platform_name: string,
        link: {
            url: string
        }
    }>;
}