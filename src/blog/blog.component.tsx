import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../service/service.reducer";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.blogs) {
        for(const blog of props.blogs) {
            if (blog.id === props.match.params.id) {
                return <section className="container">

                    <div className="custom page-hero">
                        <span className="custom" style={{backgroundImage: `url('${blog.feature_image.url}')`}}></span>
                        <h1>{blog.title[0].text.split(' ').map((part, i) => (<span key={i}>{part}</span>))}</h1>
                    </div>

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