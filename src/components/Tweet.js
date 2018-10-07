import React from 'react';

const Tweet = props => (
    <div className = "tweet" onClick={() => { props.onClick(props.text, props.timestamp) }}>
        <p> {props.text} </p>
        <p className = "date"> {props.timestamp} </p>
    </div>
);

export default Tweet;