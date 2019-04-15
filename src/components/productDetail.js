import React from  'react'
import Axios from 'axios'
import {urlApi} from './../support/urlApi'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
import CurrencyFormat from 'react-currency-format'
import {fnHitungCart} from './../1.actions'

class ProductDetail extends React.Component {
    state ={product : {}, cart : 0}
    
    componentDidMount(){
        this.getDataApi()
    }
    
    getDataApi = () => {
        var idUrl = this.props.match.params.id
        Axios.get(urlApi+'/product/product-detail/'+idUrl)
        .then((res) => {
            this.setState({product: res.data[0]})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    proteksiJumlah = () => {
        if(this.refs.jumlah.value < 1){
            this.refs.jumlah.value = 1
        }
    }
    

    onBtnCart = () => {
        var qty = this.refs.jumlah.value
        var newData = {
            userId : this.props.id,
            productId : this.state.product.id,
            quantity : qty
        }
       Axios.post(urlApi+'/cart/addtocart', newData)
        .then((res) => {
           swal("Thanks for the Purchase", res.data, "success")
           this.props.fnHitungCart(this.props.username)
        })
        .catch((err) => console.log(err))
    }
    
    
    render(){
        var {product_name, image, discount, deskripsi, price} = this.state.product
        return (
            <div className ='container'>
                <div className="row justify-content-center">
                    <div className="col-md-4 mt-5 mb-5">
                        <div className="card" style={{width: '100%'}}>
                            <img className="card-img-top" src={`http://localhost:2000/${image}`} alt="Card cap" />
                        </div>
                    </div>
                    <div className="col-md-8 mt-5 mb-5">
                        <h1 style={{color : '#4C4C4C'}}>{product_name}</h1>
                        { discount > 0 ?
                            <div style={{backgroundColor:'#D50000', 
                                    width:"50px" , height:"22px" , 
                                    color:'white', textAlign:"center",
                                    display:'inline-block'}}>{discount}%</div> : null
                        }
                        { discount > 0 ? 
                            <CurrencyFormat value={price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <span style={{fontSize:'12px', fontWeight:'600', color:'#606060' , 
                            marginLeft:'10px', textDecoration:"line-through"}}>{value}</span>}/>
                             : null}
                        <CurrencyFormat value={price - (price*(discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <div style={{fontSize:'24px', fontWeight : '700', 
                                    color:'#FF5722', marginTop:'20px'}}>{value} </div>}/>
                        <div className="row">
                            <div className="col-md-2">
                                <div style={{marginTop:"10px" ,color:"#606060" , 
                                            fontWeight:"700", fontSize:"14px"}}>Jumlah</div>
                                <input type='number' ref ='jumlah' min={1} defaultValue={1} className='form-control'  onChange={this.proteksiJumlah} style={{width : '60px' , 
                                            marginTop:'10px'}}/>
                            </div>
                            <div className="col-md-6">
                                <div style={{marginTop:"10px" ,color:"#606060" , 
                                            fontWeight:"700", fontSize:"14px"}}>Catatan untuk Penjual (Opsional)</div>
                                <input type='text' className='form-control' placeholder="Contoh: Warna putih, Ukuran XL, Edisi ke-2" 
                                        style={{marginTop:'13px'}}/>
                            </div>
                        </div>
                        <div className="row mt-4">
                            <div className="col-md-8">
                                <p style={{color:"#606060", fontStyle:"italic"}}>{deskripsi}</p> 
                            </div>
                        </div>

                        {this.props.username !== "" ?
                         <div className="row mt-4">
                            <input type='button' className='btn btn-outline-secondary col-md-2 ml-3' value='Add to Wishlist' />
                            <input type='button' className='btn btn-outline-danger col-md-3 ml-2' value='Buy Now'/>
                            <input type='button' className='btn btn-outline-success col-md-3 ml-2' value='Add to Cart' onClick={() => this.onBtnCart()}/>
                        </div>
                        : 
                        <Link to='/login'><div className="row mt-4">
                            <input type='button' className='btn btn-outline-secondary col-md-2 ml-3' value='Add to Wishlist'/>
                            <input type='button' className='btn btn-outline-danger col-md-3 ml-2' value='Buy Now'/>
                            <input type='button' className='btn btn-outline-success col-md-3 ml-2' value='Add to Cart'/>
                        </div></Link>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps, {fnHitungCart})(ProductDetail);