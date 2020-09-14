import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <div className="container">
        <h1>Login</h1>
        <hr></hr>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Username:</label>
            <input 
                placeholder="Enter your Username"
                type="text"
                value={this.state.value}
                onChange={this.handleChange} 
            />
            <label>Email:</label>
            <input
                placeholder="Enter your Username"
                type="text"  value={this.state.value}
                onChange={this.handleChange}
            />
            <label>Password:</label>
            <input
                type="text"
                value={this.state.value}
                onChange={this.handleChange}
            />
            <input
                className="registerbtn"
                type="submit"
                value="Submit"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default App;