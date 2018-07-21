import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import {
  updateUserid,
  updateUsername,
  showLogin,
  showRegister,
} from '../actions'

const style = {
  flexTitle: {
    flex: 1,
    marginLeft: 30,
  },
}

class AppBarContainer extends React.Component {
  constructor(props) {
    super(props)
    this.handleLoginOpen = this.handleLoginOpen.bind(this)
    this.handleRegisterOpen = this.handleRegisterOpen.bind(this)
    this.logout = this.logout.bind(this)
  }

  handleLoginOpen() {
    this.props.dispatch(showLogin(true))
  }

  handleRegisterOpen() {
    this.props.dispatch(showRegister(true))
  }

  logout() {
    fetch('api/authentication/logout', {
      method: 'POST',
    }).then(() => {
      this.props.dispatch(updateUsername(null))
      this.props.dispatch(updateUserid(null))
    })
  }

  render() {
    const { classes, userid } = this.props
    let loginStatus
    if (userid) {
      loginStatus = (
        <React.Fragment>
          <Typography>Hello, {this.props.username}</Typography>
          <Button onClick={this.logout}>
            <Typography>Logout</Typography>
          </Button>
        </React.Fragment>
      )
    } else {
      const loginButton = (
        <Button color="inherit" onClick={this.handleLoginOpen}>
          <Typography color="default">Login</Typography>
        </Button>
      )
      const registerButton = (
        <Button color="inherit" onClick={this.handleRegisterOpen}>
          <Typography color="default">Register</Typography>
        </Button>
      )
      loginStatus = (
        <React.Fragment>
          {loginButton}
          {registerButton}
        </React.Fragment>
      )
    }
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
          {loginStatus}
        </Toolbar>
      </AppBar>
    )
  }
}

AppBarContainer.propTypes = {
  classes: PropTypes.object,
  userid: PropTypes.number,
  dispatch: PropTypes.func.isRequired,
  username: PropTypes.string,
}

const mapStateToProps = state => ({
  userid: state.userid,
  username: state.username,
})

export default connect(mapStateToProps)(withStyles(style)(AppBarContainer))
