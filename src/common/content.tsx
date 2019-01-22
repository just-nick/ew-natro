import React from 'react';
import { TextContent } from './content';
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
    | 'list-item'
    | 'b'
    | 'c'
    | 'd',
    url: string,
}

const TextTypeMapping: { [key: string]: string } = {
    'heading1': 'h1',
    'heading2': 'h2',
    'heading3': 'h3',
    'heading4': 'h4',
    'heading5': 'h5',
    'heading6': 'h6',
    'paragraph': 'p',
    'image': 'img',
    'list-item': 'li'
};

export function writeText(content: TextContent[]): React.ReactNode {
    const children = [];
    for (let i = 0; i < content.length; i++) {
        const item = content[i];

        if (item.type === 'list-item') {
            const list = [];
            while (content[i] && content[i].type === 'list-item') {
                list.push(<li key={i}>{content[i].text}</li>);
                i++;
            }
            children.push(<ul key={i}>{list}</ul>)
        } else if (item.type === 'image') {
            const list = [];

            while (content[i] && content[i].type === 'image') {
                list.push(<span>
                    <img key={i} src={item.url} alt="" />
                </span>);
                i++;
            }
            children.push(<div className={"image-block"} key={i}>{list}</div>)
        } else {
            const Tag = TextTypeMapping[item.type];
            children.push(<Tag key={i}>{item.text.split('\n').map((s, i) => (
                <React.Fragment key={i}>{s}<br /></React.Fragment>
            ))}</Tag>);
        }
    }
    return <>{children}</>
}

export interface ImageContent {
    alt: string,
    dimensions: {
        width: number,
        height: number
    },
    url: string
}