const INITIAL_STATE = {id : 0 , username : "", error: "", loading:false, role : '', email : '', cookie : false}

export default (state=INITIAL_STATE,action) => {
    if(action.type === 'LOGIN_SUCCESS'){
        return {...INITIAL_STATE, id : action.payload.id, 
            username : action.payload.username , role : action.payload.role, 
            email : action.payload.email,cookie : true}
    }
     else if (action.type === 'REGISTER_SUCCESS'){
        return {...INITIAL_STATE, cookie : true}
    } 
    else if (action.type === 'NOT_VERIFIED'){
        return {...INITIAL_STATE, error : 'Email Not Verified', cookie : true}
    }
    else if (action.type === 'LOADING') {
        return{...INITIAL_STATE , loading : true, cookie : true}
    } else if (action.type === 'USER_NOT_FOUND'){
        return{...INITIAL_STATE , error : 'Username atau password salah', cookie : true}
    }  else if (action.type === 'SERVER_ERROR'){
        return{...INITIAL_STATE , error : 'Server error. Try again later.', cookie : true}
    } else if (action.type === 'RESET_USER'){
        return {...INITIAL_STATE, cookie : true, cart : 0}
    } else if (action.type === 'USERNAME_NOT_AVAILABLE'){
        return {...INITIAL_STATE , error : 'Username not available', cookie : true}
    } else if (action.type === 'COOKIE_CHECKED'){
        return {...state, cookie : true}
    }
      else {
        return state
    }
    
}

// switch(action.type){
//     case 'LOGIN_SUCCESS' :
//         return {...INITIAL_STATE,username : action.payload.username , role : action.payload.role}
//     case 'LOADING' :
//         return{...INITIAL_STATE , loading : true}
//     case 'USER_NOT_FOUND' :
//         return{...INITIAL_STATE , error : 'Username atau password salah'}
//     case 'SERVER_ERROR' :
//         return{...INITIAL_STATE , error : 'Server error. Try again later.'}
//     case 'RESET_USER' :
//         return INITIAL_STATE
//     case 'USERNAME_NOT_AVAILABLE' :
//         return {...INITIAL_STATE , error : 'Username not available'}
//     default :
//         return state

// }