import React, { Component } from 'react';
import Navbar from './components/navbar'
import Home from './components/homepage'
import Login from './components/login'
import Register from './components/register'
import Verify from './components/verify'
import Product from './components/productList'
import Wishlist from './components/wishlist'

import Search from './components/searchData'
import ManageProduct from './components/manageProduct'
import ManageCategory from './components/manageCategory'
import ManageTransactions from './components/manageTransactions'
import PageNotFound from  './components/pageNotFound'
import ProductDetail from './components/productDetail'
import ScrolltoTop from  './components/scrolltoTop'
import Cart from './components/cart'
import Payment from './components/payment'
import PaymentList from './components/paymentList'
import History from './components/history'
import historyDetail from './components/historyDetail';
import AnnualReport from './components/annualReport'
import Footer from './components/footer'
import { Route, withRouter, Switch } from 'react-router-dom'
import {connect} from 'react-redux'
import cookie from 'universal-cookie'
import {keepLogin, cookieChecked, fnHitungCart, hitungTransactions} from './1.actions'
import './App.css';



// withRouter => Untuk tersambung ke Reducer dengan connect, tapi di dalam komponen ada routing
const objCookie = new cookie()
class App extends Component {
  state = {
      item : 0 
  }
  componentDidMount() {
    var terserah = objCookie.get('userData')
    if(terserah !== undefined){
      this.props.keepLogin(terserah)
      this.props.fnHitungCart(terserah)
      this.props.hitungTransactions()   
    } else {
      this.props.cookieChecked()
    }
  }
  render() {
    if(this.props.cookie){
    return (
      <div className='position-relative' style={{minHeight:"100vh"}}>
        <div style={{paddingBottom:"190.6px"}}>
          <Navbar/>
          <ScrolltoTop>
          <Switch>
            
          <Route path='/' component={Home} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/register' component={Register} exact/>
          <Route path='/verify' component={Verify} exact/>
          <Route path='/products' component={Product} exact/>
          <Route path='/wishlist' component={Wishlist} exact/>
          <Route path='/search' component={Search} exact/>
          <Route path='/manage' component={ManageProduct} exact/>
          <Route path='/category' component={ManageCategory} exact/>
          <Route path='/transactions' component={ManageTransactions} exact/>
          <Route path='/product-detail/:id' component={ProductDetail} exact/>
          <Route path='/cart' component={Cart} exact/>
          <Route path='/payment/:id' component={Payment} exact/>
          <Route path='/paymentlist' component={PaymentList} exact/>          
          <Route path='/history' component={History} exact/>
          <Route path='/history-detail/:id' component={historyDetail} exact/>
          <Route path='/annualreport' component={AnnualReport} exact/>
          <Route path='*' component={PageNotFound} exact/>
          
          </Switch>
          </ScrolltoTop>
        </div>
          <Footer/>
      </div>
    );
  }
  return <div> Loading ...</div>
  }
}

const mapStatetoProps = (state) => {
    return {
      id : state.user.id,
      username : state.user.username,
      cookie : state.user.cookie,
      cart : state.cart.cart,
      transactions : state.trans.transactions
    }
}

export default withRouter(connect(mapStatetoProps, {keepLogin, cookieChecked, fnHitungCart, hitungTransactions})(App));
