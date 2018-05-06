import React from 'react'

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
