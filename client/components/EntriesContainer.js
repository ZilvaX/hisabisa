import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'

import AddEntriesDialog from './AddEntriesDialog'
import EntryCard from './EntryCard'

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
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
    this.addEntry = this.addEntry.bind(this)
    this.removeEntry = this.removeEntry.bind(this)
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
    // If previously we weren't logged in but now we are
    if (!prevProps.userid && this.props.userid) {
      this.updateEntries()
    }

    // If previously we were logged in but now we aren't
    if (prevProps.userid && !this.props.userid) {
      this.setState({ entries: [] })
    }
  }

  handleClickAdd() {
    this.setState({ open: true })
  }

  handleCloseDialog() {
    this.setState({ open: false })
  }

  addEntry(entry) {
    this.setState({ entries: [...this.state.entries, entry] })
  }

  removeEntry(entryid) {
    this.setState({
      entries: _.filter(this.state.entries, x => x.entryid !== entryid),
    })
  }

  render() {
    const { classes } = this.props
    const cards = _.map(this.state.entries, entry => {
      return (
        <EntryCard
          entryid={entry.entryid}
          event={entry.event}
          lastoccurrence={entry.lastoccurrence}
          removeEntry={this.removeEntry}
          userid={this.props.userid}
          key={entry.entryid}
        />
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
        <AddEntriesDialog
          open={this.state.open}
          handleClose={this.handleCloseDialog}
          addEntry={this.addEntry}
          userid={this.props.userid}
        />
      </React.Fragment>
    )
  }
}

EntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userid: PropTypes.number,
}

export default withStyles(styles)(EntriesContainer)
