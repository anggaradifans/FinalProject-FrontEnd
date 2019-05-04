import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'


class History extends React.Component{
    state = {rows : []}

    componentDidMount(){
        this.getDataApi()
    }
    getDataApi = () => {
        Axios.get(urlApi + '/trans/history/'+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.rows.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal_checkout}</td>
                        <td>{val.tanggal_bayar}</td>
                        <td>{val.jumlah_item}</td>
                        <td>{val.totalharga}</td>
                        <Link to={'/history-detail/'+val.order_number}><input type='button' className='btn btn-outline-success' value='Detail'/></Link>
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container">
                <h2 style={{marginTop:'5px'}}>Transactions History for {this.props.username}</h2>
                <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal Checkout</th>
                            <th scope="col">Tanggal Pembayaran</th>
                            <th scope="col">Jumlah Item</th>
                            <th scope="col">Total Harga</th>
                            <th scope="col">Detail Transaksi</th>
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
        username : state.user.username,
        id : state.user.id,
        cart : state.cart.cart
    }
}

export default connect(mapStateToProps)(History)