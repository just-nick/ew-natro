import React from "react";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../service/service.reducer";
import { BlogHighlightComponent } from "./blog-highlight.component";

type Props = DataState & DispatchProp;

export const Component: React.StatelessComponent<Props> = (props) => {
    if (props.blogs) {
        return (
            <div className="container">
                <div className='blog-highlight-list-component'>
                    {props.blogs.map((blog, i) => <BlogHighlightComponent key={i} blog={blog} />)}
                </div>
            </div>
        );
    }

    return <LoaderComponent />;
}

export const BlogListComponent = connect<DataState, {}, DataState>((state) => state)(Component);