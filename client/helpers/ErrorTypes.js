class ErrorType {
  constructor(message, error) {
    this.message = message
    this.error = error
  }

  toString() {
    return this.message
  }
}
const NO_ERROR = new ErrorType('', false)
const EMPTY_FIELD = new ErrorType('Field is empty', true)
const NON_EQUAL_PASS = new ErrorType(
  'The repeated password does not match',
  true,
)
const USER_EXISTS = new ErrorType(
  'A user with the given username already exists',
  true,
)
const INCORRECT_PASS = new ErrorType('Incorrect password', true)

const USER_NOT_EXISTS = new ErrorType(
  'A user with this username does not exist',
  true,
)

export {
  NO_ERROR,
  EMPTY_FIELD,
  NON_EQUAL_PASS,
  USER_EXISTS,
  INCORRECT_PASS,
  USER_NOT_EXISTS,
}
