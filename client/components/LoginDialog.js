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
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.value
    const id = target.id
    this.setState({ [id]: value })
  }

  handleSubmit(event) {
    console.log('submitting' + this.state.username + ' ' + this.state.password)
    this.props.onSubmit(event, this.state.username, this.state.password)
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
          />
          <TextField
            id="password"
            label="Password"
            type="password"
            onChange={this.handleChange}
          />
          <Button onClick={this.handleSubmit}>Submit</Button>
        </DialogContent>
      </div>
    )
  }
}

LoginDialog.propTypes = {
  classes: PropTypes.object,
  onSubmit: PropTypes.func,
}

export default withStyles(style)(LoginDialog)
