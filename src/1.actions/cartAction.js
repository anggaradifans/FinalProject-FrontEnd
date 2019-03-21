import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const fnHitungCart = (int) => {
    return(dispatch) => {
        Axios.get(urlApi+'/users?username='+int).then((res) => {
                Axios.get(urlApi + '/cart?userId='+res.data[0].id).then((res) =>
                dispatch({
                        type : 'JUMLAH_CART',
                        payload : res.data.length
                    })
                )    
            })
            
    }
}

export const resetCount = () => {
    return {
        type : 'RESET_COUNT'
    }
}