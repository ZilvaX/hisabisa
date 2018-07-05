export const UPDATE_USERID = 'UPDATE_USERID'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'
export const REQUEST_ENTRIES = 'REQUEST_ENTRIES'
export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'

export const updateUserid = userid => {
  return { type: UPDATE_USERID, userid }
}

export const updateUsername = username => {
  return { type: UPDATE_USERNAME, username }
}

export function requestEntries(userid) {
  return { type: REQUEST_ENTRIES, userid }
}

export function receiveEntries(entries) {
  return { type: RECEIVE_ENTRIES, entries }
}

export function fetchEntries(userid) {
  return dispatch => {
    dispatch(requestEntries(userid))
    return fetch(`/api/users/${userid}/entries/`, {
      credentials: 'include',
    })
      .then(
        results => results.json(),
        error => console.log('an error has occurred.', error),
      )
      .then(json => dispatch(receiveEntries(json)))
  }
}
