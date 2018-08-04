import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'
import CssBaseline from '@material-ui/core/CssBaseline'
import { connect } from 'react-redux'

import AppBarContainer from './AppBarContainer'
import EntriesContainer from './EntriesContainer'
import SnackbarContainer from './SnackbarContainer'
import LoginDialog from './LoginDialog'
import RegisterDialog from './RegisterDialog'
import { updateUserid, updateUsername } from '../actions/'

const hisabisaTheme = createMuiTheme({
  palette: {
    primary: { main: teal[600] },
    secondary: { main: cyan[900] },
    error: { main: deepOrange[500] },
  },
})

function App(props) {
  fetch('/api/users/', {
    method: 'GET',
    credentials: 'include',
  }).then(result => {
    if (result.status === 200) {
      result.json().then(r => {
        props.dispatch(updateUserid(r.userid))
        props.dispatch(updateUsername(r.username))
      })
    }
  })

  return (
    <React.Fragment>
      <CssBaseline />
      <MuiThemeProvider theme={hisabisaTheme}>
        <AppBarContainer />
        <EntriesContainer />
        <SnackbarContainer />
        <LoginDialog />
        <RegisterDialog />
      </MuiThemeProvider>
    </React.Fragment>
  )
}

App.propTypes = {
  classes: PropTypes.object,
}

export default connect()(hot(module)(App))
