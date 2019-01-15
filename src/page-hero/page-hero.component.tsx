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

    const heading = props.heading ? props.heading.split(' ') : ['No', 'heading', 'set'];

    return (
        <div className={`page-hero ${props.type} ${customClass}`}>
            {customImage}
            <h1>{heading.map((part, i) => (<span key={i}>{part}</span>))}</h1>
        </div>
    );
}
