import React from 'react'
import PropTypes from 'prop-types'

export default function UserBox(props) {
  return (
    <div>
      <h1>Hello, {props.user}</h1>
      <button type="button" onClick={props.onClick}>
        Logout
      </button>
    </div>
  )
}

UserBox.propTypes = {
  user: PropTypes.string,
  onClick: PropTypes.func,
}
