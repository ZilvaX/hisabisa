import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import EntryDialog from './EntryDialog'
import { convertEntriesFromApi } from '../helpers/EntriesHelper'
import { addEntry } from '../actions'

class AddEntriesDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      lastoccurrence: new Date().toISOString().substring(0, 10),
      frequency: '',
    }
    this.handleFormChange = this.handleFormChange.bind(this)
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
  }

  handleFormChange(event) {
    const { target } = event
    this.setState({
      [target.id]: target.value,
    })
  }

  handleFormSubmit() {
    const body = [
      {
        event: this.state.event,
        lastoccurrence: this.state.lastoccurrence,
        frequency: { days: parseInt(this.state.frequency, 10) },
      },
    ]
    const headers = {
      'content-type': 'application/json',
    }
    fetch(`/api/users/${this.props.userid}/entries`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => {
      if (result.status === 201) {
        result.json().then(json => {
          const convertedEntry = convertEntriesFromApi(json)[0] // Returns an array of size 1
          this.props.dispatch(addEntry(convertedEntry))
          this.props.handleClose()
        })
      }
    })
  }

  render() {
    return (
      <EntryDialog
        open={this.props.open}
        handleClose={this.props.handleClose}
        handleFormChange={this.handleFormChange}
        handleFormSubmit={this.handleFormSubmit}
        event={this.state.event}
        lastoccurrence={this.state.lastoccurrence}
        frequency={this.state.frequency.days}
        title="Add Entry"
        contenttext="Create a reminder with an event name, when this event last occurred and how often you want to be reminded"
        submitbutton="Create"
      />
    )
  }
}

AddEntriesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userid: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(AddEntriesDialog)
