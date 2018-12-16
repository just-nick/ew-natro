import { Blog } from "./blog";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import './blog-highlight.component.scss';

type Props = {
    blog: Blog
}

export const BlogHighlightComponent: React.StatelessComponent<Props> = (props) => {
    console.log(props.blog);
    const style: CSSProperties = {
        backgroundImage: `url('${props.blog.feature_image.url}')`
    }

    return (
        <Link className="blog-highlight-component" style={style} to={`/blog/${props.blog.id}`}>
            <span>{props.blog.title[0].text}</span>
        </Link>
    );
}