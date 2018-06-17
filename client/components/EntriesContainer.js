import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import Add from '@material-ui/icons/Add'

const styles = {
  cardHolder: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  card: {
    flex: '1',
    margin: '1em',
    maxWidth: '400px',
    minWidth: '350px',
  },
  addDiv: {
    margin: '1em',
    display: 'flex',
    justifyContent: 'center',
  },
  containerDiv: {
    display: 'flex',
    flexFlow: 'column',
  },
}
class EntriesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entries: [],
      open: false,
    }
    this.handleClickAdd = this.handleClickAdd.bind(this)
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

  handleClickAdd() {
    this.setState({ open: true })
  }

  render() {
    const { classes } = this.props
    const cards = _.map(this.state.entries, entry => {
      return (
        <Card className={classes.card} key={entry.entryid}>
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
    return (
      <React.Fragment>
        <div className={classes.containerDiv}>
          <div className={classes.cardHolder}>{cards}</div>
          {this.props.userid && (
            <div className={classes.addDiv}>
              <Button
                variant="fab"
                color="secondary"
                aria-label="add"
                className={classes.addDiv}
                onClick={this.handleClickAdd}
              >
                <Add />
              </Button>
            </div>
          )}
        </div>
      </React.Fragment>
    )
  }
}

EntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userid: PropTypes.number,
}

export default withStyles(styles)(EntriesContainer)
