import { Blog } from "./blog";
import React from "react";
import { Link } from "react-router-dom";

type Props = {
    blog: Blog
}

export const BlogHighlightComponent: React.StatelessComponent<Props> = (props) => {
    return (
        <Link data-background={props.blog.featuredImage} to={`/blog/${props.blog.id}`}>
            {props.blog.title}
        </Link>
    );
}