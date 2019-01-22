import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { PageHeroComponent } from "../page-hero/page-hero.component";
import { Blog } from "./blog";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.blogs) {
        const blog = getBlog(props.match.params.id, props.blogs);
        if (blog) {
            return <section className="container">

                <PageHeroComponent heading={blog.title} image={blog.feature_image.url} />

                <h2>{blog.title}</h2>

                {writeText(blog.body)}

            </section>;
        }

        return <section className="container"><h2>Story not found...</h2></section>
    }

    return <LoaderComponent />
}

function getBlog(id: string, blogs: Blog[]): Blog | null {
    for (const blog of blogs) {
        console.log(blogs, blog.id, ' === ', id);
        if (blog.id === id) {
            return blog;
        }
    }

    return null;
}

export const BlogComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);