import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import LoginDialog from './LoginDialog'

const style = theme => ({
  flexTitle: {
    flex: 1,
    marginLeft: 30,
  },
  button: {
    position: 'end', /////////////////////////////////////////////
    margin: theme.spacing.unit,
  },
})

class AppBarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userid: null,
      username: null,
      LoginDialogOpen: false,
    }
    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleLoginClose = this.handleLoginClose.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLoginOpen() {
    this.setState({ LoginDialogOpen: true })
  }

  handleLoginClose() {
    this.setState({ LoginDialogOpen: false })
  }

  handleLogin(event, username, password) {
    console.log('verifying login...')
    // event.preventDefault()
    const headers = { 'content-type': 'application/json' }
    const body = { username, password }
    fetch('/api/authentication/', {
      method: 'POST',
      body: JSON.stringify(body),
      headers,
      credentials: 'include',
    }).then(result => this.login(username, result))
  }

  login(username, result) {
    result.json().then(r => {
      this.setState({
        userid: r.userid,
        username,
        LoginDialogOpen: false,
      })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography
            variant="title"
            color="default"
            className={classes.flexTitle}
          >
            Hisabisa
          </Typography>
          {!this.state.userid ? (
            <Button color="inherit" onClick={this.handleLoginOpen}>
              <Typography color="default">Login</Typography>
            </Button>
          ) : (
            <div>
              <Typography color="default">
                Hello, {this.state.username}
              </Typography>
              <Button color="inherit" onClick={this.handleLoginOpen}>
                <Typography color="default">Logout</Typography>
              </Button>
            </div>
          )}
          <Dialog
            open={this.state.LoginDialogOpen}
            onClose={this.handleLoginClose}
          >
            <LoginDialog
              className={classes.container}
              onSubmit={this.handleLogin}
            />
          </Dialog>
        </Toolbar>
      </AppBar>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(style)(AppBarContainer)
