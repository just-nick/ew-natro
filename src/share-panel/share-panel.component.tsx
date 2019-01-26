import React from 'react';

import './share-panel.scss';

export const SharePanelComponent: React.StatelessComponent<{title?: string}> = (props) => {
    const url = encodeURI(window.location.href);
    let title = '';

    if (props.title) {
        title = encodeURI(props.title);
    }

    const linkedin = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`
    const facebook = `https://www.facebook.com/sharer/sharer.php?u=${url}`

    return <ul className="share">
        <li><a className="facebook" target="_new" href={facebook}>Facebook</a></li>
        <li><a className="linkedin" target="_new" href={linkedin}>Linkedin</a></li>
    </ul>;
}