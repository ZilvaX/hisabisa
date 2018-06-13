import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const styles = {
  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  card: {
    flex: '1',
    margin: '1em',
    maxWidth: '400px',
  },
}
class EntriesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
    }
  }

  updateEntries() {
    fetch(`/api/users/${this.props.userid}/entries/`, {
      credentials: 'include',
    })
      .then(results => results.json())
      .then(data => {
        this.setState({ entries: data })
      })
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.userid) {
      this.updateEntries()
    }
  }

  render() {
    const { classes } = this.props
    const cards = _.map(this.state.entries, entry => {
      return (
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="headline" component="h2">
              {entry.event}
            </Typography>
            <Typography color="textSecondary">{entry.lastoccurence}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Done Today</Button>
            <Button size="small">Done</Button>
          </CardActions>
        </Card>
      )
    })
    return <div className={classes.cardHolder}>{cards}</div>
  }
}

EntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userid: PropTypes.number,
}

export default withStyles(styles)(EntriesContainer)
