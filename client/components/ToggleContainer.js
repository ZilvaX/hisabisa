import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

import { setEntryFilter } from '../actions'
import { SHOW_ALL, SHOW_OVERDUE } from '../helpers/EntryFilters'

const classes = {
  containerDiv: {
    display: 'flex',
    padding: '0 30px',
  },
  button: {
    margin: '1em',
  },
}

class ToggleContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleShowAll = this.handleShowAll.bind(this)
    this.handleShowOverdue = this.handleShowOverdue.bind(this)
  }

  handleShowAll() {
    this.props.dispatch(setEntryFilter(SHOW_ALL))
  }

  handleShowOverdue() {
    this.props.dispatch(setEntryFilter(SHOW_OVERDUE))
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.containerDiv}>
          <Button className={classes.button} onClick={this.handleShowAll}>
            Show All
          </Button>
          <Button className={classes.button} onClick={this.handleShowOverdue}>
            Show Overdue
          </Button>
        </div>
      </React.Fragment>
    )
  }
}

ToggleContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect()(withStyles(classes)(ToggleContainer))
