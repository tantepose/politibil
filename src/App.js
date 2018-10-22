import React, { Component } from 'react';

import Header from './components/Header';
import Loading from './components/Loading';
import TweetList from './components/TweetList';

import Tweet from './components/Tweet';
import Message from './components/Message';

import GIF from './components/GIF';
import Login from './components/Login';
import Districts from './components/Districts';
import NewUser from './components/NewUser';

class App extends Component {
  
  // STATE
  constructor() {
    super(); 
    
    this.state = {
      district: 'oslopolitiops',
      user: 'elinos',

      favorites: ['Ingen lasta! :('],
      allTweets: [],
      visibleTweets: [],
      
      page: -1,
      loading: true,

      showLogin: false,
      showAbout: false,
      showDistricts: false,
      showNewUser: false,
      showFavorites: false
    }
  }
  
  // STARTUP
  componentDidMount() {
    this.fetchUser();
    this.fetchNewTweets();
  }

  // FETCHING
  fetchNewTweets = () => {
    window.scrollTo(0, 0);
    console.log('fetching tweets from @', this.state.district);
    
    fetch('/api/tweets/' + this.state.district)
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          allTweets: tweets,
          loading: false
        });

        this.handleMoreClick();
        console.log('done fetching from  @', this.state.district);
      })
  }

  fetchUser = () => {
    if (this.state.user) {
      console.log('fetching ' + this.state.user + 's favorite tweets');
      fetch('/api/user/' + this.state.user)
        .then(res => res.json())
        .then(user => {
          this.setState({
            district: user[0].district,
            favorites: user[0].favorites
          });
      })
    }
  }

  // CLICK HANDLERS
  handleMoreClick = () => {
    const newTweets = this.state.allTweets.slice( // collect new tweets to be made visible
      (this.state.page + 1) * 10, 
      ((this.state.page + 1) * 10) + 10
    );

    this.setState(prevState => ({ // make new tweets visisble
      page: prevState.page + 1,
      visibleTweets: [...this.state.visibleTweets, ...newTweets]
    }));
  }

  toggle = (message) => {
    this.setState({
      [message]: !this.state[message]
    })
  }

  // COMPONENT CALLBACKS
  getUsername = (username) => {
    this.setState({
      user: username,
      showLogin: false
    });
  }

  getDistrict = (newDistrict) => {
    this.setDistrict(newDistrict);
  }

  // stupid bind issue hack
  setDistrict = (newDistrict) => {
    this.setState({ // reset state
      district: newDistrict,
      allTweets: [],
      visibleTweets: [],
      page: -1,
      loading: true,
      showLogin: false,
      showAbout: false,
      showDistricts: false,
      showNewUser: false,
      showFavorites: false
    }, () => {
      this.fetchNewTweets(); // get tweets from new district
    });
  }

  makeNewUser = (username) => {
    console.log('making new user:', username);
  }


  // RENDERER
  render() {
    return (
      <div className="App">
        <Header />
        <div className="feed">
          <Message text={"Vis meg @" + this.state.district + "! 😺"} />
          
          <GIF user={this.state.user}/>
          {/* <Tweet text={"Ålbings, " + this.state.user + "! 👮"} /> */}
          
          { (this.state.loading) 
            ? <Loading /> 
            : <TweetList tweetList={this.state.visibleTweets} user={this.state.user} fetchFavoriteTweets={this.fetchUser} />
          }

          { (this.state.allTweets.length == this.state.visibleTweets.length)
            ? <Message text="Ikke flere tweets å vise! 😿" />
            : <Message text="Gi meg mer! 😽" onClick={this.handleMoreClick} />
          }
          
          
          <Message text="Bytt politidistrikt! 😼" onClick={()=>{this.toggle('showDistricts')}} />
          { (this.state.showDistricts)
            ? <Districts getDistrict={this.getDistrict}/>
            : null
          }

          { (this.state.user)
            ? <Message text={"Vis " + this.state.user + "s favoritter! 😻"} onClick={()=>{this.toggle('showFavorites')}} />
            : <Message text="La meg logge på! 😻" onClick={()=>{this.toggle('showLogin')}} />
          }
          { (this.state.showFavorites)
            ? <TweetList tweetList={this.state.favorites} user={this.state.user} fetchFavoriteTweets={this.fetchUser} />
            : null
          }

          { (this.state.showLogin)
            ? <Login getUsername={this.getUsername}/>
            : null
          }

          { (this.state.user)
            ? null
            : <Message text="La meg lage en bruker! 😻" onClick={()=>{this.toggle('showNewUser')}} />
          }
          { (this.state.showNewUser)
            ? <NewUser makeNewUser={this.makeNewUser}/>
            : null
          }

          <Message text="Hva er dette? 🙀" onClick={()=>{this.toggle('showAbout')}} />  
          { (this.state.showAbout)
            ? <Tweet text='Dette er politibil.no! 🚓 Her får du politidistriktenes Twitter-meldinger på en enklere og penere måte og sånne ting.'/>
            : null
          }

        </div>
      </div>
    );
  }
}

export default App;
