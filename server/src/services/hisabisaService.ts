import NewUser from '../model/NewUser'
function checkUserExists(user: String): Promise<boolean> {
  // return dao.checkUserExists(user)
  return undefined
}

function registerUser(user: NewUser): Promise<number> {
  return undefined
}

// For now a number of static functions
export default { checkUserExists, registerUser }
