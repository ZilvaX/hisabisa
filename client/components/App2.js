import React from 'react'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

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

function App2(props) {
  const { classes } = props
  return (
    <div>
      <MuiThemeProvider theme={hisabisaTheme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography
              variant="title"
              color="default"
              className={classes.flexTitle}
            >
              Hisabisa
            </Typography>
            <Button color="inherit">
              <Typography color="default">Login</Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </MuiThemeProvider>
    </div>
  )
}

App2.propTypes = {
  classes: PropTypes.object,
}

export default withStyles(style)(App2)
