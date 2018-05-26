import React from 'react'
import EntriesBox from './EntriesBox'
import LoginBox from './LoginBox'
import UserBox from './UserBox'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoggedIn: false,
      user: null,
      entries: [],
      jwt: null,
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
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
        result.json().then(r => {
          this.setState({
            isLoggedIn: true,
            user: username,
            jwt: r.token,
          })
          this.handleEntriesDisplay()
        })
      }
    })
  }

  handleLogout() {
    this.setState({
      isLoggedIn: false,
      user: null,
      entries: [],
      jwt: null,
    })
  }

  handleEntriesDisplay() {
    if (this.state.user) {
      const headers = { authorization: this.state.jwt }
      fetch('/api/entries/' + this.state.user, {
        headers,
      })
        .then(results => results.json())
        .then(data => {
          this.setState({ entries: data })
        })
    }
  }

  render() {
    let greetingForm = null
    if (this.state.isLoggedIn) {
      greetingForm = (
        <UserBox user={this.state.user} onClick={this.handleLogout} />
      )
    } else {
      greetingForm = <LoginBox onSubmit={this.handleLogin} />
    }

    return (
      <div>
        {greetingForm}
        <EntriesBox jwt={this.state.jwt} entries={this.state.entries} />
      </div>
    )
  }
}
