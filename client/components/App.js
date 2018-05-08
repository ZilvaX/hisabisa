import React, { Component } from 'react'
import UserBox from './UserBox.js'
import ResultsDisplay from './ResultsDisplay'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      user: null,
      entries: [],
    }
    this.handleUserChange = this.handleUserChange.bind(this)
  }

  handleUserChange(event){
    this.setState({user: event.target.value})
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
        <UserBox
          value={this.state.user ? this.state.user : ''}
          onChange={this.handleUserChange}
          onClick={this.handleUserSubmit.bind(this)}
        />
        <ResultsDisplay value={this.state.entries} />
      </div>
    )
  }
}

