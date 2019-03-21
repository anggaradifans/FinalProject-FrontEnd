import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'


class HistoryDetail extends React.Component{
    state = {rows : []}

    componentDidMount(){
        this.getDataApi()
    }
    getDataApi = () => {
        var idUrl = this.props.match.params.id
        Axios.get(urlApi + '/history?userId='+this.props.id+'&id='+idUrl)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data[0].cart})
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var detail = this.state.rows.map((val, index) => {
            return (
                <tr>
                    <th scope="row">{index+1}</th>
                    <td>{val.namaProduk}</td>
                    <td>{val.quantity}</td>
                    <td>{val.harga}</td>
                </tr>
            )
        })
        return detail
    }

    
    render() {
        return (
            <div className="container">
            <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama Produk</th>
                        <th scope="col">Quantity</th>
                        <th scope="col">Harga</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderJsx()}
                        <Link to={'/history'}><input type='button' className='btn btn-outline-success' value='Back to Previous Menu'/></Link>
                    </tbody>
                </table>
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

export default connect(mapStateToProps)(HistoryDetail)