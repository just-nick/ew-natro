import React from "react";
import { LoaderComponent } from "../loader/loader.component";
import { connect, DispatchProp } from "react-redux";
import { DataState } from "../common/reducer";
import { RouteProps, RouterProps } from "react-router";

import './health-program.scss';
import { Link } from "react-router-dom";

const Component: React.StatelessComponent<RouterProps & DispatchProp & DataState> = (props) => {
    if (props.healthPrograms) {

        return (
            <div className="container">
                <h2>Health Programs</h2>

                {props.healthPrograms.map((program, i) => {            
                    const image = <span className="image" style={{backgroundImage: `url('${program.image.url}')`}}></span>

                    return <Link to={`/services/health-programs/${program.id}`} key={i} className="health-program-highlight">
                        <h2>{program.title}</h2>
                        {image}
                    </Link>
                })}
            </div>
        );
    }

    return <LoaderComponent />
}

export const HealthProgramListComponent = connect<DataState, RouteProps, DataState>((state) => state)(Component);