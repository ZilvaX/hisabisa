import React from 'react'
import PropTypes from 'prop-types'

import ResultsDisplay from './ResultsDisplay'
import AddEntriesBox from './AddEntriesBox'

export default class EntriesBox extends React.Component {
  render() {
    return (
      <div>
        <ResultsDisplay value={this.props.entries} />
        {this.props.jwt && (
          <AddEntriesBox addEntry={this.props.addEntry} jwt={this.props.jwt} />
        )}
      </div>
    )
  }
}

EntriesBox.propTypes = {
  entries: PropTypes.array,
  jwt: PropTypes.string,
  addEntry: PropTypes.func.isRequired,
}
