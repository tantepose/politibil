import React, { Component } from 'react';
import Header from './components/Header';
import TweetList from './components/TweetList';
import Message from './components/Message';
import TestMessage from './components/TestMessage.js';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />
        <div className = "feed">
          <Message text = "Vis meg Oslo-politiet! 😀" />
          <TestMessage text = "Hei! Nå er jeg ferdig med å skrive." delay = {1000}/>
          <TestMessage text = "Neida. Litt til." delay = {2000}/>
          <TestMessage text = "Sånn!" delay = {3000}/>
          <TweetList />
          <Message text = "Gi meg mer! 😍" />
        </div>
      </div>
    );
  }
}

export default App;
