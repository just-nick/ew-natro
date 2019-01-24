import React from "react";

import './page-hero.scss';

interface Props {
    heading: string;
    type?: string;
    image?: string;
}

export const PageHeroComponent: React.StatelessComponent<Props> = (props) => {
    let customClass: string = "";
    let customImage: React.ReactNode;
    
    if (props.image) {
        customClass = "custom";
        customImage = <span className="custom" style={{backgroundImage: `url('${props.image}')`}}></span>
    }

    return (
        <div className={`page-hero ${props.type} ${customClass}`}>
            {customImage}
            <h1>{props.heading}</h1>
        </div>
    );
}
