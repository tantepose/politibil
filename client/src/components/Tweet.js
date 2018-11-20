import React from 'react';
import heart from '../heart.png';

// displaying a single clickable tweet
class Tweet extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            favorite: false
        }
    }
    
    render() {
        return (
            <div className = "tweet" onClick={ () => { 
                    if (this.props.user) {
                        this.props.onClick(this.props.text, this.props.timestamp);
                        this.setState({favorite: true});
                    }
                }}
            >

                <p> {this.props.text} </p>

                { (this.props.timestamp)
                    ? <p className = "date"> {this.props.timestamp} </p>
                    : null
                }

                { (this.state.favorite)
                    ? <img src={heart} className="heart" alt="heart" />
                    : null
                }

            </div>
        )
    }
}
    

export default Tweet;