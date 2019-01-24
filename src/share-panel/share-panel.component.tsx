import React from 'react';

export const SharePanelComponent: React.StatelessComponent<{}> = () => {
    const url = window.location.href;
    return <ul className="share">
        <li className="facebook"><a target="_new" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURI(url)}`}>Facebook</a></li>
        <li className="linkedin"><a target="_new" href={`https://www.linkedin.com/shareArticle?url=${encodeURI(url)}`}>Linkedin</a></li>
    </ul>;
}