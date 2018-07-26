import React from 'react'
import PropTypes from 'prop-types'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import { updateEntry, removeEntry } from '../actions'
import { convertEntriesFromApi } from '../helpers/EntriesHelper'
import EditEntryDialog from './EditEntryDialog'

const styles = {
  card: {
    flex: '1',
    margin: '1em',
    maxWidth: '400px',
    minWidth: '350px',
  },
}
class EntryCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEditEntryDialog: false,
    }
    this.handleDoneToday = this.handleDoneToday.bind(this)
    this.handleClickEdit = this.handleClickEdit.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
  }

  handleDoneToday() {
    const body = {
      event: this.props.event,
      lastoccurrence: DateTime.local().toISODate(),
      frequency: this.props.frequency,
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
        })
      }
    })
  }

  handleClickEdit() {
    this.setState({ openEditEntryDialog: true })
  }

  handleCloseDialog() {
    this.setState({ openEditEntryDialog: false })
  }

  handleRemove() {
    const headers = {
      'content-type': 'application/json',
    }
    const { userid, entryid } = this.props
    fetch(`/api/users/${userid}/entries/${entryid}`, {
      method: 'DELETE',
      headers,
      credentials: 'include',
    }).then(() => {
      this.props.dispatch(removeEntry(entryid))
    })
  }

  render() {
    const { classes, event, lastoccurrence, frequency } = this.props
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {event}
          </Typography>
          <Typography color="textSecondary">
            Last occurred on {lastoccurrence.toLocaleString(DateTime.DATE_FULL)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            aria-label="done today"
            onClick={this.handleDoneToday}
          >
            Done Today
          </Button>
          <Button size="small" aria-label="edit" onClick={this.handleClickEdit}>
            Edit
          </Button>
          <EditEntryDialog
            open={this.state.openEditEntryDialog}
            handleClose={this.handleCloseDialog}
            userid={this.props.userid}
            entryid={this.props.entryid}
            event={event}
            lastoccurrence={lastoccurrence}
            frequency={frequency}
          />
          <Button size="small" aria-label="remove" onClick={this.handleRemove}>
            Remove
          </Button>
        </CardActions>
      </Card>
    )
  }
}

EntryCard.propTypes = {
  classes: PropTypes.object.isRequired,
  entryid: PropTypes.number.isRequired,
  event: PropTypes.string.isRequired,
  lastoccurrence: PropTypes.object.isRequired,
  frequency: PropTypes.object,
  userid: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userid: state.userid,
})

export default connect(mapStateToProps)(withStyles(styles)(EntryCard))
