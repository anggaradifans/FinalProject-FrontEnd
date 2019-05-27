import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'
import {urlApi} from './../support/urlApi'
import {Link} from 'react-router-dom'
import PageNotFound from './pageNotFound'
import QueryString from 'query-string'


class History extends React.Component{
    state = {rows : []}

    componentDidMount(){
        this.getDataApi()
        this.getDataUrl()
    }
    getDataApi = () => {
        Axios.get(urlApi + '/trans/history/'+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.month < 10){
                Axios.get(urlApi + `/trans/filterhistory?iduser=${this.props.id}&month=0${obj.month}`)
                .then((res) => {
                    this.setState({rows : res.data})
                })
                .catch((err) => console.log(err))
            } else {
                Axios.get(urlApi + `/trans/filterhistory?iduser=${this.props.id}&month=${obj.month}`)
                .then((res) => {
                    this.setState({rows : res.data})
                })
                .catch((err) => console.log(err))
            }
        }

    }

    renderJsx = () => {
        var jsx = this.state.rows.map((val) => {
            return (
                    <tr>
                        <th scope="row">{val.order_number}</th>
                        <td>{val.tanggal_checkout}</td>
                        <td>{val.tanggal_bayar}</td>
                        <td>{val.jumlah_item}</td>
                        <td>Rp. {val.totalharga},00</td>
                        <Link to={'/history-detail/'+val.order_number}><input type='button' className='btn btn-success' value='Detail'/></Link>
                    </tr>
            )
        })
        return jsx
    }

    Dropdown = () => {
            return <select ref = 'bulan' className='form-control'>
                        <option value={0}>All Months</option>
                        <option value={1}>January</option>
                        <option value={2}>February</option>
                        <option value={3}>March</option>
                        <option value={4}>April</option>
                        <option value={5}>May</option>
                        <option value={6}>June</option>
                        <option value={7}>July</option>
                        <option value={8}>August</option>
                        <option value={9}>September</option>
                        <option value={10}>October</option>
                        <option value={11}>November</option>
                        <option value={12}>Desember</option>
                    </select>
    }

    filterData = () => {
        var bulan = this.refs.bulan.value
        this.pushUrl()
        if(parseInt(bulan) === 0){
            this.getDataApi()
        }
        else {
            if(bulan < 10){
                bulan = '0'+this.refs.bulan.value
            }
           
            Axios.get(urlApi + `/trans/filterhistory?iduser=${this.props.id}&month=${bulan}`)
                .then((res) => {
                    this.setState({rows : res.data})
                })
                .catch((err) => console.log(err))
        }
        
    }

    pushUrl = () => {
        var newLink = '/history'
        if(this.refs.bulan.value > 0){
            newLink += '?month=' + this.refs.bulan.value
        } 
        this.props.history.push(newLink)
    }

    
    render() {
        if(this.props.username !== ''){
            return (
                <div className="container">
                    <h2 style={{marginTop:'5px'}}>Transactions History for {this.props.username}</h2>
                    <h4>Filter by Month</h4>
                    <div className='row'>
                        <div className='col-md-3'>
                            {this.Dropdown()}
                        </div>
                        <div className='col-md-3' >
                            <input type='button' className='btn btn-primary' style={{marginTop:'-5px'}} onClick={this.filterData} value='Search'/>
                        </div>
                    </div>
                
                    
                    <table className="table table-hover">
                            <thead>
                            <tr>
                                <th scope="col">No Invoice</th>
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