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

import { removeEntry } from '../actions'

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
    this.handleRemove = this.handleRemove.bind(this)
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
    const { classes, event, lastoccurrence } = this.props
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
  userid: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(withStyles(styles)(EntryCard))
