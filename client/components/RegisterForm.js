import React from 'react'

import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class RegisterForm extends React.Component {
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
  }
  render() {
    const form = (
      <div>
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
        <Button onClick={this.handleSubmit}>Register</Button>
      </div>
    )
    return form
  }
}

export default RegisterForm
