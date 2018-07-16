import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'

import { updateUserid, updateUsername, showError } from '../actions/'
import { connect } from 'react-redux'

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      usernameError: '',
      passwordError: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetErrors = this.resetErrors.bind(this)
    this.resetFields = this.resetFields.bind(this)
    this.onClose = this.onClose.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const id = target.id
    this.setState({ [id]: target.value })
  }

  handleSubmit() {
    this.resetErrors()
    const username = this.state.username
    const password = this.state.password
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/authentication/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => {
      switch (result.status) {
        case 200:
          this.props.handleLogin(username)
          result.json().then(r => {
            this.props.dispatch(updateUserid(r.userid))
            this.props.dispatch(updateUsername(username))
          })
          this.resetFields()
          break
        case 400:
          this.setState({
            usernameError: username ? '' : 'Field is empty',
            passwordError: password ? '' : 'Field is empty',
          })
          break
        case 401:
          this.setState({
            passwordError: 'Incorrect password',
          })
          break
        case 404:
          this.setState({
            usernameError: 'This user does not exist',
          })
          break
        default:
          this.props.dispatch(
            showError('An error has occurred. Please try again later.'),
          )
      }
    })
  }

  resetErrors() {
    this.setState({
      usernameError: '',
      passwordError: '',
    })
  }

  resetFields() {
    this.setState({
      username: null,
      password: null,
      usernameError: '',
      passwordError: '',
    })
  }

  onClose() {
    this.resetFields()
    this.props.onClose()
  }

  render() {
    const dialog = (
      <Dialog open={this.props.open} onClose={this.onClose}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <TextField
            id="username"
            label="Username"
            margin="normal"
            onChange={this.handleChange}
            error={!!this.state.usernameError}
            fullWidth
            autoFocus
            helperText={this.state.usernameError}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            margin="normal"
            onChange={this.handleChange}
            error={!!this.state.passwordError}
            fullWidth
            helperText={this.state.passwordError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleSubmit}>Login</Button>
        </DialogActions>
      </Dialog>
    )
    return <React.Fragment>{dialog}</React.Fragment>
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object,
  handleLogin: PropTypes.func,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LoginDialog)
