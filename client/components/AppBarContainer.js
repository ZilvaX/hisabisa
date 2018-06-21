import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
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
      username: null,
      LoginDialogOpen: false,
    }
    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleLoginClose = this.handleLoginClose.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleLoginOpen() {
    this.setState({ LoginDialogOpen: true })
  }

  handleLoginClose() {
    this.setState({ LoginDialogOpen: false })
  }

  login(username, result) {
    result.json().then(r => {
      this.setState({
        username,
        LoginDialogOpen: false,
      })
      this.props.updateUserid(r.userid)
    })
  }

  logout() {
    fetch('api/authentication/logout', {
      method: 'POST',
    }).then(() => {
      this.setState({
        username: null,
      })
      this.props.updateUserid(null)
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
          {!this.props.userid ? (
            <Button color="inherit" onClick={this.handleLoginOpen}>
              <Typography color="default">Login</Typography>
            </Button>
          ) : (
            <div>
              <Typography color="default">
                Hello, {this.state.username}
              </Typography>
              <Button color="inherit" onClick={this.logout}>
                <Typography color="default">Logout</Typography>
              </Button>
            </div>
          )}
          <LoginDialog
            className={classes.container}
            updateUserid={this.props.updateUserid}
            handleLogin={this.login}
            open={this.state.LoginDialogOpen}
            onClose={this.handleLoginClose}
          />
        </Toolbar>
      </AppBar>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object,
  updateUserid: PropTypes.func.isRequired,
  userid: PropTypes.number,
}

export default withStyles(style)(AppBarContainer)
