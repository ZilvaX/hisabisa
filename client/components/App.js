import React, { Component } from 'react'

export default class App extends Component {
  constructor() {
    super()
    this.state = {
      entries: []
    }
  }

  componentWillMount() {
    fetch('http://localhost:3000/entries/2')
      .then( results => {
        console.log(results.json)
      })
  }

  render() {
    return (
      <h1>Entries</h1>
    )
  }
}

