import React, { Component } from 'react';
import Header from './components/Header';
import Tweet from './components/Tweet';
import Message from './components/Message';
import TestMessage from './components/TestMessage';

class App extends Component {

  state = {
    district: 'oslopolitiops',
    tweets: []
  }

  componentDidMount() {
    fetch('/api/' + this.state.district)
      .then(res => res.json())
      .then(tweets => this.setState({ tweets: tweets }))
      .then(console.log('state:', this.state.tweets));
  }

  render() {
    console.log('state:', this.state.tweets);

    return (
      <div className="App">
        <Header />
        <div className = "feed">
          <Message text = {"Vis meg @" + this.state.district + "! 😀"} />
          
          {this.state.tweets.map(tweet =>
            <Tweet text = {tweet.text} />
          )}
          
          <Message text = "Gi meg mer! 😍" />
          <TestMessage text = "Hei! Nå er jeg ferdig med å skrive." delay = {3000}/>
        </div>
      </div>
    );
  }
}

export default App;
