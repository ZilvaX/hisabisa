import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { hideError } from '../actions'

function SnackbarContainer(props) {
  const onClose = () => {
    props.dispatch(hideError())
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      open={props.showSnackbar}
      autoHideDuration={4000}
      onClose={onClose}
      ContentProps={{
        'aria-describedby': 'message-id',
      }}
      message={<span id="message-id">{props.errorMessage}</span>}
      action={[
        <IconButton
          key="close"
          aria-label="Close"
          color="inherit"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>,
      ]}
    />
  )
}

SnackbarContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  showSnackbar: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
}
const mapStateToProps = state => ({
  showSnackbar: state.errors.showSnackbar,
  errorMessage: state.errors.errorMessage,
})
export default connect(mapStateToProps)(SnackbarContainer)
