import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import LoginDialog from './LoginDialog'

const style = {
  flexTitle: {
    flex: 1,
    marginLeft: 30,
  },
}

class AppBarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: null,
      loginDialogOpen: false,
    }
    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleLoginClose = this.handleLoginClose.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleLoginOpen() {
    this.setState({ loginDialogOpen: true })
  }

  handleLoginClose() {
    this.setState({ loginDialogOpen: false })
  }

  login(username, result) {
    result.json().then(r => {
      this.setState({
        username,
        loginDialogOpen: false,
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
    const loginStatus = !this.props.userid ? (
      <Button color="inherit" onClick={this.handleLoginOpen}>
        <Typography color="default">Login</Typography>
      </Button>
    ) : (
      <React.Fragment>
        <Typography>Hello, {this.state.username}</Typography>
        <Button onClick={this.logout}>
          <Typography>Logout</Typography>
        </Button>
      </React.Fragment>
    )
    return (
      <React.Fragment>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="default"
              className={classes.flexTitle}
            >
              Hisabisa
            </Typography>
            {loginStatus}
          </Toolbar>
        </AppBar>
        <LoginDialog
          updateUserid={this.props.updateUserid}
          handleLogin={this.login}
          open={this.state.loginDialogOpen}
          onClose={this.handleLoginClose}
        />
      </React.Fragment>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object,
  updateUserid: PropTypes.func.isRequired,
  userid: PropTypes.number,
}

export default withStyles(style)(AppBarContainer)
