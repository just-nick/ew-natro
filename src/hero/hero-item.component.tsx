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

    const title = hero.title[0].text.split(' ');
    const style: CSSProperties = {
        backgroundImage: `url(${hero.image.url})`
    };

    return (
        <section className={position} style={style}>
            <div className='container'>
                <div className='content'>
                    <h2>
                        {title.map((part, i) => (
                            <span key={i}>{part}</span>
                        ))}
                    </h2>
                    <p>
                        {hero.content[0].text}
                    </p>
                    <Link to={'hero.cta'}>Find out more...</Link>
                </div>
            </div>
        </section>
    );
}