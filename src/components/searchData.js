import React from 'react'
import axios from 'axios'
import {urlApi} from './../support/urlApi'
import './../support/css/product.css'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import {fnHitungCart, getSearchData} from './../1.actions'
import QueryString from 'query-string'

class Search extends React.Component{
    state = {listProduct : []}

    componentDidMount(){
        this.getDataProduct()
        this.getDataUrl()
    }

    getDataProduct = () => {
        axios.get( urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err)=> console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            this.props.getSearchData(obj.q.toLowerCase())
        }
    }

    renderProdukJsx = () => {
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.product_name.toLowerCase().includes(this.props.search)
        })
        var jsx = arrSearchAndFilter.map((val) => {
                return <div className="card col-md-3" style={{width: '18rem', margin: '20px'}}>
                        <Link to={'/product-detail/' + val.id} ><img src={ `http://localhost:2000/${val.image}`} style={{width :'250px', height :'250px'}} className="card-img-top img" alt="Card cap" /></Link>
                        {val.discount > 0 ? 
                        <div className="discount">{val.discount}%</div>
                        : null
                        }
                            <div className="card-body">
                                <h5>{val.product_name}</h5>
                                { val.discount > 0 ?
                                    <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-5" style={{textDecoration:'line-through', color:'red', display:'inline'}}>{value}</p>}/>
                                    : null
                                }
                                <CurrencyFormat value={val.price - (val.price*(val.discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-5" style={{display:'inline',fontWeight:'700'}}>{value}</p>}/>
                            </div>
                    </div>
        })
        return jsx
    }

    render(){
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.product_name.toLowerCase().includes(this.props.search)
        })
        return (
        <div className="container">
            <div className="row justify-content-center">
            <h3 style={{margin : "10px"}}>Search Result(s) for '{this.props.search}' : {arrSearchAndFilter.length}</h3>
            </div>

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
        id : state.user.id,
        search : state.search.searchData,
    }
}

export default connect(mapStateToProps, {fnHitungCart, getSearchData})(Search)