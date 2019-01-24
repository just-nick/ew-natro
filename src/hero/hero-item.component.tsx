import React, { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Hero } from "./hero";

type Props = {
    hero: Hero;
    position: 'current' | 'next' | 'previous' | undefined
}

export const HeroItemComponent: React.StatelessComponent<Props> = (props) => {
    const {
        hero,
        position
    } = props;

    const style: CSSProperties = {
        backgroundImage: `url(${hero.image.url})`
    };

    return (
        <section className={position} style={style}>
            <div className='container'>
                <div className='content'>
                    <h2>{hero.title}</h2>
                    <p>
                        {hero.content}
                    </p>
                    {hero.link.slice(0,1) === '/' ? (
                        <Link to={hero.link}>Find out more</Link>
                    ) : (
                        <a href={hero.link}>Find out more</a>
                    )}
                </div>
            </div>
        </section>
    );
}