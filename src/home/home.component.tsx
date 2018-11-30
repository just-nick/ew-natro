import React from "react";
import { HeroComponent } from "../hero/hero.component";
import { HighlightsComponent } from "../highlights/highlights.component";
import { Highlight } from "../highlights/highlight";
import { Blog } from "../blog/blog";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { Hero } from "../hero/hero";
import { connect, DispatchProp } from "react-redux";
import { reDo } from "redux-re-do";

class HomeComponentBase extends React.Component<{} & DispatchProp, {}> {
    public render() {
        const highlights: Highlight[] = [{
            label: 'Highlight 1',
            href: '/',
            icon: ''
        }, {
            label: 'Highlight 2',
            href: '/',
            icon: ''
        }, {
            label: 'Highlight 3',
            href: '/',
            icon: ''
        }];

        const blogs: Blog[] = [{
            title: 'Blog 1',
            id: '1-asdfgh',
            featuredImage: '',
            body: ''
        }];

        const heros: Hero[] = [{
            title: 'Something special here',
            image: '',
            summary: 'Lorem ipsum dolar et cosecutor',
            cta: {
                label: 'Learn More',
                url: ''
            }
        }, {
            title: 'Hero Number Two',
            image: '',
            summary: 'Description text to explain',
            cta: {
                label: 'Learn More',
                url: ''
            }
        }, {
            title: 'This is-a hero',
            image: '',
            summary: 'Something else goes here',
            cta: {
                label: 'Learn More',
                url: ''
            }
        }];

        return (
            <div>
                <button onClick={this.click}>Click me</button>
                <h1>Home</h1>
                <HeroComponent heros={heros} />

                <h2>Highlights</h2>
                <HighlightsComponent highlights={highlights} />

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
