export const UPDATE_USERID = 'UPDATE_USERID'
export const UPDATE_USERNAME = 'UPDATE_USERNAME'

export const updateUserid = userid => {
  return { type: UPDATE_USERID, userid }
}

export const updateUsername = username => {
  return { type: UPDATE_USERNAME, username }
}
