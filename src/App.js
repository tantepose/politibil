import React, { Component } from 'react';

import Header from './components/Header';
import Message from './components/Message';
import TweetList from './components/TweetList';
import Tweet from './components/Tweet';
import Loading from './components/Loading';
import Login from './components/Login';
import Districts from './components/Districts';

class App extends Component {
  
  // STATE
  constructor() {
    super(); 
    
    this.state = {
      district: 'oslopolitiops',
      user: null, //'tantepose',
      allTweets: [],
      visibleTweets: [],
      page: -1,
      loading: true,
      showLogin: false,
      showAbout: false,
      showDistricts: false
    }

    // this.getDistrict = this.getDistrict.bind(this);
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

        if (this.state.user) {
          this.setState({
            visibleTweets: [...this.state.visibleTweets, ...[{text: 'Ålbings, ' + this.state.user + '! 🚓'}]]
          });
        }

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

  handleAboutClick = () => {
    this.setState({
      showAbout: !this.state.showAbout
    });
  }

  handleLoginClick = () => {
    this.setState({
      showLogin: !this.state.showLogin
    })
  }

  getUsername = (username) => {
    this.setState({
      user: username,
      showLogin: false
    });
  }

  handleDistrictClick = () => {
    this.setState({
      showDistricts: !this.state.showDistricts
    })
  }

  getDistrict = (newDistrict) => {
    this.setDistrict(newDistrict);
  }

  // stupid bind issue hack
  setDistrict = (newDistrict) => {
    this.setState({
      district: newDistrict,
      showDistricts: false
    });
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
            : <Message text="La meg logge på! 😻" onClick={this.handleLoginClick} />
          }
                    
          { (this.state.showLogin)
            ? <Login getUsername={this.getUsername}/>
            : null
          }

          <Message text="Bytt politidistrikt! 😼" onClick={this.handleDistrictClick} />
          { (this.state.showDistricts)
            ? <Districts getDistrict={this.getDistrict}/>
            : null
          }

          <Message text="Hva er dette? 🙀" onClick={this.handleAboutClick} />  
          { (this.state.showAbout)
            ? <Tweet text='Dette er politibil.no! 🚓 Her får du politidistriktenes Twitter-meldinger på en enklere og penere måte og greier.'/>
            : null
          }        

        </div>
      </div>
    );
  }
}

export default App;
