import React from "react";
import { connect, DispatchProp } from "react-redux";
import { DataState, CloseOverlay } from "../common/reducer";

interface EnquireState {
    name: string;
    email: string;
    subject: string;
    message: string;
    nameError?: boolean;
    emailError?: boolean;
}

class Component extends React.Component<DispatchProp & DataState, EnquireState> {
    public state: EnquireState = {
        name: '',
        email: '',
        subject: '',
        message: ''
    };

    public componentDidUpdate() {
        const category = this.props.enquire.category;
        if (category && this.state.subject !== category) {
            this.setState({
                ...this.state,
                subject: category,
                nameError: false,
                emailError: false,
            });
        }
    }

    public closeOverlay = () => {
        this.props.dispatch(CloseOverlay());
    }

    public sendEnquiry = () => {
        const emailRegexp = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        const emailMatches = this.state.email.match(emailRegexp);
        const nameError: boolean = this.state.name.length === 0;
        const emailError: boolean = (emailMatches === null || emailMatches.length === 0);

        console.log('Errors', nameError, emailError)

        if (!nameError && !emailError) {
            alert(`Will send: ${this.state.name} ${this.state.email} ${this.state.subject} ${this.state.message}`)
            this.props.dispatch(CloseOverlay())
        }

        this.setState({
            ...this.state,
            emailError,
            nameError
        });
    }

    public render() {
        if (this.props.enquire.active) {
            return (
                <div className="overlay">
                    <div className="modal">
                        <button className="close" onClick={this.closeOverlay}>x</button>

                        <div className="feature">
                            <h2>Enquiry Form</h2>
                            <div className="image" style={{backgroundImage: `url('${this.props.enquire.icon}')`}}></div>
                        </div>

                        <div className="content">
                            <label htmlFor="name">Name *</label>
                            <input id="name" value={this.state.name} onChange={(v) => this.setState({ ...this.state, name: v.target.value })} />
                            {this.state.nameError ? <p className="error">You must provide a name</p> : null}

                            <label htmlFor="email">Email *</label>
                            <input id="email" value={this.state.email} onChange={(v) => this.setState({ ...this.state, email: v.target.value })} />
                            {this.state.emailError ? <p className="error">You must provide a valid email</p> : null}

                            <label htmlFor="subject">Subject</label>
                            <input id="subject" value={this.state.subject} readOnly />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" value={this.state.message} onChange={(v) => this.setState({ ...this.state, message: v.target.value })} />

                            <button type="button" onClick={this.sendEnquiry}>Submit</button>

                            <p className="phone">Ph: (02) 9523 9940</p>
                        </div>
                    </div>
                </div>
            );
        }

        return null;
    }
}

export const EnquireComponent = connect<DataState, {}, {}, DataState>((state) => state)(Component);