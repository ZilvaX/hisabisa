import React from 'react'
import PropTypes from 'prop-types'

export default function UserBox(props) {
  return (
    <div>
      <label>
        User Id:{' '}
        <input type="text" value={props.value} onChange={props.onChange} />
      </label>
      <button type="button" onClick={props.onClick}>
        Submit
      </button>
    </div>
  )
}

UserBox.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
}
