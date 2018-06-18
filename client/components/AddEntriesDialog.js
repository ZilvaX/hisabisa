import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

export default class AddEntriesDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      event: '',
      lastoccurrence: new Date().toISOString().substring(0, 10),
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

  render() {
    return (
      <Dialog
        open={this.props.open}
        aria-labelledby="add-entry-form-dialog-title"
      >
        <DialogTitle id="add-entry-form-dialog-title">Add Entry</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a reminder with an event name, when this event last occurred
            and how often you want to be reminded
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="event"
            label="Event"
            fullWidth
            value={this.state.event}
            onChange={this.handleFormChange}
          />
          <TextField
            margin="normal"
            id="lastoccurrence"
            label="Last Occurence"
            fullWidth
            type="date"
            value={this.state.lastoccurrence}
            onChange={this.handleFormChange}
          />
          <TextField
            margin="normal"
            id="frequency"
            label="Frequency"
            fullWidth
            type="number"
            value={this.state.frequency}
            onChange={this.handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.props.handleClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

AddEntriesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}
