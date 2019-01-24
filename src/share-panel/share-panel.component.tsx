import React from 'react';

import './share-panel.scss';

export const SharePanelComponent: React.StatelessComponent<{}> = () => {
    const url = window.location.href;
    return <ul className="share">
        <li><a className="facebook" target="_new" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(url)}`}>Facebook</a></li>
        <li><a className="linkedin" target="_new" href={`https://www.linkedin.com/shareArticle?url=${encodeURI(url)}`}>Linkedin</a></li>
    </ul>;
}