import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class RegisterBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newUser: '',
      newPass: '',
      rePass: '',
      error: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handlePasswordCheck = this.handlePasswordCheck.bind(this)
  }

  handleSubmit(event) {
    if (this.handlePasswordCheck()) {
      this.props.onSubmit(event, this.state.newUser, this.state.newPass)
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
    console.log('password check' + this.state.newPass === this.state.rePass)
    this.state.newPass === this.state.rePass ? true : false
  }

  render() {
    return (
      <div>
        <h1>... or register</h1>
        {this.state.error && <h3> {this.state.error} </h3>}
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
          <label htmlFor="rePass">
            Re-enter Password: <br />
          </label>
          <input
            id="rePass"
            type="password"
            value={this.state.rePass}
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
