import React from 'react'
import axios from 'axios'
import {urlApi} from './../support/urlApi'
import './../support/css/product.css'
import CurrencyFormat from 'react-currency-format'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'
import swal from 'sweetalert'
import {fnHitungCart} from './../1.actions'
import QueryString from 'query-string'

class ProductList extends React.Component{
    state = {listProduct : [], cart : 0, searchData : '' , 
            dataPerpage : 6, category : [], filterCategory : 6,
            subcategory : [], filterSub : 4}

    componentDidMount(){
        this.getDataProduct()
        this.getCategory()
        this.getSubcategory()
        this.getDataUrl()
    }

    getDataProduct = () => {
        axios.get( urlApi + '/product/products')
        .then((res) => this.setState({listProduct : res.data}))
        .catch((err)=> console.log(err))
    }

    getCategory = () => {
        axios.get(urlApi + '/category/category')
          .then((res) => this.setState({category : res.data}))
          .catch((err) => console.log(err))
      }

    getSubcategory = () => {
    axios.get(urlApi + '/category/subcategory')
        .then((res) => this.setState({subcategory : res.data}))
        .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.q){
                this.setState({searchData: obj.q.toLowerCase()})
            } if(obj.cat){
                this.setState({filterCategory : obj.cat})
            } if(obj.sub){
                this.setState({filterSub: obj.sub})
            }
        }
    }

    onBtnClick = () => {
        this.setState({dataPerpage : this.state.dataPerpage + 6})
        this.getDataProduct()
    }

    onBtnSearchClick =() => {
        this.pushUrl()
        var search = this.refs.inputsearch.value
        this.setState({searchData : search.toLowerCase()})
      }

    pushUrl = () => {
        var newLink = '/products'
        var params = []
        if(this.refs.inputsearch.value){
            params.push({
                params : 'q',
                value : this.refs.inputsearch.value
            })
        }
        if(this.refs.dropdown.value <= 5){
            params.push({
                params : 'cat',
                value : this.refs.dropdown.value
            })
        }
        if(this.refs.subcat.value <= 3){
            params.push({
                params : 'sub',
                value : this.refs.subcat.value
            })
        }
        for (var i = 0 ; i < params.length; i++){
            if(i == 0){
                newLink += '?' + params[i].params + '=' + params[i].value
            } else {
                newLink += '&' + params[i].params + '=' + params[i].value
            }
        }
        this.props.history.push(newLink)
    }

    onBtnAddtoCart = (id) => {
            var newData = {
                userId : this.props.id,
                productId : id,
                quantity : 1
            }
           axios.post(urlApi+'/cart/addtocart', newData)
            .then((res) => {
               swal("Thanks for the Purchase", res.data, "success")
               this.props.fnHitungCart(this.props.username)
            })
            .catch((err) => console.log(err))
    }

    renderProdukJsx = () => {
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.product_name.toLowerCase().startsWith(this.state.searchData)
            && (val.category === this.state.filterCategory || this.state.filterCategory > 5)
            && (val.subcategory === this.state.filterSub || this.state.filterSub > 3)
        })
        var data =arrSearchAndFilter.slice(0,this.state.dataPerpage)
        var jsx = data.map((val) => {
                return <div className="card col-md-3" style={{width: '18rem', margin: '20px'}}>
                        <Link to={'/product-detail/' + val.id} ><img src={ `http://localhost:2000/${val.image}`} style={{width :'250px', height :'250px'}} className="card-img-top img" alt="Card cap" /></Link>
                        {val.discount > 0 ? 
                        <div className="discount">{val.discount}%</div>
                        : null
                        }
                            <div className="card-body">
                                <h5>{val.product_name}</h5>
                                { val.discount > 0 ?
                                    <CurrencyFormat value={val.price} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text ml-1 mr-5" style={{textDecoration:'line-through', color:'red', display:'inline'}}>{value}</p>}/>
                                    : null
                                }
                                <CurrencyFormat value={val.price - (val.price*(val.discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp'} renderText={value => <p className="card-text mr-4" style={{display:'inline',fontWeight:'700'}}>{value}</p>}/>
                                { this.props.username === "" ?
                                <Link to='/login'><input type='button' className="btn btn-primary" value="Add to Cart"/></Link> :
                                <input type='button' className="btn btn-primary" value="Add to Cart" onClick={() => this.onBtnAddtoCart(val.id)}/>
                                }
                                
                            </div>
                    </div>
        })
        return jsx
    }

    render(){
        var arrSearchAndFilter = this.state.listProduct.filter((val) => {
            return val.product_name.toLowerCase().startsWith(this.state.searchData)
            && (val.category === this.state.filterCategory || this.state.filterCategory > 5)
            && (val.subcategory === this.state.filterSub || this.state.filterSub > 3)
        })
        return (
        <div className="container">
              <h1 className='mt-5' style={{textAlign:'center'}}>Our Product</h1>
                <div className='row justify-content-center mb-3'>
                    <div className='col-md-3'> 
                    <input type='text' ref='inputsearch' placeholder='Search Product' className='form-control' /> 
                    </div>
                    <div className='col-md-2'>
                    <select ref='dropdown' onChange={() => { 
                        this.pushUrl()
                        this.setState({filterCategory : this.refs.dropdown.value, dataPerpage : 6})}} className='form-control'> 
                    <option value={6}>All Categories </option>
                        {
                        this.state.category.map((val) => {
                            return(
                            <option value={val.id}>{val.category}</option>
                            )
                        })
                        }
                    </select>
                    </div>
                    <div className='col-md-2'>
                    <select ref='subcat' onChange={() => {
                        this.pushUrl()
                        this.setState({filterSub : this.refs.subcat.value, dataPerpage : 6})}} className='form-control'> 
                    <option value={4}>All Subcategories </option>
                        {
                        this.state.subcategory.map((val) => {
                            return(
                            <option value={val.id}>{val.subcategory}</option>
                            )
                        })
                        }
                    </select>
                    </div>
                    <div className='col-md-1' style={{marginTop:"-5px"}}> 
                    <input type='button' onClick={this.onBtnSearchClick} className='btn btn-info' value='search'/>
                    </div>
                </div>

            <div className="row justify-content-center">
            {this.renderProdukJsx()}
            </div>
            <div className= 'row justify-content-center'>
            {this.state.dataPerpage > this.state.listProduct.length || arrSearchAndFilter.length < (this.state.dataPerpage+1) ? 
              null :  <p style={{fontStyle:'italic', cursor : 'pointer'}} onClick={this.onBtnClick}>View More</p>
            }
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