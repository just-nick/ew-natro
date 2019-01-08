import React from "react";
import { PageHeroComponent } from "../page-hero/page-hero.component";
import { connect, DispatchProp } from "react-redux";
import { DataState } from "../common/reducer";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.about) {
        return (
            <div className='container'>
                <PageHeroComponent heading={props.about.heading} image={props.about.image.url} />
                {writeText(props.about.content)}
            </div>
        );
    }

    return <LoaderComponent />;
}

export const AboutComponent = connect<DataState, {}, {}>((state) => state)(Component);