import React from 'react';

class NewUser extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount () {
        document.getElementById("newuser-input").focus();
    }

    handleChange(event) {
        this.setState({username: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.makeNewUser(this.state.username);
    }
  
    render() {
        return (
            <div className="feed">
                <div className="tweet">
                    <p>Hva skal være brukernavnet ditt? 🐱 </p>
                </div>

                <div className="message">
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.value} onChange={this.handleChange} id='newuser-input'/>
                        <input type="submit" value="👍" />
                    </form> 
                </div>
            </div>
      );
    }
  }

export default NewUser;