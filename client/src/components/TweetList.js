import React, { Component } from 'react';
import Tweet from './Tweet';

// displaying a list of <Tweet /> components
class TweetList extends Component {

    // saving a tweet as favorite on click
    saveFavorite = (text, timestamp) => {
        var data = { // preparing tweet for saving
            text: text, 
            timestamp: timestamp
        };

        fetch('/api/user/favorites/' + this.props.user, { // saving tweet on user in database
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }})
            .then(() => {
                this.props.fetchFavorites(); // fetch updated list of favorites
            } )
            .catch(error => console.error('Error saving favorite:', error));
    }

    render () {
        return (
            <div className='tweetList'>
                {this.props.tweetList.map((tweet, key) =>
                    <Tweet 
                        text={tweet.text} 
                        timestamp={tweet.timestamp} 
                        key={key}
                        user={this.props.user}
                        onClick={this.saveFavorite} 
                    />
                )}
            </div>
        );
    }
}

export default TweetList;