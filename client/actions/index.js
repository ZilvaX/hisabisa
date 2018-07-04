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
  // use userid?
  return { type: REQUEST_ENTRIES, userid }
}

export function receiveEntries(entries) {
  // how to use json?
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

function shouldFetchEntries(state, userid) {
  const entries = state.entries
  //if previously not logged in, but now is logged in
  if (!entries) {
    return true
  } else if (state.isFetching) {
    return false
  } else {
    //if previously logged in, but has logged out?
    return !userid
  }
}

export function fetchEntriesIfNeeded(userid) {
  return (dispatch, getState) => {
    if (shouldFetchEntries(getState(), userid)) {
      return dispatch(fetchEntries(userid))
    }
  }
}
