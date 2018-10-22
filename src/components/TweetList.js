import React, { Component } from 'react';
import Tweet from './Tweet';

class TweetList extends Component {

    // move this logic to app.js
    handleTweetClick = (text, timestamp) => {
        var data = {text: text, timestamp: timestamp};
        console.log('lagrer favoritt');
        fetch('/api/user/favorites/' + this.props.user, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then((response) => {
                console.log('lagra favoritt!!!');
                this.props.fetchFavoriteTweets();
            } )
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