import React from "react";
import { Link } from "react-router-dom";

import './footer.scss';
import { DispatchProp, connect } from "react-redux";
import { DataState } from "../common/reducer";

const Component: React.StatelessComponent<DataState & DispatchProp> = () => {
    return (
        <footer className='footer-component'>
            <div className='container'>
                <ul className="social">
                    <li><a className="facebook" href="" target="_blank">Facebook</a></li>
                    <li><a className="linkedin" href="" target="_blank">Linkedin</a></li>
                    <li><a className="instagram" href="" target="_blank">Instagram</a></li>
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