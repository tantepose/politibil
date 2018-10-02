import React from 'react';

const Tweet = props => (
    <div className = "tweet">
        <p> {props.text} </p>
        <p className = "date"> {props.date} </p>
    </div>
);

export default Tweet;