import React from 'react'

export default class AddEntriesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      lastOccurence: '',
      frequency: '',
    }
    this.handleFormChange = this.handleFormChange.bind(this)
  }
  handleFormChange(event) {
    const { target } = event
    this.setState({
      [target.id]: target.value,
    })
  }

  handleSubmit(event) {
    console.log('submit')
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
