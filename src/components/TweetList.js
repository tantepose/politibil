import React from 'react';
import Tweet from './Tweet';

const TweetList = props => (
    <div>
        {props.tweetList.map((tweet, key) =>
            <Tweet text={tweet.text} date={tweet.date} key={key}/>
        )}
    </div>
);

export default TweetList;