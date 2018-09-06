import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

import {
  updateUserid,
  updateUsername,
  showRegister,
  showError,
  submitEntriesInStore,
} from '../actions/'
import {
  NO_ERROR,
  EMPTY_FIELD,
  NON_EQUAL_PASS,
  USER_EXISTS,
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
class RegisterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      repeatedPassword: null,
      usernameError: NO_ERROR,
      passwordError: NO_ERROR,
      repeatedPasswordError: NO_ERROR,
      openErrorSnackbar: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate(prevProp, prevState) {
    const {
      username,
      usernameError,
      password,
      passwordError,
      repeatedPassword,
      repeatedPasswordError,
    } = this.state

    // Check if previously empty fields have been updated
    const fieldErrors = [
      [username, usernameError, 'usernameError'],
      [password, passwordError, 'passwordError'],
      [repeatedPassword, repeatedPasswordError, 'repeatedPasswordError'],
    ]
    const errorsToUpdate = constructErrorsToUpdate(fieldErrors)
    if (errorsToUpdate.length) {
      this.setState(Object.assign({}, ...errorsToUpdate))
    }

    if (usernameError === USER_EXISTS && prevState.username !== username) {
      this.setState({ usernameError: NO_ERROR })
    }

    if (
      repeatedPasswordError === NON_EQUAL_PASS &&
      password === repeatedPassword
    ) {
      this.setState({ repeatedPasswordError: NO_ERROR })
    }
  }

  handleChange(event) {
    const target = event.target
    const id = target.id
    this.setState({ [id]: target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, password, repeatedPassword } = this.state
    if (!username || !password || !repeatedPassword) {
      this.setState({
        usernameError: username ? NO_ERROR : EMPTY_FIELD,
        passwordError: password ? NO_ERROR : EMPTY_FIELD,
        repeatedPasswordError: repeatedPassword ? NO_ERROR : EMPTY_FIELD,
      })
      return
    }
    if (password !== repeatedPassword) {
      this.setState({
        repeatedPasswordError: NON_EQUAL_PASS,
      })
      return
    }
    // handle register
    const { dispatch } = this.props
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => {
      switch (result.status) {
        case 201:
          result.json().then(r => {
            dispatch(updateUserid(r.userid))
            dispatch(updateUsername(username))
            dispatch(submitEntriesInStore(r.userid))
          })
          dispatch(showRegister(false))
          break
        case 409:
          this.setState({ usernameError: USER_EXISTS })
          break
        default:
          dispatch(showError('An error has occurred. Please try again later.'))
      }
    })
  }
  render() {
    const { classes } = this.props
    const form = (
      <form onSubmit={this.handleSubmit} className={classes.div}>
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
        <TextField
          id="repeatedPassword"
          label="Repeated Password"
          type="password"
          margin="normal"
          onChange={this.handleChange}
          error={this.state.repeatedPasswordError.error}
          fullWidth
          helperText={this.state.repeatedPasswordError.toString()}
        />
        <Button type="submit" className={classes.button}>
          Register
        </Button>
      </form>
    )
    return form
  }
}
RegisterForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default connect()(withStyles(classes)(RegisterForm))
