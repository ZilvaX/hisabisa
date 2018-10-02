import NewUser from '../model/NewUser'
function checkUserExists(user: NewUser): Promise<boolean> {
  return undefined
}

function registerUser(user: NewUser): Promise<number> {
  return undefined
}

// For now a number of static functions
export default { checkUserExists, registerUser }
