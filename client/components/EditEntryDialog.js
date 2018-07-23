import React from 'react'
import PropTypes from 'prop-types'
import EntryDialog from './EntryDialog'
import { convertEntriesFromApi } from '../helpers/EntriesHelper'
import { connect } from 'react-redux'
import { updateEntry } from '../actions'

class EditEntryDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: this.props.event,
      lastoccurrence: this.props.lastoccurrence.toISODate(),
      frequency: this.props.frequency.days,
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
    const body = {
      event: this.state.event,
      lastoccurrence: this.state.lastoccurrence,
      frequency: { days: this.state.frequency },
    }
    const headers = {
      'content-type': 'application/json',
    }
    fetch(`/api/users/${this.props.userid}/entries/${this.props.entryid}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => {
      if (result.status === 200) {
        result.json().then(json => {
          const convertedEntry = convertEntriesFromApi([json])[0]
          this.props.dispatch(updateEntry(convertedEntry))
          this.props.handleClose()
        })
      }
    })
  }

  render() {
    return (
      <div>
        <EntryDialog
          open={this.props.open}
          handleClose={this.props.handleClose}
          handleFormChange={this.handleFormChange}
          handleFormSubmit={this.handleFormSubmit}
          event={this.state.event}
          lastoccurrence={this.state.lastoccurrence}
          frequency={this.state.frequency}
          title="Edit Entry"
          contenttext="Make changes to an exisiting event"
          submitbutton="Save Changes"
        />
      </div>
    )
  }
}

EditEntryDialog.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired,
  userid: PropTypes.number,
  entryid: PropTypes.number,
  event: PropTypes.string,
  lastoccurrence: PropTypes.object,
  frequency: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect()(EditEntryDialog)
