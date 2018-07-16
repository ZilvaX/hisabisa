import React from 'react'
import { connect } from 'react-redux'

import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

import { hideError } from '../actions'

class SnackbarContainer extends React.Component {
  render() {
    const onClose = () => {
      this.props.dispatch(hideError())
    }
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.props.showSnackbar}
        autoHideDuration={4000}
        onClose={onClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.props.errorMessage}</span>}
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
}
const mapStateToProps = state => ({
  showSnackbar: state.errors.showSnackbar,
  errorMessage: state.errors.errorMessage,
})
export default connect(mapStateToProps)(SnackbarContainer)
