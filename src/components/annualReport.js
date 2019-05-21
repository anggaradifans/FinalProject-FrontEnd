import React from 'react'
import Axios from 'axios';
import { urlApi } from '../support/urlApi';
import {connect} from 'react-redux'
import PageNotFound from './pageNotFound'
import QueryString from 'query-string'

function formatMoney(number){
    return number.toLocaleString('in-RP', {style : 'currency', currency: 'IDR'})
}

class AnnualReport extends React.Component{
    
    state = {
        data : []
    }


    componentDidMount(){
        this.getData()
        this.getDataUrl()
    }


    getData = () => {
        Axios.get(urlApi+'/trans/annualreport')
            .then((res) => {
                this.setState({data : res.data})
            })
            .catch((err) => console.log(err))
    }

    getDataUrl = () => {
        var obj = QueryString.parse(this.props.location.search)
        if(this.props.location.search){
            if(obj.month < 10){
                Axios.get(urlApi + `/trans/filter-ar?month=0${obj.month}`)
                .then((res) => {
                    this.setState({data : res.data})
                })
                .catch((err) => console.log(err))
            } else {
                Axios.get(urlApi + `/trans/filter-ar?month=${obj.month}`)
                .then((res) => {
                    this.setState({data : res.data})
                })
                .catch((err) => console.log(err))
            }
        }
       
    }

    getTotalHarga = () => {
        var harga = 0
        for(var i =0 ; i < this.state.data.length; i++){
            harga += this.state.data[i].totalharga
        }
        return harga
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

    pushUrl = () => {
        var newLink = '/annualreport'
        if(this.refs.bulan.value > 0){
            newLink += '?month=' + this.refs.bulan.value
        } 
        this.props.history.push(newLink)
    }

    filterData = () => {
        var bulan = this.refs.bulan.value
        this.pushUrl()
        if(bulan === 0){
            this.getDataApi()
        }
        else {
            if(bulan < 10){
                bulan = '0'+this.refs.bulan.value
            }
           
            Axios.get(urlApi + `/trans/filter-ar?month=${bulan}`)
                .then((res) => {
                    this.setState({data : res.data})
                })
                .catch((err) => console.log(err))
        }
        
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return <tr>
                        <td>{index + 1}</td>
                        <td> {val.tanggal_bayar} </td>
                        <td> {val.username} </td>
                        <td>{val.jumlah_item}</td>
                        <td>{formatMoney(val.totalharga)} </td>
                        <td>{val.order_number}</td>
                   </tr>
        })
        return jsx
    }
    
    render(){
        if(this.props.role === 'admin'){
        return (
            <div className="container">
                <h2 style={{marginTop:'5px'}}>Annual Report</h2>
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
                            <th scope="col">No</th>
                            <th scope="col">Transaction Date</th>
                            <th scope="col">Username</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Price</th>
                            <th scope="col">Order Number</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>
                <h3>Total Prices : {formatMoney(this.getTotalHarga())}</h3>
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

export default connect(mapStateToProps)(AnnualReport)