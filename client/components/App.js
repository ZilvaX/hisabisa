import React, { Component } from 'react'

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

  handleUserSubmit(event){
    fetch('/entries/'+this.state.user)
      .then( results => {
        return results.json()
      }).then( data => {
        this.setState({entries: data})
      })
  }

  render() {
    let userEntries = this.state.entries

    return (
      <div>
       <form>
          <label>
            User Id: <input type='text' value={this.state.value} onChange={this.handleUserChange.bind(this)}/>
          </label>
          <button type='button' onClick={this.handleUserSubmit.bind(this)}>Submit</button>
        </form>
        {userEntries.map(x => 
          <div key={x.entryid}>
            <h2>{x.event}</h2>
            <p>Every {x.frequency.days} days</p>
          </div>
        )}
      </div>
    )
  }
}

