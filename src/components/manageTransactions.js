import React from 'react'
import {urlApi} from './../support/urlApi'
import Axios from 'axios';
import {connect} from 'react-redux'
import PageNotFound from './pageNotFound'


class ManageTrasactions extends React.Component{

    state = {
        data : []
    }
    componentDidMount(){
        this.getDataTransactions()
    }

    getDataTransactions = () => {
        Axios.get(urlApi+ '/trans/getTransactions')
            .then((res) => {
                this.setState({data : res.data})
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal_checkout}</td>
                        <td>{val.username}</td>
                        <td>{val.jumlah_item}</td>
                        <td>Rp. {val.totalharga} ,00</td>
                        <td>{val.status}</td>
                        <input type='button' className='btn btn-success' value='Approve'/>
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.role == 'admin'){
            return (
                <div className="container">
                <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal Checkout</th>
                            <th scope="col">Username</th>
                            <th scope="col">Jumlah Item</th>
                            <th scope="col">Total Harga</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>
            </div>
            )
        } else {
            return <PageNotFound/>
        }
        
    }
}

const mapStateToProps = (state) => {
    return {
        role : state.user.role
    }
}

export default connect(mapStateToProps)(ManageTrasactions) 
