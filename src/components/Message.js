import React from 'react';

const Message = props => (
    <div className="message" onClick={props.onClick}>
        <p> {props.text} </p>
    </div>
);

export default Message;