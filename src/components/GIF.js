import React from 'react';

import Loading from './Loading';
import fail from '../fail.gif';

// welcome message containing GIF from giphy.com API
class GIF extends React.Component {

    // setting initial state
    constructor(props) {
        super(props);
        this.state = {
            gif: '',
            key: 'm0y4OoHIR0xcOc9ZgHdzeOogJ6IhIi6C',
            loading: true,
            sucsess: true
        };
    }
    
    // fetch random GIF-sticker with "police" tag
    componentDidMount () {
        const url = 'https://api.giphy.com/v1/stickers/random?api_key=' + this.state.key + '&tag=police&rating=G';
        fetch(url)
            .then(res => res.json())
            .then(gif => {
                this.setState({ 
                    gif: gif.data.images.fixed_width.url,
                    loading: false
                });
            })
            .catch(err => { // insert standin GIF if API fails
                console.log('GIF-error: ', err.message);
                this.setState({
                    gif: fail,
                    loading: false
                })
            })
    }

    // render message with GIF
    render() {
        return (
            <div className="tweet">
                { (this.props.user)
                    ? <p>Ålbings, {this.props.user}! 👮</p>
                    : <p>Ålbings! 👮</p>
                }
                
                { (this.state.loading) 
                    ? <Loading />
                    : <img src={this.state.gif} ></img>
                }
            </div>
      );
    }
  }

export default GIF;