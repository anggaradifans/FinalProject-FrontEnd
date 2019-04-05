import React from 'react'
import axios from 'axios'
import {urlApi} from './../support/urlApi'
import './../support/css/product.css'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {fnHitungCart} from './../1.actions'

class ProductList extends React.Component{
    state = {listProduct : [], cart : 0}

    componentDidMount(){
        this.getDataProduct()
    }

    getDataProduct = () => {
        axios.get( urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err)=> console.log(err))
    }

    onBtnAddtoCart = (data) => {    
           axios.get(urlApi+'/products?id='+ data.id)
            .then((res) => {
                var username = this.props.username
                var userId = this.props.id
                var productId = res.data[0].id
                var namaProduk = res.data[0].nama
                var harga = res.data[0].harga
                var discount = res.data[0].discount
                var kategori = res.data[0].kategori
                var img = res.data[0].img

                var newData = {
                    username, userId, productId, namaProduk,
                    harga, discount, kategori, img
                }
                axios.get(urlApi+'/cart?userId='+this.props.id+'&productId='+newData.productId)
                    .then((res) => {
                        if(res.data.length > 0){
                            var quantity = res.data[0].quantity+1
                            axios.put(urlApi+'/cart/'+res.data[0].id,{...newData, quantity})
                                .then((res) =>{
                                    console.log(res)
                                    swal('Success', 'Item added to Cart', 'success')
                                })
                                .catch((err) => {
                                    console.log(err)
                                }) 
                        } else {
                            axios.post(urlApi+'/cart', {...newData, quantity : 1})
                                .then((res) =>{
                                    console.log(res)
                                    swal('Success', 'Item added to Cart', 'success')
                                    this.props.fnHitungCart(this.props.username)
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                        }
                    })
            })
            .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var jsx = this.state.listProduct.map((val) => {
                return <div className="card col-md-3" style={{width: '18rem', margin: '20px'}}>
                        <Link to={'/product-detail/' + val.id} ><img src={val.img} style={{width :'250px', height :'250px'}} className="card-img-top img" alt="Card cap" /></Link>
                        {val.discount > 0 ? 
                        <div className="discount">{val.discount}%</div>
                        : null
                        }
                        <div className="kategori mb-2">{val.subkategori}</div>
                            <div className="card-body">
                                <h4>{val.product_name}</h4>
                                { val.discount > 0 ?
                                    <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-5" style={{textDecoration:'line-through', color:'red', display:'inline'}}>{value}</p>}/>
                                    : null
                                }
                                <CurrencyFormat value={val.price - (val.price*(val.discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-5" style={{display:'inline',fontWeight:'700'}}>{value}</p>}/>
                                <p className="mt-2">{val.deskripsi}</p>
                                { this.props.username === "" ?
                                <Link to='/login'><input type='button' className="btn btn-primary" value="Add to Cart"/></Link> :
                                <input type='button' className="btn btn-primary" value="Add to Cart" onClick={() => this.onBtnAddtoCart(val)}/>
                                }
                                
                            </div>
                    </div>
        })
        return jsx
    }

    render(){
        return (
        <div className="container">
            <div className="row justify-content-center">
            {this.renderProdukJsx()}
            </div>
        </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id
    }
}

export default connect(mapStateToProps, {fnHitungCart})(ProductList)