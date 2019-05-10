import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import swal from 'sweetalert'
import {fnHitungCart} from './../1.actions'




class Wishlist extends React.Component{
    
    state = {
        data : []
    }

    componentDidMount(){
        this.getDataWishlist()
    }

    getDataWishlist = () => {
        Axios.get(urlApi+'/product/wishlist/'+this.props.id)
            .then((res) => {
                this.setState({data : res.data})
            })
    }

    onBtnAddtoCart = (id) => {
        var newData = {
            userId : this.props.id,
            productId : id,
            quantity : 1
        }
       Axios.post(urlApi+'/cart/addtocart', newData)
        .then((res) => {
           swal("Thanks for the Purchase", res.data, "success")
           this.props.fnHitungCart(this.props.username)
        })
        .catch((err) => console.log(err))
}

    renderJsx = () => {
        var jsx = this.state.data.map((val) => {
            return <div className="card col-md-3" style={{width: '18rem', margin: '20px'}}>
            <Link to={'/product-detail/' + val.idproduk} ><img src={ `http://localhost:2000/${val.image}`} style={{width :'250px', height :'250px'}} className="card-img-top img" alt="Card cap" /></Link>
            {val.discount > 0 ? 
            <div className="discount">{val.discount}%</div>
            : null
            }
                <div className="card-body">
                    <h5>{val.namaProduk}</h5>
                    { val.discount > 0 ?
                        <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text ml-1 mr-5" style={{textDecoration:'line-through', color:'red', display:'inline'}}>{value}</p>}/>
                        : null
                    }
                    <CurrencyFormat value={val.price - (val.price*(val.discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-4" style={{display:'inline',fontWeight:'700'}}>{value}</p>}/>
                
                    <input type='button' className="btn btn-primary" value="Add to Cart" onClick={() => this.onBtnAddtoCart(val.idproduk)}/>
                    
                </div>
        </div>
        })
        return jsx
    }

    render(){
        return (
            <div className='container'>
                <h1> Your WishList</h1>
                <div className='row'>
                    {this.renderJsx()}
                </div>
            </div>
        )
    }
}

const mapStatetoProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id
    }
}

export default connect(mapStatetoProps, {fnHitungCart})(Wishlist)