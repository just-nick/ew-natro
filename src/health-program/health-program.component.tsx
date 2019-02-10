import React from "react";
import { LoaderComponent } from "../loader/loader.component";
import { connect, DispatchProp } from "react-redux";
import { DataState } from "../common/reducer";
import { RouteComponentProps, Redirect } from "react-router";

import './health-program.scss';
import { HealthProgram } from "./health-program";
import { PageHeroComponent } from "../page-hero/page-hero.component";
import { writeText } from "../common/content";

const Component: React.StatelessComponent<RouteComponentProps<any> & DispatchProp & DataState> = (props) => {
    if (props.healthPrograms) {
        const program = getProgram(props.match.params.id, props.healthPrograms);

        if (program) {
            return (
                <div className="container health-program">
                    <PageHeroComponent image={program.image.url} heading={program.title} />
                    {writeText(program.content)}
                    <button>Make an Enquiry</button>
                </div>
            );
        }

        return <Redirect to="/services/health-programs" />;
    }

    return <LoaderComponent />
}

export const HealthProgramComponent = connect<DataState, RouteComponentProps, DataState>((state) => state)(Component);

function getProgram(id: string, programs: HealthProgram[]): HealthProgram | null {
    for (const program of programs) {
        if (program.id === id) {
            return program;
        }
    }

    return null;
}