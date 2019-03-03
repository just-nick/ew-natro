import React from "react";
import { ServiceLandingQuote } from "./service";

export class QuotesComponent extends React.Component<{ quotes: ServiceLandingQuote[] }, {current: number}> {
    public state = {current: 0};
    public interval?: NodeJS.Timer;

    public componentDidMount() {
        if (this.props.quotes.length > 1) {
            setInterval(() => {
                let current = this.state.current + 1;
                if (current >= this.props.quotes.length) {
                    current = 0;
                }

                this.setState({current});
            }, 10000)
        }
    }

    public componentWillUnmount() {
        if (this.interval) {
            clearInterval(this.interval);
        }
    }

    public quoteClass(i: number){
        const current = this.state.current;
        const last = this.props.quotes.length -1;

        if (i === current) {
            return "current";
        }

        if (i === current - 1) {
            return "previous";
        }

        if (current === 0 && i === last) {
            return "previous";
        }

        return "";
    }

    public render() {
        return (
            <div className="service-quote">
                {this.props.quotes.map((quote, i) =>
                    <div key={i} className={"service-quote-item " + this.quoteClass(i)}>
                        <div>
                            <p>{quote.text}</p>
                            <span>{quote.by}</span>
                        </div>
                        <span className="image" style={{ backgroundImage: `url('${quote.image.url}')` }}></span>
                    </div>
                )}
            </div>
        );
    }
}