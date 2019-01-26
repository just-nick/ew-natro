import React from "react";
import { connect, DispatchProp } from "react-redux";
import { writeText, PrismicData, TextContent } from "../common/content";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.faqs) {
        return <section className="container">
            <h2>{props.faqs.title[0].text}</h2>
            {writeText(props.faqs.content)}
        </section>;
    }

    return <LoaderComponent />
}

export const FaqsComponent = connect<DataState, {}, DataState>((state) => state)(Component);

export interface Faqs extends PrismicData {
    title: TextContent[];
    content: TextContent[];
}