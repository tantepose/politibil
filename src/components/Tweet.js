import React from 'react';

const Tweet = props => (
    <div className = "tweet" key = {props.key}>
        <p> {props.text} </p>
        <p className = "date"> {props.date} </p>
    </div>
);

export default Tweet;