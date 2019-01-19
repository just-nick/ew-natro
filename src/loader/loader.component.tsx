import { StatelessComponent } from "react";
import React from "react";

import './loader.scss';

export const LoaderComponent: StatelessComponent<{}> = () => {
    return <>
        <div className='loader-component'>
            <span></span>
        </div>
    </>
}