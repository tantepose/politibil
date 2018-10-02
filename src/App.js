import React, { Component } from 'react';
import Header from './components/Header';
import Tweet from './components/Tweet';
import Message from './components/Message';
// import TestMessage from './components/TestMessage';

class App extends Component {

  state = {
    district: 'oslopolitiops',
    allTweets: [],
    visibleTweets: [],
    page: 1
  }

  componentDidMount() {
    fetch('/api/' + this.state.district)
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          allTweets: tweets 
        });
        this.setState({
          visibleTweets: this.state.allTweets.slice(0, this.state.page * 10)
        });
        console.log(this.state.visibleTweets);
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="feed">
          <Message text={"Vis meg @" + this.state.district + "! 😀"} />
          
          {this.state.visibleTweets.map((tweet, key) =>
            <Tweet text={tweet.text} date={tweet.date} key={key}/>
          )}
          
          <Message text = "Gi meg mer! 😍" />
          {/* <TestMessage text = "Hei! Nå er jeg ferdig med å skrive." delay = {3000}/> */}
        </div>
      </div>
    );
  }
}

export default App;
