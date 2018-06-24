import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'

import CloseIcon from '@material-ui/icons/Close'

export default class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      usernameError: '',
      passwordError: '',
      openErrorSnackbar: false,
      errorMessage: '',
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetErrors = this.resetErrors.bind(this)
    this.resetFields = this.resetFields.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onErrorSnackbarClose = this.onErrorSnackbarClose.bind(this)
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
          this.props.handleLogin(username, result)
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
          this.setState({
            openErrorSnackbar: true,
            errorMessage: 'An error has occurred. Please try again later',
          })
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

  onErrorSnackbarClose() {
    this.setState({
      openErrorSnackbar: false,
    })
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
    const snackbar = (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={this.state.openErrorSnackbar}
        autoHideDuration={4000}
        onClose={this.onErrorSnackbarClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{this.state.errorMessage}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.onErrorSnackbarClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
    )
    return (
      <React.Fragment>
        {dialog}
        {snackbar}
      </React.Fragment>
    )
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object,
  handleLogin: PropTypes.func,
  updateUserid: PropTypes.func.isRequired,
  userid: PropTypes.number,
  open: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}
