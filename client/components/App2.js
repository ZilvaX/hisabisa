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
  constructor(props) {
    super(props)
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
    console.log(this.state.userid)
    return (
      <div>
        <MuiThemeProvider theme={hisabisaTheme}>
          <AppBarContainer
            userid={this.state.userid}
            updateUserid={this.updateUserid}
          />
          <EntriesContainer userid={this.state.userid} />
        </MuiThemeProvider>
      </div>
    )
  }
}

App2.propTypes = {
  classes: PropTypes.object,
}

export default hot(module)(App2)
