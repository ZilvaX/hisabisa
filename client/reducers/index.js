import { UPDATE_USERID, UPDATE_USERNAME } from '../actions'

const initialState = {
  userid: null,
  username: null,
}

export default function hisabisaApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERID:
      return Object.assign({}, state, { userid: action.userid })
    case UPDATE_USERNAME:
      return Object.assign({}, state, { username: action.username })
    default:
      return state
  }
}
