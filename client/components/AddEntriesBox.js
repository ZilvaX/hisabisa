import React from 'react'

export default class AddEntriesBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      lastOccurence: '',
      frequency: '',
    }
    this.onEventChange = this.onEventChange.bind(this)
    this.onLastOccurenceChange = this.onLastOccurenceChange.bind(this)
    this.onFrequencyChange = this.onFrequencyChange.bind(this)
  }
  onEventChange(event) {
    this.setState({
      event: event.target.value,
    })
  }
  onLastOccurenceChange(event) {
    this.setState({
      lastOccurence: event.target.value,
    })
  }
  onFrequencyChange(event) {
    this.setState({
      frequency: event.target.value,
    })
  }
  render() {
    return (
      <form>
        <label htmlFor="event">Event:</label>
        <input
          id="event"
          type="text"
          value={this.state.event}
          onChange={this.onEventChange}
        />
        <label htmlFor="lastOccurence">Last Occurence:</label>
        <input
          id="lastOccurence"
          type="date"
          value={this.state.lastOccurence}
          onChange={this.onLastOccurenceChange}
        />
        <label htmlFor="frequency">How Often:</label>
        <input
          id="frequency"
          type="number"
          value={this.state.frequency}
          onChange={this.onFrequencyChange}
        />
        <input type="submit" value="+" />
      </form>
    )
  }
}
