import { combineReducers } from 'redux'
import {
  UPDATE_USERID,
  UPDATE_USERNAME,
  RECEIVE_ENTRIES,
  ADD_ENTRY,
  UPDATE_ENTRY,
  REMOVE_ENTRY,
} from '../actions'

function userid(state = null, action) {
  switch (action.type) {
    case UPDATE_USERID:
      return action.userid
    default:
      return state
  }
}

function username(state = null, action) {
  switch (action.type) {
    case UPDATE_USERNAME:
      return action.username
    default:
      return state
  }
}

function entries(state = [], action) {
  switch (action.type) {
    case RECEIVE_ENTRIES:
      return action.entries
    case ADD_ENTRY:
      return [...state, action.entry]
    case UPDATE_ENTRY:
      return state.map(e => {
        if (e.entryid !== action.entry.entryid) {
          return e
        }
        return Object.assign({}, action.entry)
      })
    case REMOVE_ENTRY:
      return state.filter(e => e.entryid !== action.entryid)
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userid,
  username,
  entries,
})

export default rootReducer
