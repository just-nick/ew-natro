import { Link } from "react-router-dom";
import React from "react";
import { Highlight } from "./highlight";

type Props = {
    highlight: Highlight
}

export const HighlightItemComponent: React.StatelessComponent<Props> = (props) => {
    return (
        <div>
            <img src={props.highlight.icon} />
            <Link to={props.highlight.href}>
                {props.highlight.label}
            </Link>
        </div>
    );
}