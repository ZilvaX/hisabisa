import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { DateTime } from 'luxon'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Add from '@material-ui/icons/Add'

import AddEntriesDialog from './AddEntriesDialog'
import EntryCard from './EntryCard'
import { fetchEntries, receiveEntries } from '../actions'
import { SHOW_ALL, SHOW_OVERDUE } from '../helpers/EntryFilters'

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
  fab: {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
  },
}
class EntriesContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openAddEntriesDialog: false,
    }
    this.handleClickAdd = this.handleClickAdd.bind(this)
    this.handleCloseDialog = this.handleCloseDialog.bind(this)
  }

  updateEntries() {
    this.props.dispatch(fetchEntries(this.props.userid))
  }

  componentDidUpdate(prevProps) {
    // If previously we weren't logged in but now we are
    if (!prevProps.userid && this.props.userid) {
      this.updateEntries()
    }

    // If previously we were logged in but now we aren't
    if (prevProps.userid && !this.props.userid) {
      this.props.dispatch(receiveEntries([]))
    }
  }

  handleClickAdd() {
    this.setState({ openAddEntriesDialog: true })
  }

  handleCloseDialog() {
    this.setState({ openAddEntriesDialog: false })
  }

  render() {
    const { classes, entries, entryFilter } = this.props
    const filteredEntries = _.filter(entries, entry => {
      const today = DateTime.local()
      const nextOccurrence = entry.lastoccurrence.plus(entry.frequency)
      switch (entryFilter) {
        case SHOW_OVERDUE:
          if (nextOccurrence < today) {
            return entry
          }
          break
        case SHOW_ALL:
          return entry
      }
    })
    const cards = _.map(filteredEntries, entry => {
      return (
        <EntryCard
          entryid={entry.entryid}
          event={entry.event}
          lastoccurrence={entry.lastoccurrence}
          frequency={entry.frequency}
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
                className={classes.fab}
                onClick={this.handleClickAdd}
              >
                <Add />
              </Button>
            </div>
          )}
        </div>
        <AddEntriesDialog
          open={this.state.openAddEntriesDialog}
          handleClose={this.handleCloseDialog}
          userid={this.props.userid}
        />
      </React.Fragment>
    )
  }
}

EntriesContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  userid: PropTypes.number,
  entries: PropTypes.array,
  entryFilter: PropTypes.symbol,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  userid: state.userid,
  entries: state.entries,
  entryFilter: state.entryFilter,
})

export default connect(mapStateToProps)(withStyles(styles)(EntriesContainer))
