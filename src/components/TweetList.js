import React, { Component } from 'react';
import Tweet from './Tweet';

// displaying a list of <Tweet /> components
class TweetList extends Component {

    // saving a tweet as favorite on click, if a user is logged in
    handleTweetClick = (text, timestamp) => {
        if (this.props.user) { 
            var data = { // preparing tweet for saving
                text: text, 
                timestamp: timestamp
            };

            console.log('lagrer favoritt');
            fetch('/api/user/favorites/' + this.props.user, { // saving tweet on user in database
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }})
                .then(res => res.json())
                .then((response) => {
                    console.log('lagra favoritt!!!');
                    this.props.fetchFavorites(); // fetch updated list of favorites
                } )
                .catch(error => console.error('Error:', error));
        }
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