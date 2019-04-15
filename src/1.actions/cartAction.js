import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const fnHitungCart = (id) => {
    return(dispatch) => {
        Axios.get(urlApi+'/cart/cartcount/'+id).then((res) => {
                dispatch({
                        type : 'JUMLAH_CART',
                        payload : res.data.length
                    })
            })
            
    }
}

export const resetCount = () => {
    return {
        type : 'RESET_COUNT'
    }
}