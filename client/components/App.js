import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      entries: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:8080/entries/2')
      .then( results => results.json())
      .then( results => console.log(results))
  }

  render() {
    return (
      <h1>Entries</h1>
    )
  }
}

