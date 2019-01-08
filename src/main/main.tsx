import * as React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, NavLink, Route } from "react-router-dom";
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
                                    <NavLink to="/services">Services</NavLink>
                                    <NavLink to="/news">News</NavLink>
                                    <NavLink to="/blog">Blog</NavLink>
                                    <NavLink to="/contact">Contact</NavLink>
                                    <NavLink className="home" exact={true} to="/">Home</NavLink>
                                </nav>

                                <div className='logo'>Emma Wiseman</div>
                            </div>
                        </header>

                        <main>
                            <Route path="/" exact component={HomeComponent} />
                            <Route path="/about" exact component={AboutComponent} />
                            <Route path="/services" exact component={ServiceListComponent} />
                            <Route path="/news" exact component={NewsListComponent} />
                            <Route path="/news/:id" exact component={NewsComponent} />
                            <Route path="/blog" exact component={BlogListComponent} />
                            <Route path="/blog/:id" exact component={BlogComponent} />
                        </main>

                        <FooterComponent />
                    </React.Fragment>
                </Provider>
            </BrowserRouter>
        )
    }
}