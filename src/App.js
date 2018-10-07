import React, { Component } from 'react';
import Header from './components/Header';

import Message from './components/Message';
import Loading from './components/Loading';
import TweetList from './components/TweetList';

class App extends Component {
  
  // STATE
  state = {
    district: 'oslopolitiops',
    user: 'tantepose',
    allTweets: [],
    visibleTweets: [],
    page: -1,
    loading: true
  }
  
  // ON STARTUP
  componentDidMount() {
    fetch('/api/' + this.state.district)
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          allTweets: tweets,
          loading: false
        });
        this.handleMoreClick();
      })
  }

  // CLICK HANDLERS
  handleMoreClick = () => {
    const newTweets = this.state.allTweets.slice( // collect tweets to be made visible
      (this.state.page + 1) * 10, 
      ((this.state.page + 1) * 10) + 10
    );

    this.setState(prevState => ({ // make tweets visible
      page: prevState.page + 1,
      visibleTweets: [...this.state.visibleTweets, ...newTweets]
    }));
  }

  handleAboutClick = () => {
    var message = [{text: 'Dette er politibil.no! 🚓 Her får du politidistriktenes Twitter-meldinger på en enklere og penere måte og greier.'}];
    this.setState({
      visibleTweets: [...this.state.visibleTweets, ...message]
    });
  }

  handleFavoritesClick = () => {
    fetch('/api/user/' + this.state.user) // API call for collecting users favorite tweets
      .then(res => res.json())
      .then(favoriteTweets => {
        favoriteTweets.unshift({ // add message to show before tweets
          text: 'Yessir, her er dine favoritter, ' + this.state.user + '! 👮'});
        this.setState({
          visibleTweets: [...this.state.visibleTweets, ...favoriteTweets ] // make tweets visible
        })
      })
    }

  // RENDERER
  render() {
    return (
      <div className="App">
        <Header />
        <div className="feed">
          <Message text={"Vis meg @" + this.state.district + "! 😺"} />
          
          { (this.state.loading) 
            ? <Loading /> 
            : <TweetList tweetList={this.state.visibleTweets} user={this.state.user} />
          }

          <Message text="Gi meg mer! 😽" onClick={this.handleMoreClick} />
          
          { (this.state.user)
            ? <Message text="Vis meg mine favoritter! 😻" onClick={this.handleFavoritesClick} />
            : <Message text="La meg logge på! 😻" onClick={this.handleFavoritesClick} />
          }
          
          <Message text="Bytt politidistrikt! 😼" onClick={this.handleDistrictClick} />
          <Message text="Hva er dette? 🙀" onClick={this.handleAboutClick} />          
        </div>
      </div>
    );
  }
}

export default App;
