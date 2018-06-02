import React from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'

import AddEntriesBox from './AddEntriesBox'

export default class EntriesBox extends React.Component {
  handleOnClick(id) {
    const headers = {
      'content-type': 'application/json',
    }
    fetch(`/api/entries/${id}`, {
      method: 'DELETE',
      headers,
    }).then(() => {
      this.props.removeEntry(id)
    })
  }
  render() {
    const entries = _.map(this.props.entries, x => (
      <div key={x.entryid}>
        <b>{x.event}</b>
        Every {x.frequency.days} days
        <button type="button" onClick={() => this.handleOnClick(x.entryid)}>
          X
        </button>
      </div>
    ))
    return (
      <div>
        {entries}
        {this.props.userid && (
          <AddEntriesBox
            addEntry={this.props.addEntry}
            userid={this.props.userid}
          />
        )}
      </div>
    )
  }
}

EntriesBox.propTypes = {
  entries: PropTypes.array.isRequired,
  userid: PropTypes.number,
  addEntry: PropTypes.func.isRequired,
  removeEntry: PropTypes.func.isRequired,
}
