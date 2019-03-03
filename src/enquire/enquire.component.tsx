import React, { SyntheticEvent } from "react";
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
        if (category && this.state.subject === '') {
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
        this.setState({
            name: '',
            email: '',
            subject: '',
            message: ''
        });
    }

    public preventBubbles = (e: SyntheticEvent) => {
        e.stopPropagation();
    }

    public render() {
        if (this.props.enquire.active) {
            return (
                <div className="overlay" onClick={this.closeOverlay}>
                    <div className="modal" onClick={this.preventBubbles}>
                        <button className="close" onClick={this.closeOverlay}>x</button>

                        <div className="feature">
                            <h2>Enquiry Form</h2>
                            <div className="image" style={{backgroundImage: `url('${this.props.enquire.icon}')`}}></div>
                        </div>

                        <form className="content"
                              action="https://formspree.io/emma@emmawiseman.com.au"
                              method="POST"
                              encType="multipart/form-data">
                            <label htmlFor="name">Name *</label>
                            <input required type="text" id="name" name="name" value={this.state.name} onChange={(v) => this.setState({ ...this.state, name: v.target.value })} />

                            <label htmlFor="email">Email *</label>
                            <input required type="email" id="email" name="_replyto" value={this.state.email} onChange={(v) => this.setState({ ...this.state, email: v.target.value })} />

                            <label htmlFor="subject">Subject</label>
                            <input type="text" id="subject" name="subject" value={this.state.subject} onChange={(v) => this.setState({ ...this.state, subject: v.target.value })} />
                            <input type="hidden" name="_subject" value={"Enquiry: " + this.state.subject} />

                            <label htmlFor="message">Message</label>
                            <textarea id="message" name="message" value={this.state.message} onChange={(v) => this.setState({ ...this.state, message: v.target.value })} />

                            <input type="hidden" name="_next" value={window.location.href} />
                            <input type="text" name="_gotcha" style={{ display: 'none' }} />

                            <button type="submit">Submit</button>

                            <p className="phone">Ph: (02) 9523 9940</p>
                        </form>
                    </div>
                </div>
            );
        }

        return null;
    }
}

export const EnquireComponent = connect<DataState, {}, {}, DataState>((state) => state)(Component);