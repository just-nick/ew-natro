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
                const title = news.title ? news.title.split(' ') : ['No', 'title', 'set'];
                return <section className="container">

                    <div className="custom page-hero">
                        <span className="custom" style={{backgroundImage: `url('${news.thumbnail.url}')`}}></span>
                        <h1>{title.map((part, i) => (<span key={i}>{part}</span>))}</h1>
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