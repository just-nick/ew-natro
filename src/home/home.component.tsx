import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { connect, DispatchProp, MapStateToProps } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { Link } from "react-router-dom";
import { DataState } from "../service/service.reducer";

import './home.scss';

const HomeComponentBase: React.StatelessComponent<DispatchProp & DataState> = (props) => {
    if (props.home && props.blogs && props.services) {
        return (
            <>
                <HeroComponent heros={props.home.hero_banner} />

                <section className='services container'>
                    <h2>How can Emma help you?</h2>
                    <ul>
                        {props.services.map((service, i) => (
                            <li key={i}>
                                <Link to={`/services#${service.id}`}>
                                    <img src={service.image.url} alt='' />
                                    <h3>{service.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='quote'>
                    <div className='container'>
                        <img src={props.home.quote_photo.url} alt='' />
                        <div className='content'>
                            <p>{props.home.quote[0].text}</p>
                            <footer>{props.home.by_line[0].text}</footer>
                        </div>
                    </div>
                </section>

                <section className='container'>
                    <h2>The latest from Emma's blog</h2>
                    <BlogHighlightListComponent blogs={props.blogs} />
                </section>

                <form className='container'>
                    <h2>Subscribe for the latest news &amp; events</h2>
                </form>

                <section className='container'>
                    <h2>Follow Emma on Instagram</h2>
                </section>
            </>
        )
    }

    return <LoaderComponent />;
}

const mapStateToProps: MapStateToProps<DataState, {}, DataState> = (state: DataState): DataState => {
    return {
        ...state
    };
}
export const HomeComponent = connect(mapStateToProps)(HomeComponentBase);
