import React from "react";
import { Link } from "react-router-dom";

import './footer.scss';
import { DispatchProp, connect } from "react-redux";
import { DataState } from "../common/reducer";

const Component: React.StatelessComponent<DataState & DispatchProp> = (props) => {
    return (
        <footer className='footer-component'>
            <div className='container'>
                <ul className="social">
                    {props.footer ? props.footer.social_links.map((item) => {
                        console.log(item);
                        return <li><a style={{backgroundImage: `url('${item.image.url}')`}} href={item.link.url} target="_blank">{item.platform_name}</a></li>;
                    }) : null}
                </ul>

                <ul className="links">
                    <li><Link to="/privacy">Privacy</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                </ul>
            </div>
        </footer>
    );
}

export const FooterComponent = connect<DataState, {}, DataState>((state) => state)(Component);