import { combineReducers } from 'redux'
import { groupBy, concat } from 'lodash'
import {
  UPDATE_USERID,
  UPDATE_USERNAME,
  RECEIVE_ENTRIES,
  ADD_ENTRIES,
  UPDATE_ENTRY,
  REMOVE_ENTRY,
  MOVE_ENTRY_TO_BACK,
  SHOW_ERROR,
  HIDE_ERROR,
  SHOW_LOGIN,
  SHOW_REGISTER,
  SET_ENTRY_FILTER,
} from '../actions'

import { SHOW_ALL } from '../helpers/EntryFilters'

function entryFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_ENTRY_FILTER:
      return action.filter
    default:
      return state
  }
}

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
    case ADD_ENTRIES:
      return state.concat(action.entries)
    case UPDATE_ENTRY:
      return state.map(e => {
        if (e.entryid !== action.entry.entryid) {
          return e
        }
        return Object.assign({}, action.entry)
      })
    case REMOVE_ENTRY:
      return state.filter(e => e.entryid !== action.entryid)
    case MOVE_ENTRY_TO_BACK: {
      const groupedEntries = groupBy(state, e => e.entryid === action.entryid)
      const otherEntries = groupedEntries.false || []
      const matchedEntries = groupedEntries.true || [] // Should be one
      return concat(otherEntries, matchedEntries)
    }
    default:
      return state
  }
}

function errors(
  state = { showSnackbar: false, errorMessage: undefined },
  action,
) {
  switch (action.type) {
    case SHOW_ERROR:
      return { showSnackbar: true, errorMessage: action.errorMessage }
    case HIDE_ERROR:
      return { showSnackbar: false, errorMessage: state.errorMessage }
    default:
      return state
  }
}

function loginDialog(state = { open: false }, action) {
  switch (action.type) {
    case SHOW_LOGIN:
      return { open: action.open }
    default:
      return state
  }
}

function registerDialog(state = { open: false }, action) {
  switch (action.type) {
    case SHOW_REGISTER:
      return { open: action.open }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  userid,
  username,
  entries,
  errors,
  loginDialog,
  registerDialog,
  entryFilter,
})

export default rootReducer
