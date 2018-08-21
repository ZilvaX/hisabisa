import React from 'react'
import PropTypes from 'prop-types'
import EntryDialog from './EntryDialog'
import { connect } from 'react-redux'
import { submitEntryUpdate } from '../actions'

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
    const entry = {
      event: this.state.event,
      lastoccurrence: this.state.lastoccurrence,
      frequency: { days: this.state.frequency },
    }
    const { dispatch, userid, entryid, handleClose } = this.props
    dispatch(submitEntryUpdate(userid, entryid, entry)).then(() =>
      handleClose(),
    )
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
