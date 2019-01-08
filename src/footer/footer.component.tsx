import React from "react";
import { Link } from "react-router-dom";

import './footer.scss';

export const FooterComponent: React.StatelessComponent<{}> = () => {
    return (
        <footer className='footer-component'>
            <div className='container'>
                <ul className="social">
                    <li><a href="https://www.google.com" target="_blank">Social</a></li>
                    <li><a href="https://www.google.com" target="_blank">Social</a></li>
                    <li><a href="https://www.google.com" target="_blank">Social</a></li>
                </ul>

                <ul className="links">
                    <li><Link to="/something">Privacy</Link></li>
                    <li><Link to="/something">FAQs</Link></li>
                </ul>
            </div>
        </footer>
    );
}   