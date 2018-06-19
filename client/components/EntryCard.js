import React from 'react'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
      this.props.removeEntry(entryid)
    })
  }

  render() {
    const { classes, entryid, event, lastoccurrence } = this.props
    return (
      <Card className={classes.card} key={entryid}>
        <CardContent>
          <Typography variant="headline" component="h2">
            {event}
          </Typography>
          <Typography color="textSecondary">{lastoccurrence}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" aria-label="add" onClick={this.handleRemove}>
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
  removeEntry: PropTypes.func.isRequired,
  userid: PropTypes.number,
}

export default withStyles(styles)(EntryCard)
