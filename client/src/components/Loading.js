import React from 'react';

// simple loading animation, stolen from https://codepen.io/clemens/pen/kXZWOK
const Loading = ()  => (
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