import { UPDATE_USERID } from '../actions'

const initialState = {
  userid: null,
}

export default function hisabisaApp(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USERID:
      return Object.assign({}, state, { userid: action.userid })
    default:
      return state
  }
}
