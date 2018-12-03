import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { HighlightsComponent } from "../highlights/highlights.component";
import { Highlight } from "../highlights/highlight";
import { Blog } from "../blog/blog";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { Hero } from "../hero/hero";
import { connect, DispatchProp } from "react-redux";
import { reDo } from "redux-re-do";
import { getApi } from "prismic-javascript";

class HomeComponentBase extends React.Component<{} & DispatchProp, {}> {
    public state = {
        highlights: [] as Highlight[],
        heros: [] as Hero[],
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
                    heros,
                    loading: false
                })

            }, (e) => {
                console.log(e);
            });
        });
    }

    public render() {
        const blogs: Blog[] = [{
            title: 'Blog 1',
            id: '1-asdfgh',
            featuredImage: '',
            body: ''
        }];

        return (
            <div>
                <span>Loading: {this.state.loading.valueOf()}</span>

                <button onClick={this.click}>Click me</button>
                <h1>Home</h1>
                <HeroComponent heros={this.state.heros} />

                <h2>Highlights</h2>
                <HighlightsComponent highlights={this.state.highlights} />

                <h2>The latest from Emma's blog</h2>
                <BlogHighlightListComponent blogs={blogs} />

            </div>
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
