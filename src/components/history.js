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
        Axios.get(urlApi + '/history?userId='+this.props.id)
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
                        <td>{val.tanggal}</td>
                        <td>{val.waktu}</td>
                        <td>{val.username}</td>
                        <td>{val.jumlahItem}</td>
                        <td>{val.totalHarga}</td>
                        <Link to={'/history-detail/'+val.id}><input type='button' className='btn btn-outline-success' value='Detail'/></Link>
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container">
                <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Waktu</th>
                            <th scope="col">Username</th>
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