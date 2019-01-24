import React from "react";
import { DataState } from "../common/reducer";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";
import { PageHeroComponent } from "../page-hero/page-hero.component";

import "./service-list.scss";
import { RouteProps } from "react-router";

const Component: React.StatelessComponent<DataState & DispatchProp & RouteProps> = (props) => {
    if (props.services && props.serviceLanding) {
        if (props.location && props.location.hash) {
            const elm = document.getElementById(props.location.hash.replace('#', ''));

            if (elm) {
                elm.scrollIntoView(true);
            }
        }

        return <div>
            <div className="container">

                <PageHeroComponent heading={props.serviceLanding.title[0].text} image={props.serviceLanding.header_image.url} />

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
                
                <h2>Consultations with Emma</h2>
            </div>

            <div className='prices'>
                <div className='container'>
                    {props.serviceLanding.pricing.map((price, i) => (
                        <div key={i}>
                            <h3>0{i + 1}.</h3>
                            {writeText(price.description)}
                            <strong className="price">${price.price}</strong>
                        </div>
                    ))}
                </div>

                <button>Book an appointment</button>
            </div>
        </div>
    }

    return <LoaderComponent />
}

export const ServiceListComponent = connect<DataState, RouteProps, DataState>((state) => state)(Component);