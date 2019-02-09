import React from "react";
import { connect, DispatchProp } from "react-redux";
import { Link } from "react-router-dom";
import { DataState } from "../common/reducer";
import './footer.scss';


const Component: React.StatelessComponent<DataState & DispatchProp> = () => {
    return (
        <footer className='footer-component'>
            <div className='container'>
                <ul className="social">
                    <li><a className="facebook" href="https://www.facebook.com/emmawisemannaturopathy/" target="_blank">Facebook</a></li>
                    <li><a className="linkedin" href="https://www.linkedin.com/in/emma-wiseman-bb65b3b0/" target="_blank">Linkedin</a></li>
                    <li><a className="instagram" href="https://www.instagram.com/emma_wiseman_naturopathy/" target="_blank">Instagram</a></li>
                </ul>

                <ul className="links">
                    <li><Link to="/questionnaire">Questionnaire</Link></li>
                    <li><Link to="/privacy">Privacy</Link></li>
                    <li><Link to="/faqs">FAQs</Link></li>
                </ul>
            </div>
        </footer>
    );
}

export const FooterComponent = connect<DataState, {}, DataState>((state) => state)(Component);