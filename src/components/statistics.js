import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';


class Statistics extends React.Component{
    
    state = {
        dataProduct : [],
        dataCategory : [],
        dataUser : []
    }

    componentDidMount(){
        this.getDataProduct()
        this.getDataCategory()
        this.getDataUser()
    }
    
    getDataProduct = () => {
        Axios.get(urlApi+'/data/bestseller-product')
            .then((res) => {
                this.setState({dataProduct : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataCategory = () => {
        Axios.get(urlApi+'/data/bestseller-catsub')
            .then((res) => {
                this.setState({dataCategory : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUser = () => {
        Axios.get(urlApi+'/data/bestbuyer')
            .then((res) => {
                this.setState({dataUser : res.data})
            })
            .catch((err) => console.log(err))
    }

    renderJsxProduct = () => {
        var jsx = this.state.dataProduct.map((val, index) => {
            return (
                    <tr>
                        <td>{index+1}</td>
                        <td>{val.product_name}</td>
                        <td>{val.category}</td>
                        <td>{val.sold_unit}</td>
                    </tr>
            )
        })
        return jsx
    }

    renderJsxCatsub = () => {
        var jsx = this.state.dataCategory.map((val, index) => {
            return (
                    <tr>
                        <td>{index + 1}</td>
                        <td> {val.category} </td>
                        <td>{val.subcategory}</td>
                        <td>{val.sold_unit}</td>
                    </tr>
            )
        })
        return jsx
    }

    renderJsxUser = () => {
        var jsx = this.state.dataUser.map((val, index) => {
            return (
                <tr>
                    <td>{index + 1}</td>
                    <td> {val.username} </td>
                    <td>{val.unit_bought}</td>
                </tr>
            )
        })
        return jsx
    }

    render(){
        return (
                <div className="container" style={{fontFamily:'Roboto'}}>
                    <h1 style={{textAlign:"center"}}>Gamerslab Statistics</h1>
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <h3>Best Sellers</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Product Name</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Units Sold</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderJsxProduct()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4">
                            <h3>Most Popular Category</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Category</th>
                                        <th scope="col">Subcategory</th>
                                        <th scope="col">Units Sold</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderJsxCatsub()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-3">
                            <h3>Best Buyer</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">No</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Item Bought</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.renderJsxUser()}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        )
    }
}

export default Statistics