import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import { updateUserid, updateUsername, showError, showLogin } from '../actions/'

const classes = {
  div: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    alignSelf: 'flex-end',
  },
}

class LoginForm extends React.Component {
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
          result.json().then(r => {
            this.props.dispatch(updateUserid(r.userid))
            this.props.dispatch(updateUsername(username))
          })
          this.props.dispatch(showLogin(false))
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

  render() {
    const { classes } = this.props
    const form = (
      <div className={classes.div}>
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
        <Button className={classes.button} onClick={this.handleSubmit}>
          Login
        </Button>
      </div>
    )
    return form
  }
}
LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect()(withStyles(classes)(LoginForm))
