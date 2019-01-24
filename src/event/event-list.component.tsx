import React from "react";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { DataState } from "../common/reducer";
import { Link } from "react-router-dom";

import './event.scss';

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.events) {
        return <div className="container">

            <h2>The Latest events</h2>

            {props.events.map((event, i) => {
                return (
                    <div className="block-item event-item" key={i}>
                        <div className="feature" style={{backgroundImage: `url('${event.feature_image.url}')`}}></div>
                        <div className="content">
                            <h2>{event.title}</h2>
                            <p>{event.summary}</p>
                            <p>
                                <strong>Date:</strong> {event.date}<br />
                                <strong>Time:</strong> {event.time}
                            </p>
                            <Link to={`/news/events/${event.id}`}>More Info</Link>
                        </div>
                    </div>
                );
            })}
        </div>
    }

    return <LoaderComponent />
}

export const EventListComponent = connect<DataState, {}, DataState>((state) => state)(Component);
