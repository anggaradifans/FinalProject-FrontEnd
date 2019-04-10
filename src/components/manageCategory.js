import React from 'react'
import Axios from 'axios'
import {urlApi} from './../support/urlApi'


class ManageCategory extends React.Component{
    
    state = {
        category : [],
        subcategory : []
    }

    componentDidMount(){
        this.getCategory()
        this.getSubcategory()
      }

    getCategory = () => {
        Axios.get(urlApi + '/product/category')
          .then((res) => this.setState({category : res.data}))
          .catch((err) => console.log(err))
      }

    getSubcategory = () => {
        Axios.get(urlApi + '/product/subcategory')
          .then((res) => this.setState({subcategory : res.data}))
          .catch((err) => console.log(err))
      }

    renderCategory = () => {
            var jsx = this.state.category.map((val, index) => {
                return (
                        <tr>
                            <th scope="row">{index+1}</th>
                            <td>{val.category}</td>
                        </tr>
                )
            })
            return jsx
    }

    renderSubcategory = () => {
        var jsx = this.state.subcategory.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.subcategory}</td>
                    </tr>
            )
        })
        return jsx
        
    }
    
    render(){
        return (
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                                <div className="input-group">
                                <input className="form-control" type="text" placeholder="Input new Category"/>
                                <input className="btn btn-primary" defaultValue="Submit new Category" />
                                <input className="form-control" type="text" placeholder="Input new Subcategory"/>
                                <input className="btn btn-primary" defaultValue="Submit" />
                                </div>
                        </div>
                        <div className="col-md-4">
                        <table className="table table-hover">
                                <thead>
                                <tr>
                                    <th scope="col">No</th>
                                    <th scope="col">Category</th>
                                </tr>
                                </thead>
                                <tbody>
                                    {this.renderCategory()}
                                </tbody>
                            </table>
                        </div>
                        <div className="col-md-4">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Subcategory</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.renderSubcategory()}
                            </tbody>
                        </table>
                        </div>
                    </div>
                </div>
        )
    }
}

export default ManageCategory