import React from 'react';
import Tweet from './Tweet';

// https://codepen.io/clemens/pen/kXZWOK

const Loading = props => (
    <div className="feed">
        <div className="tweet">
            <div className = "spinner">
                <div className = "bounce1"></div>
                <div className = "bounce2"></div>
                <div className = "bounce3"></div>
            </div>
        </div>
    </div>
);

export default Loading;