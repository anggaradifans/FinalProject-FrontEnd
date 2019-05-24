import axios from 'axios'
import {urlApi} from './../support/urlApi'
import cookie from 'universal-cookie'
import swal from 'sweetalert'

const objCookie = new cookie()

//LOGIN
export const onLogin = (paramUsername,paramPassword) => {
    return(dispatch) => {
        //untuk mengubah loading menjadi true
        //dispatch dipakai ketika memakai axios di action creator
        dispatch({
            type : 'LOADING',
        })
        //Get data dari fake api json server
        axios.get( urlApi + `/user/userLogin?username=${paramUsername}&password=${paramPassword}`)

        //Kalo berhasil nge get, dia masuk then
        .then((res) => {
            console.log(res)
        //if username dan password sesuai maka res.data ada isinya
            if(res.data.length === 0){
                dispatch({
                    type : 'USER_NOT_FOUND',
                })
            } 
            else if( res.data[0].verified === 0){
                dispatch(
                    {
                        type : 'NOT_VERIFIED',
                    }
                )
            }
            else {
                dispatch(
                    {
                        type : 'LOGIN_SUCCESS',
                        payload : { id : res.data[0].id ,
                            username : res.data[0].username ,
                            role : res.data[0].role,
                        email : res.data[0].email}
                        
                    }, objCookie.set('userData',res.data[0].username,{path : '/'}) // path '/' agar cookienya diakses di semua components
                    , swal("Success", "Login Success, Redirecting to Homepage" , "success")
                )
            }
            
            
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type : 'SERVER_ERROR'
            })
        })
    }
    
}

export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get( urlApi + `/user/keeplogin`, {params : {username : cookie}})
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data[0]
                })

            }
        })
        .catch((err) => console.log(err))
    }
}

export const cookieChecked = () => {
    return {
        type : 'COOKIE_CHECKED'
    }
}

export const resetUser = () => {
    return {
        type : 'RESET_USER',
    }
}


//REGISTER

export const userRegister = (a,b,c,d) => {
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : a, password : b, email : c, phone : d, role :"user", verified : 0}
        axios.post( urlApi + '/user/addUser', newData)
        .then((res) => {
            if(res.data === 'Username sudah ada') {
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            } else {
                dispatch({
                    type : 'REGISTER_SUCCESS'
                })
                
            }
        })
        .catch((err) => {
            console.log(err)
            dispatch({
                type : 'SERVER_ERROR'
            })
        })
    }
}