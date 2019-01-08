import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.news) {
        for(const news of props.news) {
            if (news.id === props.match.params.id) {
                return <section className="container">

                    <div className="custom page-hero">
                        <span className="custom" style={{backgroundImage: `url('${news.feature_image.url}')`}}></span>
                        <h1>{news.title.split(' ').map((part, i) => (<span key={i}>{part}</span>))}</h1>
                    </div>

                    <h2>{news.title}</h2>

                    {writeText(news.content)}

                </section>;
            }

            return <h1>Story not found...</h1>
        }
    }

    return <LoaderComponent />
}

export const NewsComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);