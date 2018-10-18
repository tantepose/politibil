import React from 'react';
import Loading from './Loading';

class GIF extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gif: '',
            key: 'ykdiJpS3y6K9u5A2P5awHYeEUO25qgyj',
            loading: true,
            sucsess: true
        };
    }
    
    componentDidMount () {
        const url = 'https://api.giphy.com/v1/stickers/random?api_key=' + this.state.key + '&tag=police&rating=G';
        fetch(url) //{mode: 'no-cors'}
        .then(res => res.json())
        .then(gif => {
            this.setState({ 
                gif: gif.data.images.fixed_width.url,
                loading: false
            });
        })
        .catch(err => {
            console.log('GIF-error: ', err.message);

            // smart solution goes here, for now:
            this.setState({
                gif: "",
                loading: false
            })
        })
    }

  
    render() {
        return (
            <div className="tweet">
                { (this.state.loading) 
                    ? <Loading />
                    : <img src={this.state.gif} ></img>
                }
            </div>
      );
    }
  }

export default GIF;