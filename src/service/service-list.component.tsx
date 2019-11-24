import React from "react";
import { DataState, OpenOverlay } from "../common/reducer";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";
import { PageHeroComponent } from "../page-hero/page-hero.component";

import "./service-list.scss";
import { RouteProps } from "react-router";
import { QuotesComponent } from "./quotes.component";

class Component extends React.Component<DataState & DispatchProp & RouteProps, {}> {
    componentDidMount() {
        this.updateHeight();
    }

    componentDidUpdate() {
        this.updateHeight();
    }

    updateHeight() {
        const location = this.props.location;
        if (location && location.hash && location.hash.length > 1) {
            const target = document.getElementById(location.hash.replace('#', ''));
            if (target) {
                const topOfElement = target.offsetTop;
                window.scroll({ top: topOfElement });
            }
        }
    }

    public enquire(service: string, url: string) {
        return () => {
            this.props.dispatch(OpenOverlay(service, url));
        }
    }

    render() {
        const props = this.props;

        if (props.services && props.serviceLanding) {
            return <div>
                <div className="service-list container">

                    <PageHeroComponent heading={props.serviceLanding.title[0].text} image={props.serviceLanding.header_image.url} />

                    {props.services
                        .sort((a, b) => a.order && b.order ? a.order - b.order : 0)
                        .map((service, i) => {
                        return (
                            <div className="block-item" key={i} id={service.id}>
                                <div className="feature">
                                    <img src={service.image.url} alt="" />
                                    <button onClick={this.enquire(service.title, service.image.url)}>Enquire Now</button>
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
                                <strong className="price">
                                    ${price.price.toFixed(2)} <small>{price.disclaimer}</small>
                                </strong>
                            </div>
                        ))}
                    </div>

                    <button onClick={this.enquire('Book an appointment', '')}>Book an appointment</button>
                </div>

                <div className="container">
                    <QuotesComponent quotes={props.serviceLanding.quotes} />
                </div>
            </div>
        }

        return <LoaderComponent />
    }
}

export const ServiceListComponent = connect<DataState, RouteProps, DataState, DataState>((state) => state)(Component);