import React from 'react';

// displaying a single clickable tweet
const Tweet = props => (
    <div className = "tweet" onClick={() => { props.onClick(props.text, props.timestamp) }}>
        <p> {props.text} </p>
        { (props.timestamp)
            ? <p className = "date"> {props.timestamp} </p>
            : null
        }
    </div>
);

export default Tweet;