import React, { Component } from 'react'
import UserBox from './UserBox.js'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      entries: [],
    }
  }

  handleUserChange(event){
    this.setState({user: event.target.value})
  }


  handleUserSubmit() {
    fetch('/api/entries/' + this.state.user)
      .then(results => {
        return results.json()
      }).then( data => {
        this.setState({entries: data})
      })
  }

  render() {
    let userEntries = this.state.entries

    return (
      <div>
        <UserBox
          value={this.state.user ? this.state.user : ''}
          onChange={this.handleUserChange.bind(this)}
          onClick={this.handleUserSubmit.bind(this)}
        />
        {userEntries.map(x => (
          <div key={x.entryid}>
            <h2>{x.event}</h2>
            <p>Every {x.frequency.days} days</p>
          </div>
        )}
      </div>
    )
  }
}

