import {combineReducers} from 'redux'
import UserState from './userGlobal'
import CartState from './cartGlobal'
import SearchState from './searchGlobal'
import TransState from './adminTransGlobal'

export default combineReducers({
    user : UserState,
    cart : CartState,
    search : SearchState,
    trans : TransState
})