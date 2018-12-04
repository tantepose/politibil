// import react and react-cookies
import React, { Component } from 'react';
import cookie from 'react-cookies'

// import components
import Header from './components/Header';
import Loading from './components/Loading';
import TweetList from './components/TweetList';
import Tweet from './components/Tweet';
import Message from './components/Message';
import Greeting from './components/Greeting';
import Login from './components/Login';
import Districts from './components/Districts';
import NewUser from './components/NewUser';

// disable a11y errors from emojis
/* eslint-disable jsx-a11y/accessible-emoji */

class App extends Component {

  // setting default state
  constructor(props) {
    super(); 
    
    this.state = {
      district: cookie.load('district') || 'oslopolitiops',
      user: cookie.load('user') || null,

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
  
  // log in if user allready saved in cookie
  componentWillMount () {
    const cookieUser = cookie.load('user');

    if (cookieUser) {
      this.login(cookieUser);
    } else {
      this.fetchNewTweets();
    }
  }

  // log in - fetch user and update state
  login = (username) => {
      fetch('/api/user/' + username)
        .then(res => {
          if (!res.ok) { // no database connection
            this.setState({
              feedback: 'Ingen kontakt med database! 😿'
            });
          } else {
            return res.json();
          }
        })
        .then(user => {
          if (!user) { // user not found
            this.setState({
              feedback: 'Finner ikke ' + username + '! 😿'
            });
          } else {
            this.setState({
              user: username,
              showLogin: false,
              district: user.district,
              favorites: user.favorites,
              feedback: ''
            }, () => {
              this.fetchNewTweets();

              // set cookies that expire in 99 days
              const now = new Date();
              const expires = new Date();
              expires.setDate(now.getDate() + 99);
              cookie.save('user', this.state.user, { 
                path: '/',
                expires,
                maxAge: 1000
              });
              cookie.save('district', this.state.district, { 
                path: '/',
                expires,
                maxAge: 1000
              });
            });
          }
        })
        .catch(error => console.error('Error loggin in:', error));
  }

  // fetching new set of tweets from @district
  fetchNewTweets = () => {
    window.scrollTo(0, 0);
    
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

    fetch('/api/tweets/' + this.state.district) // fetch tweets
      .then(res => res.json())
      .then(tweets => {
        this.setState({ 
          allTweets: tweets,
          loading: false
        });
        this.handleMoreClick(); // get page 0 (first page)
      })
      .catch(error => console.error('Error fetching tweets:', error));
  }

  // fetching favorites from logged in user
  fetchFavorites = () => {
      fetch('/api/user/' + this.state.user)
        .then(res => res.json())
        .then(user => {
          this.setState({
            favorites: user.favorites.reverse() // reverse() for latests favorites first
          });
        })
        .catch(error => console.error('Error fetching favorites:', error));
  }

  // create new user in database
  makeNewUser = (username) => {
    fetch('/api/user/' + username) // username allready claimed?
      .then(res => res.json())
      .then(user => {
        if (user) { // yes, print error
          this.setState({
            feedback: 'Navnet ' + username + ' er allerede tatt! 😿'
          })
        } else { // no, make new user
          fetch('/api/user/new', {
            method: 'POST',
            body: JSON.stringify({
              username: username,
              district: this.state.district
            }),
            headers:{
                'Content-Type': 'application/json'
            }
          })
          .then(() => { // all good, log in new user
            this.login(username);
            this.setState({
              feedback: ''
            });
          })
        }
      })
      .catch(error => console.error('Error creating user:', error));
  }

  // log out current user
  logout = () => {
    this.setState({
      user: null,
      favorites: []
    });

    cookie.remove('user', { path: '/' });
  }

  // displaying or hiding a message
  toggle = (message) => {
    this.setState({
      [message]: !this.state[message] // invert 'show[Message]' property
    })
  }

  // clicking show more-button (pagination)
  handleMoreClick = () => {
    const newTweets = this.state.allTweets.slice( // get next tweets to show...
      (this.state.page + 1) * 10, // ...by slicing from last visible tweet in list...
      ((this.state.page + 1) * 10) + 10 // ...to the next 10
    );

    this.setState(prevState => ({
      page: prevState.page + 1,
      visibleTweets: [...this.state.visibleTweets, ...newTweets] // add next tweets to list
    }));
  }

  // setting and fetching a new district
  setDistrict = (newDistrict) => {
    this.setState({
      district: newDistrict
    }, () => {
      this.fetchNewTweets();

      // set cookie that expire in 99 days
      const now = new Date();
      const expires = new Date();
      expires.setDate(now.getDate() + 99);
      cookie.save('district', this.state.district, { 
        path: '/',
        expires,
        maxAge: 1000
      });
    });

    // saving new district if user is logged in
    if (this.state.user) {
      fetch('/api/user/' + this.state.user, {
        method: 'POST',
        body: JSON.stringify({
          district: newDistrict
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .catch(error => console.error('Error setting new district:', error));
    }
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
          { (this.state.allTweets.length === this.state.visibleTweets.length)
            ? <Message text="Ikke flere tweets å vise! 😿" />
            : <Message text="Gi meg mer! 😽" onClick={this.handleMoreClick} />
          }
          
          {/* --- show favorites / log in --- */}
          { (this.state.user)
            ? <Message text={"Vis mine favoritter! 😻"} onClick={()=>{this.toggle('showFavorites')}} />
            : <Message text="La meg logge på! 😻" onClick={()=>{this.toggle('showLogin')}} />
          }
          { (this.state.showFavorites && this.state.favorites.length !== 0)
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
            ? <Districts setDistrict={this.setDistrict}/>
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