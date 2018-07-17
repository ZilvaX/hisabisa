import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'

import { showLogin } from '../actions/'
import { connect } from 'react-redux'
import LoginForm from './LoginForm'

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      usernameError: '',
      passwordError: '',
    }
    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.resetFields()
    this.props.dispatch(showLogin(false))
  }

  render() {
    const dialog = (
      <Dialog open={this.props.open} onClose={this.onClose}>
        <DialogTitle>Login</DialogTitle>
        <LoginForm />
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
