import React, { Component } from 'react';
import Spinner from './Spinner';

class TestMessage extends Component {

    constructor (props) {
        super(props);
        
        this.state = {
            loading: true
        }
    }

    componentDidMount () {
        setTimeout(function () {
            this.setState({
                loading: false
            });
        }.bind(this), this.props.delay);
    }
    
    
    render() {
      return (
        <div className="tweet">
            { (this.state.loading) 
                ? <Spinner />
                : <p>{this.props.text}</p>
            }
        </div>
      );
    }
}

export default TestMessage;