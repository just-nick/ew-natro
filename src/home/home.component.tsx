import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import { BlogHighlightListComponent } from "../blog/blog-highlight-list.component";
import { DataState } from "../common/reducer";
import { HeroComponent } from "../hero/hero.component";
import { LoaderComponent } from "../loader/loader.component";
import './home.scss';

declare global {
    interface Window {
        PixleeAsyncInit: () => void;
        Pixlee: {
            init: (options: any) => void,
            addSimpleWidget: (options: any) => void
        }
    }
}

function initPixlee() {
    window.Pixlee.init({apiKey:'BPBl52vuWryouUxOgSuT'});
    window.Pixlee.addSimpleWidget({widgetId:'16349'});
    (document.querySelector('#pixlee_container iframe') as HTMLIFrameElement).scrolling = 'no';
}

class HomeComponentBase extends React.Component<DispatchProp & DataState, {}> {
    public componentDidMount() {
        setTimeout(() => {
            if (window.Pixlee) {
                initPixlee();
            } else {
                window.PixleeAsyncInit = initPixlee;
            };
        }, 1000);
    }

    public render() {
        if (this.props.home && this.props.blogs && this.props.services) {
            return (
                <div>
                    <HeroComponent heros={this.props.home.hero_banner} />

                    <section id="home-services" className='services container'>
                        <h2>How can Emma help you?</h2>
                        <ul>
                            {this.props.services.map((service, i) => (
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
                            <img src={this.props.home.quote_photo ? this.props.home.quote_photo.url : ''} alt='' />
                            <div className='content'>
                                <p>{this.props.home.quote}</p>
                                <small>{this.props.home.by_line}</small>
                            </div>
                        </div>
                    </section>

                    <section className='container home-blog'>
                        <h2>The latest from Emma's blog</h2>
                        <BlogHighlightListComponent blogs={this.props.blogs.slice(0, 2)} />
                    </section>

                    <div className="home-form">
                        <div className="container">
                            <h2>Subscribe for the latest news &amp; events</h2>

                            <form action="https://formspree.io/emma@emmawiseman.com.au"
                                method="POST"
                                encType="multipart/form-data">
                                <input required type="text" name="first_name" placeholder="First Name" />
                                <input type="text" name="second_name" placeholder="Second Name" />
                                <input required type="email" name="_replyto" placeholder="Email Address" />

                                <input type="hidden" name="_subject" value="Contact form submitted" />

                                <button type="submit" value="Send">Sign Up</button>

                                <input type="hidden" name="_next" value={window.location.href} />
                                <input type="text" name="_gotcha" style={{ display: 'none' }} />
                            </form>
                        </div>
                    </div>

                    <section className='container'>
                        <h2>Follow Emma on Instagram</h2>
                        <div id="pixlee_container"></div>
                    </section>
                </div>
            )
        }

        return <LoaderComponent />;
    }
}

export const HomeComponent = connect<DataState, {}, {}, DataState>((state) => state)(HomeComponentBase);
