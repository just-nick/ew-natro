import React from "react";
import { connect, DispatchProp } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { writeText } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { SharePanelComponent } from "../share-panel/share-panel.component";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteComponentProps<any>> = (props) => {
    if (props.events) {
        for(const event of props.events) {
            if (event.id === props.match.params.id) {
                const title = event.title ? event.title.split(' ') : ['No', 'title', 'set'];
                return <section className="container">

                    <div className="custom page-hero">
                        <span className="custom" style={{backgroundImage: `url('${event.thumbnail.url}')`}}></span>
                        <h1>{title.map((part, i) => (<span key={i}>{part}</span>))}</h1>
                    </div>

                    {writeText(event.content)}

                    <SharePanelComponent />
                </section>;
            }

            return <h1>Story not found...</h1>
        }
    }

    return <LoaderComponent />
}

export const EventComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);