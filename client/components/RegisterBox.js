import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RegisterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUsername: '',
      newPassword: '',
      reenterPassword: '',
      error: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this)
  }

  handleSubmit(event) {
    if (this.handlePasswordCheck()) {
      this.props.onSubmit(event, this.state.newUsername, this.state.newPassword)
    } else {
      this.setState({
        error: 'Error: Password does not match',
      })
    }
    event.preventDefault()
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.id

    this.setState({ [name]: value })
  }

  handlePasswordCheck() {
    return this.state.newPassword === this.state.reenterPassword
  }

  render() {
    return (
      <div>
        <h1>... or register</h1>
        {this.state.error && <h3> {this.state.error} </h3>}
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newUsername">
            Username: <br />
          </label>
          <input
            id="newUsername"
            type="text"
            value={this.state.newUsername}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="newPassword">
            Enter Password: <br />
          </label>
          <input
            id="newPassword"
            type="password"
            value={this.state.newPassword}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="reenterPassword">
            Re-enter Password: <br />
          </label>
          <input
            id="reenterPassword"
            type="password"
            value={this.state.reenterPassword}
            onChange={this.handleInputChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

RegisterBox.propTypes = {
  onSubmit: PropTypes.func,
}
