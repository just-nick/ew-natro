import { Highlight } from "./highlight";
import { HighlightItemComponent } from "./highlight-item.component";
import React from "react";

type Props = {
    highlights: Highlight[]
};

export const HighlightsComponent: React.StatelessComponent<Props> = (props) => {
    return (
        <div>
            {props.highlights.map((highlight, i) =>
                <HighlightItemComponent key={i} highlight={highlight} />)}
        </div>
    );
}