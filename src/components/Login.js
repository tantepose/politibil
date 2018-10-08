import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        document.getElementById("username-input").focus();
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log('A name was submitted: ' + this.state.username);
        this.props.getUsername(this.state.username);
    }
  
    render() {
        return (
            <div class="feed">
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