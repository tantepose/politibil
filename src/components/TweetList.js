import React, { Component } from 'react';
import Tweet from './Tweet';

class TweetList extends Component {

    handleTweetClick = (text, timestamp) => {
        var data = {text: text, timestamp: timestamp};
        console.log('saving:', data);

        fetch('/api/user/' + this.props.user, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }
            }).then(res => res.json())
            .then(response => console.log('Success:', JSON.stringify(response)))
            .catch(error => console.error('Error:', error));
    }

    render () {
        return (
            <div className='tweetList'>
                {this.props.tweetList.map((tweet, key) =>
                <Tweet 
                    text={tweet.text} 
                    timestamp={tweet.timestamp} 
                    key={key} 
                    onClick={this.handleTweetClick} />
                )}
            </div>
        );
    }
}

export default TweetList;