import React from "react";
import { DataState } from "../common/reducer";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.services) {
        return <div className="container">

            <div className="service page-hero">
                <h1>
                    <span>The</span>
                    <span>Clinic</span>
                </h1>
            </div>

            {props.services.map((service, i) => {
                return (
                    <div className="block-item" key={i} id={service.id}>
                        <div className="feature">
                            <img src={service.image.url} alt="" />
                            <button>Enquire Now</button>
                        </div>
                        <div className="content">
                            <h2>{service.title}</h2>
                            {writeText(service.description)}
                        </div>
                    </div>
                );
            })}

            <div>
                
            </div>
        </div>
    }

    return <LoaderComponent />
}

export const ServiceListComponent = connect<DataState, {}, DataState>((state) => state)(Component);