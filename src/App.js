import React, { Component } from 'react';
import Header from './components/Header';
import TweetList from './components/TweetList';
import Message from './components/Message';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className = "feed">
          <Message text = "Vis meg Oslo-politiet! 😀" />
          <TweetList />
          <Message text = "Gi meg mer! 😍" />
        </div>
      </div>
    );
  }
}

export default App;
