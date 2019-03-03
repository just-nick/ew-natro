import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { SharePanelComponent } from "../share-panel/share-panel.component";
import { PageHeroComponent } from "../page-hero/page-hero.component";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.news) {
        for(const news of props.news) {
            if (news.id === props.match.params.id) {
                return <section className="container">
                    <PageHeroComponent image={news.thumbnail.url} heading={news.title} />

                    {writeText(news.content)}

                    <SharePanelComponent title={news.title} />

                </section>;
            }

            return <Redirect to="/news" />;
        }
    }

    return <LoaderComponent />
}

export const NewsComponent = connect<DataState, RouteComponentProps, DataState, DataState>((state) => state)(Component);