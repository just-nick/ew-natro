import * as React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route, Switch } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { reDoMiddleware } from 'redux-re-do';
import { AboutComponent } from "../about/about.component";
import { BlogListComponent } from "../blog/blog-list.component";
import { BlogComponent } from "../blog/blog.component";
import { DataReducer, GetData } from "../common/reducer";
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { NewsListComponent } from "../news/news-list.component";
import { NewsComponent } from "../news/news.component";
import { ServiceListComponent } from "../service/service-list.component";
import './main.scss';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { ContactComponent } from "../contact/contact.component";
import { HealthProgramListComponent } from "../health-program/health-program-list.component";
import { HealthProgramComponent } from "../health-program/health-program.component";

const store = createStore(DataReducer, applyMiddleware(reDoMiddleware));

export class MainComponent extends React.Component<{}, {showNav: boolean}> {
    public state = {
        showNav: false
    };

    public componentDidMount() {
        store.dispatch(GetData());
    }

    public showNav = () => {
        this.setState({
            showNav: !this.state.showNav
        });
    }

    public render() {
        return (
            <BrowserRouter>
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
                                            <NavLink to="/events">Events</NavLink>
                                        </div>
                                    </span>
                                    <span>
                                        <NavLink to="/blog">Blog</NavLink>
                                        <div className="sub-nav">
                                            <NavLink to="/blogs/lifestyle">Lifestyle</NavLink>
                                            <NavLink to="/blogs/food">Food</NavLink>
                                            <NavLink to="/blogs/products">Products</NavLink>
                                            <NavLink to="/blogs/people">People</NavLink>
                                        </div>
                                    </span>
                                    <NavLink to="/contact">Contact</NavLink>
                                    <NavLink className="home" exact={true} to="/">Home</NavLink>
                                </nav>

                                <div className='logo'>Emma Wiseman</div>
                            </div>
                        </header>

                        <main>
                            <Route render={({location}) => (
                                <TransitionGroup>
                                    <CSSTransition key={location.key} timeout={300} classNames="route">
                                        <Switch location={location}>
                                            <Route path="/" exact component={HomeComponent} />
                                            <Route path="/about" exact component={AboutComponent} />
                                            <Route path="/services" exact component={ServiceListComponent} />
                                            <Route path="/news" exact component={NewsListComponent} />
                                            <Route path="/news/:id" exact component={NewsComponent} />
                                            <Route path="/blog" exact component={BlogListComponent} />
                                            <Route path="/blog/:id" exact component={BlogComponent} />
                                            <Route path="/contact" exact component={ContactComponent} />
                                            <Route path="/services/health-programs" exact component={HealthProgramListComponent} />
                                            <Route path="/services/health-programs/:id" exact component={HealthProgramComponent} />
                                        </Switch>
                                    </CSSTransition>
                                </TransitionGroup>
                            )} />
                        </main>

                        <FooterComponent />
                    </React.Fragment>
                </Provider>
            </BrowserRouter>
        )
    }
}