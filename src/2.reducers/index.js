import {combineReducers} from 'redux'
import UserState from './userGlobal'
import CartState from './cartGlobal'

export default combineReducers({
    user : UserState,
    cart : CartState
})