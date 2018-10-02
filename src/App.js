import React, { Component } from 'react';
import Header from './components/Header';

import Message from './components/Message';
import Loading from './components/Loading';
import TweetList from './components/TweetList';

class App extends Component {
  
  state = {
    district: 'oslopolitiops',
    tweets: [],
    page: 1,
    loading: true
  }

  onMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));

    console.log('KLIKK! side:', this.state.page);
  }

  componentDidMount() {
    fetch('/api/' + this.state.district)
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          tweets: tweets,
          loading: false
        });
      })
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="feed">
          <Message text={"Vis meg @" + this.state.district + "! 😀"} />
          
          { (this.state.loading) 
            ? <Loading /> 
            : <TweetList tweetList = {this.state.tweets.slice(0, this.state.page*10)} />
          }

          { (this.state.loading) 
            ? null 
            : <Message text="Gi meg mer! 😍" onClick={this.onMoreClick} />
          }
        </div>
      </div>
    );
  }
}

export default App;
