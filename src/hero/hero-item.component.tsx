import { Hero } from "./hero";
import React from "react";
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

    return (
        <section className={position}>
            <div>
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
        </section>
    );
}