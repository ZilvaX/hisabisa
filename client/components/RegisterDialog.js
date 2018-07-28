import React from 'react'
import PropTypes from 'prop-types'
import DialogTitle from '@material-ui/core/DialogTitle'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'

import { showRegister } from '../actions/'
import { connect } from 'react-redux'
import RegisterForm from './RegisterForm'

class RegisterDialog extends React.Component {
  constructor(props) {
    super(props)
    this.onClose = this.onClose.bind(this)
  }

  onClose() {
    this.props.dispatch(showRegister(false))
  }

  render() {
    const { open } = this.props
    const dialog = (
      <Dialog open={open} onClose={this.onClose}>
        <DialogTitle>Register</DialogTitle>
        <DialogContent>
          <RegisterForm />
        </DialogContent>
      </Dialog>
    )
    return dialog
  }
}

RegisterDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  open: state.registerDialog.open,
})
export default connect(mapStateToProps)(RegisterDialog)
