import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import { showLogin } from '../actions/'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.props.dispatch(showLogin(false))
  }

  render() {
    const { open } = this.props
    const dialog = (
      <Dialog open={open} onClose={this.onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <LoginForm />
        </DialogContent>
      </Dialog>
    )
    return dialog
  }
}

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  open: state.loginDialog.open,
})

export default connect(mapStateToProps)(LoginDialog)
