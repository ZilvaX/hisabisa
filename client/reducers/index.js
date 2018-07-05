import { combineReducers } from 'redux'
import {
  UPDATE_USERID,
  UPDATE_USERNAME,
  REQUEST_ENTRIES,
  RECEIVE_ENTRIES,
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

function entries(state = { isFetching: false, entries: [] }, action) {
  switch (action.type) {
    case REQUEST_ENTRIES:
      return Object.assign({}, state, { isFetching: true })
    case RECEIVE_ENTRIES:
      return Object.assign({}, state, {
        isFetching: false,
        entries: action.entries,
      })
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
