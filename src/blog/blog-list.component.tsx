import React from "react";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { BlogHighlightComponent } from "./blog-highlight.component";
import { RouteComponentProps } from "react-router";

type Props = DataState & DispatchProp & RouteComponentProps;

export const Component: React.StatelessComponent<Props> = (props) => {
    if (props.blogs) {
        const locationParts = props.location.pathname.split('/');
        let blogs = props.blogs;
        let title = "Emma's Blog";

        if (locationParts.length > 2 && locationParts[2] !== '') {
            const type = locationParts[2].toLowerCase();
            blogs = blogs.filter((blog) => blog.category.toLowerCase() === type);
            title = "Emma's Blog - " + toTitleCase(type);
        }

        if (blogs.length === 0) {
            return <div className="container">
                <h2>{title}</h2>
                <h3>Sorry, we couldn't find any blogs for you</h3>
            </div>;
        }

        return (
            <div className="container">
                <h2>{title}</h2>
                <div className='blog-highlight-list-component'>
                    {blogs.map((blog, i) => <BlogHighlightComponent key={i} blog={blog} />)}
                </div>
            </div>
        );
    }

    return <LoaderComponent />;
}

function toTitleCase(str: string): string {
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const BlogListComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);