import React from 'react';

// displaying a single, clickable message
const Message = props => (
    <div className="message" onClick={props.onClick}>
        <p> {props.text} </p>
    </div>
);

export default Message;