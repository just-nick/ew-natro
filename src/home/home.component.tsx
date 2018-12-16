import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { Highlight } from "../highlights/highlight";
import { Blog } from "../blog/blog";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { Hero } from "../hero/hero";
import { connect, DispatchProp } from "react-redux";
import { reDo } from "redux-re-do";
import { getApi, Predicates } from "prismic-javascript";

import './home.scss';

type State = {
    highlights: Highlight[],
    heros: Hero[],
    blogs: Blog[],
    loading: boolean
};

class HomeComponentBase extends React.Component<{} & DispatchProp, State> {
    public state = {
        highlights: [],
        heros: [],
        blogs: [],
        loading: true
    };

    public componentDidMount() {
        getApi("https://emmawisemannaturopathy.prismic.io/api/v2").then((api) => {
            api.getSingle('home').then((response) => {
                console.log(response);

                const heros: Hero[] = response.data.hero_banner.map((heroItem: any) => ({
                    title: heroItem.title[0].text,
                    image: heroItem.image.url,
                    summary: heroItem.content[0].text,
                    cta: {
                        label: 'Learn More',
                        url: ''
                    }
                }));

                this.setState({
                    ...this.state,
                    heros,
                    loading: false
                })

            }, (e) => {
                console.log(e);
            });

            api.query(
                Predicates.at('document.type', 'blog_post'), {}
            ).then((r) => this.setState({
                ...this.state,
                blogs: r.results.map((result) => ({...result, ...result.data}))
            }));
        });
    }

    public render() {
        console.log('Render', this.state.blogs);
        return (
            <>
                <HeroComponent heros={this.state.heros} />

                <section className='container'>
                    <h2>How can Emma help you?</h2>
                    <p>xyz</p>
                </section>

                <section className='quote'>
                    <div className='container'>
                        <img src="" alt="" />
                        <p>Place holder text to be updated via CMS place holder text to be updated via CMS</p>
                        <footer>Emma Wiseman, Clinical Naturopath</footer>
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
