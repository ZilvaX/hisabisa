import React from 'react'
import PropTypes from 'prop-types'
import AppBarContainer from './AppBarContainer'
import { hot } from 'react-hot-loader'

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles,
} from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'

const style = {
  flexTitle: {
    flex: 1,
    marginLeft: 30,
  },
}

const hisabisaTheme = createMuiTheme({
  palette: {
    primary: { main: teal[600] },
    secondary: { main: cyan[900] },
    error: { main: deepOrange[500] },
  },
})

class App2 extends React.Component {
  constructor() {
    super()
    this.state = {
      LoginDialogOpen: false,
      userid: null,
    }
    this.updateUserid = this.updateUserid.bind(this)
  }

  updateUserid(userid) {
    this.setState({
      userid,
    })
  }

  render() {
    // const { classes } = this.props
    return (
      <div>
        <MuiThemeProvider theme={hisabisaTheme}>
          <AppBarContainer
            userid={this.state.userid}
            updateUserid={this.updateUserid}
          />
        </MuiThemeProvider>
      </div>
    )
  }
}

App2.propTypes = {
  classes: PropTypes.object,
}

export default hot(module)(withStyles(style)(App2))
