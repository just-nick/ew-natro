import React from "react";
import { PageHeroComponent } from "../page-hero/page-hero.component";
import { connect, DispatchProp } from "react-redux";
import { DataState } from "../common/reducer";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";

import './about.scss';

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.about) {
        return (
            <div>
                <div className='container'>
                    <PageHeroComponent heading={props.about.heading} image={props.about.image.url} />
                    {writeText(props.about.content)}
                </div>

                <div className="about-badges">
                    <div className="container">
                        <span className="logo item"></span>
                        <span className="item"><span>Bachelor of health science naturopathy</span></span>
                        <span className="item"><span>Masters of womens health medicine</span></span>
                        <span className="item"><span>Member of the australian traditional medicine society</span></span>
                    </div>
                </div>
            </div>
        );
    }

    return <LoaderComponent />;
}

export const AboutComponent = connect<DataState, {}, {}, DataState>((state) => state)(Component);