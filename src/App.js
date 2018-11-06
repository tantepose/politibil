import React, { Component } from 'react';

import Header from './components/Header';
import Loading from './components/Loading';
import TweetList from './components/TweetList';

import Tweet from './components/Tweet';
import Message from './components/Message';

import Greeting from './components/Greeting';
import Login from './components/Login';
import Districts from './components/Districts';
import NewUser from './components/NewUser';

class App extends Component {
  
  // setting default state
  constructor() {
    super(); 
    
    this.state = {
      district: 'oslopolitiops',
      user: null,

      favorites: [],
      allTweets: [],
      visibleTweets: [],
      
      page: -1,
      loading: true,

      showLogin: false,
      showAbout: false,
      showDistricts: false,
      showNewUser: false,
      showFavorites: false,

      feedback: ""
    }
  }
  
  // on initial startup
  componentDidMount() {
    if (this.state.user) {
      this.login();
    }
    else {
      this.fetchNewTweets();
    }
  }

  // login - fetch user and update state
  login = (username) => {
    console.log('logging in and fetching', username);

      fetch('/api/user/' + username)
        .then(res => {
          if (!res.ok) { // no database connection
            this.setState({
              feedback: 'Finner ikke database! 😿'
            });
          } else { // database online
            return res.json();
          }
        })
        .then(user => {
          if (user.length == 0) { // user not found
            this.setState({
              feedback: 'Finner ikke ' + username + '! 😿'
            });
          } else { // user found, logging in
            this.setState({
              user: username,
              showLogin: false,
              district: user[0].district,
              favorites: user[0].favorites,
              feedback: ''
            }, () => this.fetchNewTweets());
          }
        })
  }

  // fetching a new set of tweets from @district
  fetchNewTweets = () => {
    window.scrollTo(0, 0);
    console.log('fetching tweets from @', this.state.district);
    
    this.setState({ // reset state
      visibleTweets: [],
      page: -1,

      loading: true,

      showLogin: false,
      showAbout: false,
      showDistricts: false,
      showNewUser: false,
      showFavorites: false
    });

    fetch('/api/tweets/' + this.state.district) // fetching new tweets
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          allTweets: tweets,
          loading: false
        });
        this.handleMoreClick(); // set pagination from -1 to 0
        console.log('done fetching from  @', this.state.district);
      })
  }

  // fetching favorites from logged in user
  fetchFavorites = () => {
      console.log('fetching favorites from', this.state.user);
      fetch('/api/user/' + this.state.user)
        .then(res => res.json())
        .then(user => {
          this.setState({
            favorites: user[0].favorites
          });
      })
  }

  // create new user in database
  makeNewUser = (username) => {
    console.log('making new user:', username);

    fetch('/api/user/' + username)
      .then(res => res.json())
      .then(user => {
        if (user.length > 0) { // username allready taken
          this.setState({
            feedback: 'Navnet ' + username + ' er allerede tatt! 😿'
          })
        } else { // username available, make new user
          fetch('/api/user/new', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              district: this.state.district
            }),
            headers:{
                'Content-Type': 'application/json'
            }})
            .then(res => res.json())
            .then((response) => {
              this.login(username); // log in new user
              this.setState({
                feedback: ''
              });
              console.log('made user', username);
            })
            .catch(error => console.error('Error:', error));
        }
      })
  }

  // log out current user
  logout = () => {
    console.log('logging out', this.state.user);
    this.setState({
      user: null,
      favorites: []
    });
  }

  // displaying or hiding a message
  toggle = (message) => {
    this.setState({
      [message]: !this.state[message] // invert 'showXXX' property
    })
  }

  // clicking show more-button (pagination)
  handleMoreClick = () => {
    const newTweets = this.state.allTweets.slice( // get additional tweets to show
      (this.state.page + 1) * 10, 
      ((this.state.page + 1) * 10) + 10
    );

    this.setState(prevState => ({ // show the additional tweets
      page: prevState.page + 1,
      visibleTweets: [...this.state.visibleTweets, ...newTweets]
    }));
  }

  // setting a new district
  getDistrict = (newDistrict) => {
    this.setDistrict(newDistrict);
  }
  
  setDistrict = (newDistrict) => { // stupid bind issue hack
    console.log('setting new district to', newDistrict);

    fetch('/api/user/' + this.state.user, { // save district on user in database
      method: 'POST',
      body: JSON.stringify({
        district: newDistrict
      }),
      headers:{
          'Content-Type': 'application/json'
      }})
      .then(res => res.json())
      .then((response) => {
        this.setState({
          district: newDistrict // make selected district active
        }, () => {
          console.log('district set to ' + newDistrict + ', moving to tweet fetch');
          this.fetchNewTweets(); // fetch selected districts tweets
        })  
      })
      .catch(error => console.error('Error:', error));
  }

  // rendering
  render() {
    return (
      <div className="App">
        <Header />

        <div className="feed">
          {/* --- intro messages --- */}
          <Message text={"Vis meg @" + this.state.district + "! 😺"} />
          <Greeting user={this.state.user}/>
          
          {/* --- main tweet stream --- */}
          { (this.state.loading) 
            ? <Loading /> 
            : <TweetList tweetList={this.state.visibleTweets} user={this.state.user} fetchFavorites={this.fetchFavorites} />
          }

          {/* --- pagination --- */}
          { (this.state.allTweets.length == this.state.visibleTweets.length)
            ? <Message text="Ikke flere tweets å vise! 😿" />
            : <Message text="Gi meg mer! 😽" onClick={this.handleMoreClick} />
          }
          
          {/* --- show favorites / log in --- */}
          { (this.state.user)
            ? <Message text={"Vis mine favoritter! 😻"} onClick={()=>{this.toggle('showFavorites')}} />
            : <Message text="La meg logge på! 😻" onClick={()=>{this.toggle('showLogin')}} />
          }
          { (this.state.showFavorites && this.state.favorites.length != 0)
            ? <TweetList tweetList={this.state.favorites} user={this.state.user} fetchFavorites={this.fetchFavorites} />
            : null
          }
          { (this.state.showLogin)
            ? <Login login={this.login} feedback={this.state.feedback}/>
            : null
          }

          {/* --- setting district --- */}
          <Message text="Bytt politidistrikt! 😼" onClick={()=>{this.toggle('showDistricts')}} />
          { (this.state.showDistricts)
            ? <Districts getDistrict={this.getDistrict}/>
            : null
          }

          {/* --- log out / make new user --- */}
          { (this.state.user)
            ? <Message text="Logg meg av! 🙀" onClick={this.logout} />
            : <Message text="La meg lage en bruker! 😹" onClick={()=>{this.toggle('showNewUser')}} />
          }
          { (this.state.showNewUser)
            ? <NewUser makeNewUser={this.makeNewUser} feedback={this.state.feedback}/>
            : null
          }

          {/* --- show about --- */}
          <Message text="Hva er dette? 🐱" onClick={()=>{this.toggle('showAbout')}} />  
          { (this.state.showAbout)
            ? <Tweet text="Politibil.no lar deg følge politibilene i nabolaget ditt! 🚓 Lag en bruker for å lagre politidistrikt, og få muligheten til å lagre favoritter ved å trykke på meldinger. 💘 Ole Petter" />
            : null
          }
        </div>

      </div>
    );
  }
}

export default App;