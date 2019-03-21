
const INITIAL_STATE = {cart : 0}

export default(state=INITIAL_STATE,action) => {
    switch(action.type){
        case 'JUMLAH_CART':
            return {cart : action.payload}
        case 'RESET_CART':
            return INITIAL_STATE
        default:
            return state
    }
}

   