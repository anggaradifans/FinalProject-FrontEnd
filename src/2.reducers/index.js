import {combineReducers} from 'redux'
import UserState from './userGlobal'
import CartState from './cartGlobal'
import SearchState from './searchGlobal'

export default combineReducers({
    user : UserState,
    cart : CartState,
    search : SearchState
})