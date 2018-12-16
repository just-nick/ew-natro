import React from "react";
import { Link } from "react-router-dom";

import './footer.scss';

export const FooterComponent: React.StatelessComponent<{}> = () => {
    return (
        <footer className='footer-component'>
            <div className='container'>
                <ul className="social">
                    <li><a href="https://www.google.coml">Social</a></li>
                </ul>

                <ul className="links">
                    <li><Link to="/something">something</Link></li>
                </ul>
            </div>
        </footer>
    );
}   