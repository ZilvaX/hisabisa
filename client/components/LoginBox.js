import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class LoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    this.props.onSubmit(event, this.state.username, this.state.password)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const id = target.id

    this.setState({ [id]: value })
  }

  render() {
    return (
      <div>
        <h1>Hello, please login</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="username">Username:</label>
          <br />
          <input
            type="text"
            id="username"
            value={this.state.username}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="password">
            Password:
            <br />
          </label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

LoginBox.propTypes = {
  onSubmit: PropTypes.func,
}
