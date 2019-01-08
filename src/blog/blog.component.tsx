import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { PageHeroComponent } from "../page-hero/page-hero.component";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.blogs) {
        for(const blog of props.blogs) {
            if (blog.id === props.match.params.id) {
                return <section className="container">

                    <PageHeroComponent heading={blog.title[0].text} image={blog.feature_image.url} />

                    <h2>{blog.title[0].text}</h2>

                    {writeText(blog.body)}

                </section>;
            }

            return <h1>Story not found...</h1>
        }
    }

    return <LoaderComponent />
}

export const BlogComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);