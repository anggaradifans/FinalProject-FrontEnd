import React from  'react'
import { Link , Redirect } from 'react-router-dom'
import {connect} from 'react-redux'
import {userRegister} from './../1.actions'
import Loader from 'react-loader-spinner'
import './../support/css/style.css'
import swal from 'sweetalert'

class Register extends React.Component {
  state = {error : ''}
  componentWillReceiveProps(newProps){
      if(newProps.error !== ""){
          this.setState({error : newProps.error})
      }
  }

  renderErrorMessage = () => {
      if(this.state.error !== ""){
          return <div className="alert alert-danger mt-3" role="alert">
                      {this.state.error}
                  </div>
      }
  }

  onBtnRegisterClick = () => {
      var username = this.refs.username.value
      var password =  this.refs.password.value
      var email = this.refs.email.value
      var phone = this.refs.phone.value
      if(username === "" || password === "" || email === "" || phone === ""){
          this.setState({error : "Harus diisi semua"})
      } else {
          this.props.userRegister(username,password,email,phone)
          swal('Register Success', 'Verify your email before login', 'success')
      }
  }
  renderLoaderOrBtn = () => {
      if(this.props.loading === true){
          return <Loader type="Audio"
          color="#00BFFF"
          height="40"	
          width="40"/>
      } else {
          return <button type="button" className="btn blue-gradient" onClick={this.onBtnRegisterClick} style={{width:"300px"}}><i className="fas fa-sign-in-alt" /> Sign Up!</button>       
       }
  }
  
    render(){
      if(this.props.username !== ""){
        return <Redirect to='/'/>
    }
        return (
            <div className='bgimg'>
            <div className="container myBody " style={{minHeight:"600px"}}>
                    <div className="row justify-content-sm-center ml-auto mr-auto mt-3">
                        <form className="border mb-3" style={{padding:"20px", borderRadius:"5%" , backgroundColor:"white"}} ref="formLogin">
                            <fieldset>
                            <h2>Register</h2>
                            <h5>Already have Account? <Link to="/login" className="border-bottom">Login</Link></h5>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                        <i className="fa fa-user prefix"></i>
                                        </span>
                                    </div>
                                    <input type="text" ref="username" className="form-control" id="inputUsername" placeholder="Username" required autoFocus/>
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon">
                                        <i class="fas fa-key"></i>
                                        </span>
                                    </div>
                                    <input type="password" ref="password" className="form-control" id="inputPassword" placeholder="Password" required />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <i class="fas fa-envelope"></i>
                                            </span>
                                    </div>
                                    <input type="email" ref="email" className="form-control" id="inputEmail" placeholder="Email@mail.com" required />
                                </div>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                            <span className="input-group-text" id="basic-addon">
                                            <i class="fas fa-phone"></i>
                                            </span>
                                    </div>
                                    <input type="phone" ref="phone" className="form-control" id="inputPhone" placeholder="Ex: 0857xxxxxxxx" required />
                                    
                                </div>
                                
                                <div className="form-group row">
                                    <div className="col-12" style={{textAlign:"center"}}>
                                        {this.renderLoaderOrBtn()}
                                        {this.renderErrorMessage()}
                                    </div>                                        
                                </div>
                                
                            </fieldset>
                        </form>               
                </div>
              </div>
                <div className="layer">

                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
  return {
      username : state.user.username,
      loading : state.user.loading,
      error : state.user.error,
  }
}

export default connect(mapStateToProps, {userRegister})(Register)