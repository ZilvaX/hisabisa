import { convertEntriesFromApi } from '../helpers/EntriesHelper'

export const UPDATE_USERID = 'UPDATE_USERID'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'
export const UPDATE_ENTRY = 'UPDATE_ENTRY'
export const REMOVE_ENTRY = 'REMOVE_ENTRY'
export const SHOW_ERROR = 'SHOW_ERROR'
export const HIDE_ERROR = 'HIDE_ERROR'
export const SHOW_LOGIN = 'SHOW_LOGIN'

export const updateUserid = userid => {
  return { type: UPDATE_USERID, userid }
}

export const updateUsername = username => {
  return { type: UPDATE_USERNAME, username }
}

export function receiveEntries(entries) {
  return { type: RECEIVE_ENTRIES, entries }
}

export function addEntry(entry) {
  return { type: ADD_ENTRY, entry }
}

export function updateEntry(entry) {
  return { type: UPDATE_ENTRY, entry }
}

export function removeEntry(entryid) {
  return { type: REMOVE_ENTRY, entryid }
}

export function fetchEntries(userid) {
  return dispatch => {
    return fetch(`/api/users/${userid}/entries/`, {
      credentials: 'include',
    })
      .then(
        results => results.json(),
        error => console.log('an error has occurred.', error),
      )
      .then(json => {
        const convertedEntries = convertEntriesFromApi(json)
        dispatch(receiveEntries(convertedEntries))
      })
  }
}

export function showError(errorMessage) {
  return { type: SHOW_ERROR, errorMessage }
}

export function hideError() {
  return { type: HIDE_ERROR }
}

export function showLogin(open) {
  return { type: SHOW_LOGIN, open }
}
