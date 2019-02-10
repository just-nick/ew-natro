import React from "react";
import { connect, DispatchProp } from "react-redux";
import { writeText, PrismicData, TextContent } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.privacy) {
        return <section className="container">
            <h2>{props.privacy.title[0].text}</h2>
            {writeText(props.privacy.content)}
        </section>;
    }

    return <LoaderComponent />
}

export const PrivacyComponent = connect<DataState, {}, {}, DataState>((state) => state)(Component);

export interface Privacy extends PrismicData {
    title: TextContent[];
    content: TextContent[];
}