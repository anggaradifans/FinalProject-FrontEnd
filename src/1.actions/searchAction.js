// import Axios from 'axios'
// import {urlApi} from './../support/urlApi'

// export const getSearchData = (param) => {
//     return(dispatch) => {
//         Axios.get(urlApi+'/product/getsearchdata?product_name='+param)
//             .then((res) => {
//                 dispatch({
//                     type : 'SEARCH_DATA',
//                     payload : res.data
//                 })
//             })
//             .catch((err) => {
//                 console.log(err)
//             })
//     }
// }