import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { Blog } from "../blog/blog";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { connect, DispatchProp } from "react-redux";
import { reDo } from "redux-re-do";
import { getApi, Predicates } from "prismic-javascript";
import { LoaderComponent } from "../loader/loader.component";

import './home.scss';
import { Home } from "./home";
import { Service } from "../service/service";
import { Link } from "react-router-dom";

type State = {
    home?: Home,
    blogs?: Blog[],
    services?: Service[]
};

class HomeComponentBase extends React.Component<DispatchProp, State> {
    public state: State = {};

    public render() {
        if (this.state.home && this.state.blogs && this.state.services) {
            return (
                <>
                    <HeroComponent heros={this.state.home.hero_banner} />

                    <section className='services container'>
                        <h2>How can Emma help you?</h2>
                        <ul>
                            {this.state.services.map((service) => (
                                <li>
                                    <Link to=''>
                                        <img src={service.image.url} alt='' />
                                        <h3>{service.title}</h3>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section className='quote'>
                        <div className='container'>
                            <img src={this.state.home.quote_photo.url} alt='' />
                            <div className='content'>
                                <p>{this.state.home.quote[0].text}</p>
                                <footer>{this.state.home.by_line[0].text}</footer>
                            </div>
                        </div>
                    </section>

                    <section className='container'>
                        <h2>The latest from Emma's blog</h2>
                        <BlogHighlightListComponent blogs={this.state.blogs} />
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

    public componentDidMount() {
        getApi("https://emmawisemannaturopathy.prismic.io/api/v2").then((api) => {
            api.getSingle('home').then((result) => {
                this.setState({
                    ...this.state,
                    home: { ...result, ...result.data }
                })
            });

            api.query(
                Predicates.at('document.type', 'blog_post'), {}
            ).then((r) => {
                this.setState({
                    ...this.state,
                    blogs: r.results.map((result) => ({ ...result, ...result.data }))
                });
            });

            api.query(
                Predicates.at('document.type', 'service'), {}
            ).then((r) => {
                this.setState({
                    ...this.state,
                    services: r.results.map((result) => ({ ...result, ...result.data }))
                });
            });
        });
    }

    public click = () => {
        this.props.dispatch(
            reDo((dispatch, _, extra) => {
                console.log('Extra!', extra);
                dispatch({
                    type: 'anyAction',
                    value: 'Anything'
                })
            }));
    }
}

export const HomeComponent = connect(() => ({}))(HomeComponentBase);
