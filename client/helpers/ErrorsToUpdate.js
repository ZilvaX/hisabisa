import { NO_ERROR, EMPTY_FIELD } from './ErrorTypes'
/**
 * Transform a list of field, error, error variable name triplets to a list of
 * the error variable to new error type objects.
 *
 * Should be used to check if fields in a form were empty and have just been
 * updated to not be empty.
 */
export function constructErrorsToUpdate(fieldErrorTriplets) {
  const errorsToUpdate = fieldErrorTriplets.reduce(
    (acc, [field, error, errorVariable]) => {
      if (error === EMPTY_FIELD && field) {
        return [...acc, { [errorVariable]: NO_ERROR }]
      }
      return acc
    },
    [],
  )
  return errorsToUpdate
}
