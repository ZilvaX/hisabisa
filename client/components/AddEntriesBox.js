import React from 'react'
import PropTypes from 'prop-types'

export default class AddEntriesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      lastOccurence: '',
      frequency: '',
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleFormChange(event) {
    const { target } = event
    this.setState({
      [target.id]: target.value,
    })
  }

  handleSubmit(event) {
    const body = {
      event: this.state.event,
      lastoccurence: this.state.lastOccurence,
      frequency: this.state.frequency,
    }
    const headers = {
      'content-type': 'application/json',
      Authorization: this.props.jwt,
    }
    fetch('/api/entries', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
    }).then(result => {
      if (result.status === 201) {
        result.json().then(json => {
          this.props.addEntry(json)
        })
      }
    })
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="event">Event:</label>
        <input
          id="event"
          type="text"
          value={this.state.event}
          onChange={this.handleFormChange}
        />
        <label htmlFor="lastOccurence">Last Occurence:</label>
        <input
          id="lastOccurence"
          type="date"
          value={this.state.lastOccurence}
          onChange={this.handleFormChange}
        />
        <label htmlFor="frequency">How Often:</label>
        <input
          id="frequency"
          type="number"
          value={this.state.frequency}
          onChange={this.handleFormChange}
        />
        <input type="submit" value="+" />
      </form>
    )
  }
}

AddEntriesBox.propTypes = {
  jwt: PropTypes.string.isRequired,
  addEntry: PropTypes.func.isRequired,
}
