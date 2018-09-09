import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Button from '@material-ui/core/Button'

function EntryDialog(props) {
  return (
    <Dialog open={props.open} aria-labelledby="entry-form-dialog-title">
      <DialogTitle id="entry-form-dialog-title">{props.title}</DialogTitle>
      <form onSubmit={props.handleFormSubmit}>
        <DialogContent>
          <DialogContentText>{props.contenttext}</DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="event"
            label="Event"
            fullWidth
            value={props.event}
            onChange={props.handleFormChange}
          />
          <TextField
            margin="normal"
            id="lastoccurrence"
            label="Last Occurrence"
            fullWidth
            type="date"
            value={props.lastoccurrence}
            onChange={props.handleFormChange}
          />
          <TextField
            margin="normal"
            id="frequency"
            label="Frequency (in Days)"
            fullWidth
            type="number"
            value={props.frequency}
            onChange={props.handleFormChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button type="sumbit" color="primary">
            {props.submitbutton}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

EntryDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
  handleFormSubmit: PropTypes.func.isRequired,
  event: PropTypes.string,
  lastoccurrence: PropTypes.string,
  frequency: PropTypes.number,
  title: PropTypes.string,
  contenttext: PropTypes.string,
  submitbutton: PropTypes.string,
}

export default EntryDialog
