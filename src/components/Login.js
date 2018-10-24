import React from 'react';

// "log in"-component
class Login extends React.Component {

    // state needed to get user input
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // getting text from text input
    componentDidMount () {
        document.getElementById("username-input").focus();
    }

    handleChange(event) {
        this.setState({
            username: event.target.value
        });
    }

    // event fired on enter or OK click
    handleSubmit(event) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.state.username);
        this.props.login(this.state.username); // send input data to login-function in App.js
    }
  
    render() {
        return (
            <div className="feed">
                <div className="tweet">
                    <p>Hva er brukernavnet ditt? 🐱</p>
                </div>

                <div className="message">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} id='username-input'/>
                        <input type="submit" value="👍" />
                    </form> 
                </div>
            </div>
      );
    }
  }

export default Login;