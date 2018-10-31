import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'

import { updateUserid, updateUsername, showError, showLogin } from '../actions/'

import {
  NO_ERROR,
  EMPTY_FIELD,
  INCORRECT_PASS,
  USER_NOT_EXISTS,
} from '../helpers/ErrorTypes'

import { constructErrorsToUpdate } from '../helpers/ErrorsToUpdate'

const classes = {
  div: {
    display: 'flex',
    flexDirection: 'column',
    width: '400px',
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
      usernameError: NO_ERROR,
      passwordError: NO_ERROR,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetFields = this.resetFields.bind(this)
  }

  componentDidUpdate(prevProp, prevState) {
    const { username, password, usernameError, passwordError } = this.state

    // Check if previously empty fields have been updated
    const fieldErrors = [
      [username, usernameError, 'usernameError'],
      [password, passwordError, 'passwordError'],
    ]
    const errorsToUpdate = constructErrorsToUpdate(fieldErrors)
    if (errorsToUpdate.length) {
      this.setState(Object.assign({}, ...errorsToUpdate))
    }

    if (usernameError === USER_NOT_EXISTS && prevState.username !== username) {
      this.setState({ usernameError: NO_ERROR })
    }
  }

  handleChange(event) {
    const target = event.target
    const id = target.id
    this.setState({ [id]: target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, password, usernameError, passwordError } = this.state
    // Validate username and password
    if (!username || !password) {
      this.setState({
        usernameError: username ? NO_ERROR : EMPTY_FIELD,
        passwordError: password ? NO_ERROR : EMPTY_FIELD,
      })
      return
    }
    // handle login
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
            usernameError: username ? usernameError : EMPTY_FIELD,
            passwordError: password ? passwordError : EMPTY_FIELD,
          })
          break
        case 401:
          this.setState({
            passwordError: INCORRECT_PASS,
          })
          break
        case 404:
          this.setState({
            usernameError: USER_NOT_EXISTS,
          })
          break
        default:
          this.props.dispatch(
            showError('An error has occurred. Please try again later.'),
          )
      }
    })
  }

  resetFields() {
    this.setState({
      username: null,
      password: null,
      usernameError: NO_ERROR,
      passwordError: NO_ERROR,
    })
  }

  render() {
    const { classes } = this.props
    const form = (
      <form onSubmit={this.handleSubmit} className={classes.div}>
        <DialogContent>
          <TextField
            id="username"
            label="Username"
            margin="normal"
            onChange={this.handleChange}
            error={this.state.usernameError.error}
            fullWidth
            autoFocus
            helperText={this.state.usernameError.toString()}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            margin="normal"
            onChange={this.handleChange}
            error={this.state.passwordError.error}
            fullWidth
            helperText={this.state.passwordError.toString()}
          />
        </DialogContent>
        <DialogActions>
          <Button className={classes.button} type="submit">
            Login
          </Button>
        </DialogActions>
      </form>
    )
    return form
  }
}
LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect()(withStyles(classes)(LoginForm))
