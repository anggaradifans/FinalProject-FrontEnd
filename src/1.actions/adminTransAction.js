import Axios from "axios";
import { urlApi } from "../support/urlApi";

export const hitungTransactions = () => {
    return(dispatch) => {
        Axios.get(urlApi+ '/trans/getTransactions').then((res) => {
            dispatch({
                type : 'JUMLAH_TRANSAKSI',
                payload : res.data.length
            })
        })
        
    }
}