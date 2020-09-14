import React, { Component } from 'react';
import axios from 'axios';

class Registration extends React.Component {
  state = {
    username: [],
    email: [],
    password: []
  }

  handleChange = event => {
    this.setState({
      username: event.target.value,
      email: event.target.value,
      password: event.target.password
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password
    }

    axios.post(`http://localhost:8000/api/user/register`, { username, email, password })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input type="text" name="username" onChange={1} />
          </label>
          <label>
            Email:
            <input type="text" name="email" onChange={1} />
          </label>
          <label>
            Password:
            <input type="text" name="password" onChange={1} />
          </label>
          <button type="submit">register</button>
        </form>
      </div>
    );
  }
}

export default Registration;