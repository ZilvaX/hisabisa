import React from 'react'
import PropTypes from 'prop-types'

export default function ResultsDisplay(props) {
  return (
    <div>
      {props.value.map(x => (
        <div key={x.entryid}>
          <h2>{x.event}</h2>
          <p>Every {x.frequency.days} days</p>
        </div>
      ))}
    </div>
  )
}

ResultsDisplay.propTypes = {
  value: PropTypes.Object,
}
