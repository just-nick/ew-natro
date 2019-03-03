import React from "react";

import './page-hero.scss';

type PageHeroTypes = 'full-image' | 'round';
interface Props {
    heading: string;
    image: string;
    type?: PageHeroTypes;
}

export const PageHeroComponent: React.StatelessComponent<Props> = (props) => {
    const type: PageHeroTypes = props.type ? props.type : "full-image";

    return (
        <div className={`page-hero ${type}`}>
            <span className="image" style={{backgroundImage: `url('${props.image}')`}}></span>
            <div className="title">
                <span>{props.heading}</span>
            </div>
        </div>
    );
}
