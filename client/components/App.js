import React, { Component } from 'react'
import ResultsDisplay from './ResultsDisplay'
import LoginBox from './LoginBox'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      entries: [],
      jwt: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin(event, username, password) {
    event.preventDefault()
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/authentication/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).then(result => {
      if (result.status === 200) {
        result.json().then(r =>
          this.setState({
            user: username,
            jwt: r.token,
          }),
        )
      }
    })
  }

  handleUserSubmit() {
    if (this.state.user) {
      fetch('/api/entries/' + this.state.user)
        .then(results => {
          return results.json()
        })
        .then(data => {
          this.setState({ entries: data })
        })
    }
  }

  render() {
    return (
      <div>
        <LoginBox onSubmit={this.handleLogin} />
        <ResultsDisplay value={this.state.entries ? this.state.entries : []} />
      </div>
    )
  }
}
