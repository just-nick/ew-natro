import { Hero } from "./hero";
import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";

type Props = {
    hero: Hero;
    position: 'current' | 'next' | 'previous' | undefined
}

export const HeroItemComponent: React.StatelessComponent<Props> = (props) => {
    const {
        hero,
        position
    } = props;

    const title = hero.title.split(' ');
    const style: CSSProperties = {
        backgroundImage: `url(${hero.image})`
    };

    return (
        <section className={position} style={style}>
            <div className='container'>
                <div className='content'>
                    <h2>
                        {title.map((part) => (
                            <span>{part}</span>
                        ))}
                    </h2>
                    <p>
                        {hero.summary}
                    </p>
                    <Link to={hero.cta.url}>{hero.cta.label}</Link>
                </div>
            </div>
        </section>
    );
}