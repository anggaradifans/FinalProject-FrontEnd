const INITIAL_STATE = {transactions : 0}

export default(state=INITIAL_STATE, action) => {
    switch(action.type){
        case 'JUMLAH_TRANSAKSI':
            return {transactions : action.payload}
        default:
            return state
    }


}