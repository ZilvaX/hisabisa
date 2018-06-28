import React from 'react'
import PropTypes from 'prop-types'
import { hot } from 'react-hot-loader'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import cyan from '@material-ui/core/colors/cyan'
import teal from '@material-ui/core/colors/teal'
import deepOrange from '@material-ui/core/colors/deepOrange'

import AppBarContainer from './AppBarContainer'
import EntriesContainer from './EntriesContainer'

const hisabisaTheme = createMuiTheme({
  palette: {
    primary: { main: teal[600] },
    secondary: { main: cyan[900] },
    error: { main: deepOrange[500] },
  },
})

class App2 extends React.Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={hisabisaTheme}>
          <AppBarContainer />
          <EntriesContainer />
        </MuiThemeProvider>
      </div>
    )
  }
}

App2.propTypes = {
  classes: PropTypes.object,
}

export default hot(module)(App2)