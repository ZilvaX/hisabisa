import configureTypes from './configureTypes'
import connectionType from './connectionType'
const { types } = require('pg')
configureTypes(types)
export default connectionType
