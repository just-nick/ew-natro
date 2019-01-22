import React from "react";
import { DataState } from "../common/reducer";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { writeText } from "../common/content";
import { PageHeroComponent } from "../page-hero/page-hero.component";

import "./service-list.scss";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    if (props.services && props.serviceLanding) {
        return <>
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
            </div>

            <div className='container'>
                <h2>Consultations with Emma</h2>
            </div>

            <section className='prices'>
                <div className='container'>
                    <div>
                        <h3>01.</h3>
                        <p>Lorem ipsum dolar</p>
                        <strong>$1000</strong>
                    </div>
                    <div>
                        <h3>02.</h3>
                        <p>Lorem ipsum dolar</p>
                        <strong>$1000</strong>
                    </div>
                    <div>
                        <h3>03.</h3>
                        <p>Lorem ipsum dolar</p>
                        <strong>$1000</strong>
                    </div>
                    <div>
                        <h3>04.</h3>
                        <p>Lorem ipsum dolar</p>
                        <strong>$1000</strong>
                    </div>
                </div>

                <button>Book an appointment</button>
            </section>
        </>
    }

    return <LoaderComponent />
}

export const ServiceListComponent = connect<DataState, {}, DataState>((state) => state)(Component);