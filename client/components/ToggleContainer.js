import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  containerDiv: {
    display: 'flex',
    padding: '0 30px',
  },
  button: {
    margin: theme.spacing.unit,
  },
})

class ToggleContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { classes } = this.props
    return (
      <React.Fragment>
        <div className={classes.containerDiv}>
          <Button className={classes.button}>Show All</Button>
          <Button className={classes.button}>Show Overdue</Button>
        </div>
      </React.Fragment>
    )
  }
}

ToggleContainer.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default connect()(withStyles(styles)(ToggleContainer))
