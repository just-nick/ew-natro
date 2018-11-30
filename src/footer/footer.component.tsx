import React from "react";
import { Link } from "react-router-dom";

export const FooterComponent: React.StatelessComponent<{}> = () => {
    return (
        <footer>
            <ul className="social">
                <li><a href="https://www.google.coml">Social</a></li>
            </ul>

            <ul className="links">
                <li><Link to="/something">something</Link></li>
            </ul>
        </footer>
    );
}   