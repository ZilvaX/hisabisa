import {
  UPDATE_USERID,
  UPDATE_USERNAME,
  REQUEST_ENTRIES,
  RECEIVE_ENTRIES,
} from '../actions'

const initialState = {
  userid: null,
  username: null,
  entries: [],
  isFetching: false,
}

// ?
function entries(state = [], action) {
  switch (action.type) {
    case REQUEST_ENTRIES:
      return [{ isFetching: true }]
    case RECEIVE_ENTRIES:
      return [{ isFetching: false, entries: [] }] ///////
    default:
      return state
  }
}

export default function hisabisaApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERID:
      return Object.assign({}, state, { userid: action.userid })
    case UPDATE_USERNAME:
      return Object.assign({}, state, { username: action.username })
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
