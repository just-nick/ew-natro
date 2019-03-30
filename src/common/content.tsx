import React from 'react';
import { TextContent } from './content';
export interface PrismicData {
    id: string,
    slugs: string[],
    tags: string[],
    type: string
}

export interface TextContent {
    spans: any[],
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
    'list-item': 'li',
    'o-list-item': 'li'
};

export function writeText(content: TextContent[]): React.ReactNode {
    const children = [];
    for (let i = 0; i < content.length; i++) {
        const item = content[i];

        if (item.type === 'list-item') {
            const list = [];
            while (content[i] && content[i].type === 'list-item') {
                list.push(<li key={i}>{writeTextNode(content[i])}</li>);
                i++;
            }

            i--;
            children.push(<ul key={i}>{list}</ul>);
        } else if (item.type === 'image') {
            const list = [];

            while (content[i] && content[i].type === 'image') {
                const image = content[i] as any as ImageContent;
                const style = { flexGrow: image.dimensions.width / image.dimensions.height };
                list.push(<span key={i} style={style}>
                    <img src={image.url} alt="" />
                </span>);
                i++;
            }

            i--;
            children.push(<div className={"image-block"} key={i}>{list}</div>);
        } else {
            const Tag = TextTypeMapping[item.type];
            if (Tag) {
                children.push(<Tag key={i}>{writeTextNode(item)}</Tag>);
            } else {
                console.error('Unable to map tag type', item.type);
            }
        }
    }
    return <>{children}</>
}

export function writeTextNode(item: TextContent) {
    const content = [];

    if (item.spans.length > 0) {
        if (item.spans[0].start !== 0) {
            content.push(newLines(item.text.slice(0, item.spans[0].start)));
        }

        let i = 0;
        for (const span of item.spans) {
            const text = newLines(item.text.slice(span.start, span.end));

            if (span.type === 'hyperlink') {
                content.push(<a href={span.data.url} key={i}>{text}</a>);
            } else {
                content.push(<span.type key={i}>{text}</span.type>);
            }
            i++;
        }

        if (item.spans[item.spans.length - 1].end !== item.text.length) {
            content.push(newLines(item.text.slice(item.spans[item.spans.length - 1].end, item.text.length)));
        }
    } else {
        content.push(newLines(item.text));
    }

    return content;
}

function newLines(fullString: string) {
    return fullString.split('\n').map((s, i) => (
        <React.Fragment key={i}>{s}<br /></React.Fragment>
    ));
}

export interface ImageContent {
    alt: string,
    dimensions: {
        width: number,
        height: number
    },
    url: string
}