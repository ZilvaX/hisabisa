import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RegisterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: '',
      newPass: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleSubmit(event) {
    this.props.onSubmit(event, this.state.newUser, this.state.newPass)
  }

  handleInputChange(event) {
    const target = event.target
    const value = target.value
    const name = target.id

    this.setState({ [name]: value })
  }

  render() {
    return (
      <div>
        <h1>Welcome to HisaBisa</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="newUser">
            Username: <br />
          </label>
          <input
            id="newUser"
            type="text"
            value={this.state.newUser}
            onChange={this.handleInputChange}
          />
          <br />
          <label htmlFor="newPass">
            Enter Password: <br />
          </label>
          <input
            id="newPass"
            type="password"
            value={this.state.newPass}
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
