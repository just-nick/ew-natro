import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { connect, DispatchProp } from "react-redux";
import { LoaderComponent } from "../loader/loader.component";
import { Link } from "react-router-dom";
import { DataState } from "../common/reducer";

import './home.scss';

const HomeComponentBase: React.StatelessComponent<DispatchProp & DataState> = (props) => {
    if (props.home && props.blogs && props.services) {
        return (
            <div>
                <HeroComponent heros={props.home.hero_banner} />

                <section id="home-services" className='services container'>
                    <h2>How can Emma help you?</h2>
                    <ul>
                        {props.services.map((service, i) => (
                            <li key={i}>
                                <Link to={`/services#${service.id}`}>
                                    <span className="image" style={{backgroundImage: service.image ? `url('${service.image.url}')` : ''}} />
                                    <h3>{service.title}</h3>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className='quote'>
                    <div className='container'>
                        <img src={props.home.quote_photo ? props.home.quote_photo.url : ''} alt='' />
                        <div className='content'>
                            <p>{props.home.quote}</p>
                            <small>{props.home.by_line}</small>
                        </div>
                    </div>
                </section>

                <section className='container home-blog'>
                    <h2>The latest from Emma's blog</h2>
                    <BlogHighlightListComponent blogs={props.blogs.slice(0, 2)} />
                </section>

                <div className="home-form">
                    <div className="container">
                        <h2>Subscribe for the latest news &amp; events</h2>

                        <form action="https://formspree.io/emma@emmawiseman.com.au"
                              method="POST"
                              encType="multipart/form-data">
                            <input type="text" name="first_name" placeholder="First Name" />
                            <input type="text" name="first_name" placeholder="Second Name" />
                            <input type="email" name="_replyto" placeholder="Email Address" />

                            <input type="hidden" name="_subject" value="Contact form submitted" />
                            <input type="hidden" name="_next" value={window.location.href} />

                            <button type="submit" value="Send">Sign Up</button>

                            <input type="text" name="_gotcha" style={{ display: 'none' }} />
                        </form>
                    </div>
                </div>

                <section className='container'>
                    <h2>Follow Emma on Instagram</h2>
                </section>
            </div>
        )
    }

    return <LoaderComponent />;
}

export const HomeComponent = connect<DataState, {}, {}, DataState>((state) => state)(HomeComponentBase);
