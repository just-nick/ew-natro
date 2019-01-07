import * as React from "react";
import { Provider } from 'react-redux';
import { BrowserRouter, Link, Route } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { reDoMiddleware } from 'redux-re-do';
import { BlogListComponent } from "../blog/blog-list.component";
import { FooterComponent } from "../footer/footer.component";
import { HomeComponent } from "../home/home.component";
import { NewsListComponent } from "../news/news-list.component";
import { NewsComponent } from "../news/news.component";
import { ServiceListComponent } from "../service/service-list.component";
import { GetServices, ServiceReducer } from "../service/service.reducer";
import './main.scss';
import { BlogComponent } from "../blog/blog.component";

const store = createStore(ServiceReducer, applyMiddleware(reDoMiddleware));

export class MainComponent extends React.Component<{}, {}> {
    public componentDidMount() {
        store.dispatch(GetServices());
    }
    public render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <React.Fragment>
                        <header>
                            <div className='container'>
                                <nav>
                                    <Link to="/">Home</Link>
                                    <Link to="/services">Services</Link>
                                    <Link to="/news">News</Link>
                                    <Link to="/blog">Blog</Link>
                                    <Link to="/contact">Contact</Link>
                                </nav>

                                <div className='logo'>Emma Wiseman</div>
                            </div>
                        </header>

                        <main>
                            <Route path="/" exact component={HomeComponent} />
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