import { Blog } from "./blog";
import { BlogHighlightComponent } from "./blog-highlight.component";
import React from "react";

type Props = {
    blogs: Blog[]
}

export const BlogHighlightListComponent: React.StatelessComponent<Props> = (props) => {
    console.log('List', props);
    return (
        <div className='blog-highlight-list-component'>
            {props.blogs.map((blog, i) => <BlogHighlightComponent key={i} blog={blog} />)}
        </div>
    );
}