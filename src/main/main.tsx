import { createBrowserHistory, History } from "history";
import * as React from "react";
import { Provider } from 'react-redux';
import { NavLink, Route, Router, Switch, Link } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { reDoMiddleware } from 'redux-re-do';
import { AboutComponent } from "../about/about.component";
import { BlogListComponent } from "../blog/blog-list.component";
import { BlogComponent } from "../blog/blog.component";
import { DataReducer, GetData } from "../common/reducer";
import { ContactComponent } from "../contact/contact.component";
import { EnquireComponent } from "../enquire/enquire.component";
import { EventListComponent } from "../event/event-list.component";
import { EventComponent } from "../event/event.component";
import { FaqsComponent } from "../faqs/faqs.component";
import { FooterComponent } from "../footer/footer.component";
import { HealthProgramListComponent } from "../health-program/health-program-list.component";
import { HealthProgramComponent } from "../health-program/health-program.component";
import { HomeComponent } from "../home/home.component";
import { NewsListComponent } from "../news/news-list.component";
import { NewsComponent } from "../news/news.component";
import { PrivacyComponent } from "../privacy/privacy.component";
import { ServiceListComponent } from "../service/service-list.component";
import './main.scss';

const store = createStore(DataReducer, applyMiddleware(reDoMiddleware));

interface HTMLHeading extends Element {
    displayState?: 'off-screen' | 'on-screen';
}

export class MainComponent extends React.Component<{}, {}> {
    private history: History;

    constructor(props: any) {
        super(props);
        this.history = createBrowserHistory();
        this.history.listen(() => {
            window.scroll({ top: 0 });
            this.headingCheck();
        });
        window.addEventListener('scroll', () => {
            this.headingCheck();
        });
    }

    public componentDidMount() {
        store.dispatch(GetData());
    }

    public componentDidUpdate() {
        this.headingCheck();
    }

    public headingCheck() {
        document.querySelectorAll('h2, h3, h4, h5, h6').forEach((el: HTMLHeading) => {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);

            if (isVisible) {
                el.displayState = 'on-screen';
            } else if (el.displayState !== 'on-screen') {
                el.displayState = 'off-screen';
            }
            
            if (el.displayState === 'off-screen') {
                el.classList.add('not-on-screen');
            } else {
                el.classList.remove('not-on-screen');
            }
        });
    }

    public render() {
        return (
            <Router history={this.history}>
                <Provider store={store}>
                    <React.Fragment>
                        <header>
                            <div className='container'>
                                <nav>
                                    <NavLink to="/about">About</NavLink>
                                    <span>
                                        <NavLink to="/services">Services</NavLink>
                                        <div className="sub-nav">
                                            <NavLink to="/services">Natruropathic Services</NavLink>
                                            <NavLink to="/services/health-programs">Health Programs</NavLink>
                                        </div>
                                    </span>
                                    <span>
                                        <NavLink to="/news">News</NavLink>
                                        <div className="sub-nav">
                                            <NavLink to="/news">News</NavLink>
                                            <NavLink to="/news/events">Events</NavLink>
                                        </div>
                                    </span>
                                    <span>
                                        <NavLink to="/blog">Blog</NavLink>
                                        <div className="sub-nav">
                                            <NavLink to="/blog/lifestyle">Lifestyle</NavLink>
                                            <NavLink to="/blog/food">Food</NavLink>
                                            <NavLink to="/blog/products">Products</NavLink>
                                            <NavLink to="/blog/people">People</NavLink>
                                        </div>
                                    </span>
                                    <NavLink to="/contact">Contact</NavLink>
                                    <NavLink className="home" exact={true} to="/">Home</NavLink>
                                </nav>

                                <Link to="/" className='logo'>Emma Wiseman</Link>
                            </div>
                        </header>

                        <main>
                            <Switch>
                                <Route path="/" exact component={HomeComponent} />

                                <Route path="/about" exact component={AboutComponent} />

                                <Route path="/services" exact component={ServiceListComponent} />
                                <Route path="/services/health-programs" exact component={HealthProgramListComponent} />
                                <Route path="/services/health-programs/:id" exact component={HealthProgramComponent} />

                                <Route path="/news" exact component={NewsListComponent} />
                                <Route path="/news/events" exact component={EventListComponent} />
                                <Route path="/news/:id" exact component={NewsComponent} />
                                <Route path="/news/events/:id" exact component={EventComponent} />

                                <Route path="/blog" exact component={BlogListComponent} />
                                <Route path="/blog/lifestyle" exact component={BlogListComponent} />
                                <Route path="/blog/food" exact component={BlogListComponent} />
                                <Route path="/blog/people" exact component={BlogListComponent} />
                                <Route path="/blog/products" exact component={BlogListComponent} />
                                <Route path="/blog/:id" exact component={BlogComponent} />

                                <Route path="/contact" exact component={ContactComponent} />

                                <Route path="/privacy" exact component={PrivacyComponent} />
                                <Route path="/faqs" exact component={FaqsComponent} />
                            </Switch>
                        </main>

                        <FooterComponent />
                        <EnquireComponent />
                    </React.Fragment>
                </Provider>
            </Router>
        )
    }
}