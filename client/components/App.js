import React from 'react'
import _ from 'lodash'

import EntriesBox from './EntriesBox'
import LoginBox from './LoginBox'
import UserBox from './UserBox'
import RegisterBox from './RegisterBox'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      user: null,
      userid: null,
      entries: [],
    }
    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.addEntry = this.addEntry.bind(this)
    this.handleRegister = this.handleRegister.bind(this)
    this.removeEntry = this.removeEntry.bind(this)
  }

  handleRegister(event, username, password) {
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/users/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => {
      if (result.status === 201) {
        //log the new user in
        this.login(username, result)
      } else if (result.status === 409) {
        console.log('username already taken')
        console.log(result)
      } else {
        console.log('error')
      }
    })
  }

  handleLogin(event, username, password) {
    event.preventDefault()
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/authentication/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => this.login(username, result))
  }

  login(username, result) {
    result.json().then(r => {
      this.setState({
        user: username,
        userid: r.userid,
      })
      this.handleEntriesDisplay()
    })
  }

  // TODO Add logout api call
  handleLogout() {
    this.setState({
      user: null,
      userid: null,
      entries: [],
    })
  }

  handleEntriesDisplay() {
    if (this.state.user) {
      fetch(`/api/users/${this.state.userid}/entries/`, {
        credentials: 'include',
      })
        .then(results => results.json())
        .then(data => {
          this.setState({ entries: data })
        })
    }
  }

  addEntry(entry) {
    this.setState({ entries: [...this.state.entries, entry] })
  }

  removeEntry(entryid) {
    this.setState({
      entries: _.filter(this.state.entries, x => x.entryid !== entryid),
    })
  }

  render() {
    return (
      <div>
        {!this.state.userid ? (
          <div>
            <LoginBox onSubmit={this.handleLogin} />
            <RegisterBox onSubmit={this.handleRegister} />
          </div>
        ) : (
          <div>
            <UserBox user={this.state.user} onClick={this.handleLogout} />
            <EntriesBox
              userid={this.state.userid}
              entries={this.state.entries}
              addEntry={this.addEntry}
              removeEntry={this.removeEntry}
            />
          </div>
        )}
      </div>
    )
  }
}
