import { DataState } from "../common/reducer";
import { DispatchProp, connect } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import React from "react";
import { writeText } from "../common/content";

import './contact.scss';

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.contact) {
        return <div className="container">
            <section className="contact-component">
                <div className="content">
                    {writeText(props.contact.content)}
                </div>

                <div className="image" style={{ backgroundImage: `url('${props.contact.image.url}')` }}></div>
            </section>
        </div>;
    }

    return <LoaderComponent />;
}

export const ContactComponent = connect<DataState, {}, DataState>((state) => state)(Component);