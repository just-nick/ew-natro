import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { SharePanelComponent } from "../share-panel/share-panel.component";
import { PageHeroComponent } from "../page-hero/page-hero.component";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.events) {
        for(const event of props.events) {
            if (event.id === props.match.params.id) {
                return <section className="container">
                    <PageHeroComponent image={event.thumbnail.url} heading={event.title} />

                    {writeText(event.content)}

                    <SharePanelComponent title={event.title} />
                </section>;
            }

            return <Redirect to="/news/events" />;
        }
    }

    return <LoaderComponent />
}

export const EventComponent = connect<DataState, RouteComponentProps, DataState, DataState>((state) => state)(Component);