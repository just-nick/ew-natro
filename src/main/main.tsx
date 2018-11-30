import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { HomeComponent } from "../home/home.component";
import { FooterComponent } from "../footer/footer.component";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import { reDoMiddleware } from 'redux-re-do';

import './main.scss';

const store = createStore((state, action) => {
    console.log('Action was', action);
    return state;
}, applyMiddleware(reDoMiddleware));

export class MainComponent extends React.Component<{}, {}> {
    public render() {
        return (
            <BrowserRouter>
                <Provider store={store}>
                    <React.Fragment>
                        <nav>
                            <Link to="/">Home</Link>
                            <Link to="/contact">Contact</Link>
                        </nav>

                        <main>
                            <Route path="/" exact component={HomeComponent} />
                            <Route path="/contact" component={HomeComponent} />
                        </main>
                        <FooterComponent />
                    </React.Fragment>
                </Provider>
            </BrowserRouter>
        )
    }
}