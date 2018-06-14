import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const style = {
  flexTitle: {
    flex: 1,
    marginLeft: 30,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 200,
  },
}

class LoginDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      password: null,
      errorMessage: '',
      usernameError: false,
      passwordError: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetErrors = this.resetErrors.bind(this)
  }

  handleChange(event) {
    const target = event.target
    // const value = target.value
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
      // console.log(result)
      if (result.status === 200) {
        return this.props.handleLogin(username, result)
      } else if (result.status === 400) {
        this.setState({
          errorMessage: 'Field is empty',
          usernameError: !this.state.username,
          passwordError: !this.state.password,
        })
      } else if (result.status === 401) {
        this.setState({
          errorMessage: 'Incorrect password',
          passwordError: true,
        })
      } else if (result.status === 404) {
        this.setState({
          errorMessage: 'This user does not exist',
          usernameError: true,
        })
      } else {
        this.setState({
          errorMessage: 'An error has occurred. Please try again later', //
        })
      }
    })
  }

  resetErrors() {
    console.log('reset!')
    this.setState({
      errorMessage: '',
      usernameError: false,
      passwordError: false,
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <DialogTitle>Login</DialogTitle>
        <DialogContent className={classes.container}>
          <TextField
            id="username"
            label="Username"
            onChange={this.handleChange}
            error={this.state.usernameError}
            helperText={this.state.usernameError ? this.state.errorMessage : ''}
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={this.handleChange}
            error={this.state.passwordError}
            helperText={this.state.passwordError ? this.state.errorMessage : ''}
          />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </DialogContent>
      </div>
    )
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object,
  handleLogin: PropTypes.func,
  updateUserid: PropTypes.func.isRequired,
  userid: PropTypes.number,
}

export default withStyles(style)(LoginDialog)
