export interface PrismicData {
    id: string,
    slugs: string[],
    tags: string[],
    type: string
}

export interface TextContent {
    spans: [],
    text: string,
    type: 'heading1'
        | 'heading2'
        | 'heading3'
        | 'heading4'
        | 'heading5'
        | 'heading6'
        | 'paragraph'
        | 'image'
        | 'a'
        | 'b'
        | 'c'
        | 'd'
}

export interface ImageContent {
    alt: string,
    dimensions: {
        width: number,
        height: number
    },
    url: string
}