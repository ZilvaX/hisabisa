import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { withStyles } from '@material-ui/core/styles'

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
      usernameError: '',
      passwordError: '',
      repeatedPasswordError: '',
      openErrorSnackbar: false,
      errorMessage: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidUpdate() {
    const { password, repeatedPassword, repeatedPasswordError } = this.state
    if (repeatedPasswordError && password === repeatedPassword) {
      this.setState({ repeatedPasswordError: '' })
    }
  }

  handleChange(event) {
    const target = event.target
    const id = target.id
    this.setState({ [id]: target.value })
  }

  handleSubmit() {
    if (this.state.password !== this.state.repeatedPassword) {
      this.setState({
        repeatedPasswordError: 'The repeated password does not match.',
      })
      return
    }
    // handle register
    //event.preventDefault()
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
        <TextField
          id="repeatedPassword"
          label="Repeated Password"
          type="password"
          margin="normal"
          onChange={this.handleChange}
          error={!!this.state.repeatedPasswordError}
          fullWidth
          helperText={this.state.repeatedPasswordError}
        />
        <Button onClick={this.handleSubmit} className={classes.button}>
          Register
        </Button>
      </div>
    )
    return form
  }
}
RegisterForm.propTypes = {
  //dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
}

export default withStyles(classes)(RegisterForm)
