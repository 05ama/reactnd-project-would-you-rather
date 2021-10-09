import { combineReducers } from 'redux'
import authedUser from './authentication'
import users from './users'


export default combineReducers({
    authedUser,
    users,
})