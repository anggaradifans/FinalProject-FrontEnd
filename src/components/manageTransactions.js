import React from 'react'
import {urlApi} from './../support/urlApi'
import Axios from 'axios';
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import PageNotFound from './pageNotFound'
import swal from 'sweetalert';
import {hitungTransactions} from './../1.actions'

function formatMoney(number){
    return number.toLocaleString('in-RP', {style : 'currency', currency: 'IDR'})
}

class ManageTrasactions extends React.Component{

    state = {
        data : [],
        receipt : '',
        modal : false,
        error : ''
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

    approveTransaction = (param) => {
        if(param.bukti_transaksi){
            Axios.put(urlApi+ '/trans/approve/'+param.id, {status : 'Approved'})
            .then((res) => {
                swal('Success', res.data, 'success')
                this.getDataTransactions()
                this.props.hitungTransactions()
            })
            .catch((err) => {
                console.log(err)
            })
        } else {
            swal('Error', 'No Receipt, Transaction can not be approved', 'error')
        }

       
    }

    rejectTransaction = (param) => {

        swal("Why you rejected this transaction?:", {
            content: "input",
          })
          .then((value) => {
                this.setState({error : value})
                var newData = {
                    status : 'Rejected',
                    no : param.order_number,
                    username : param.username,
                    email : param.email,
                    error : this.state.error
                }
                    Axios.put(urlApi+ '/trans/reject/'+param.id, newData)
                    .then((res) => {
                        swal('Success', res.data, 'success')
                        this.getDataTransactions()
                        this.props.hitungTransactions()
                        this.setState({error : ''})
                    })
                    .catch((err) => console.log(err))
          });

        
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal_bayar}</td>
                        <td>{val.username}</td>
                        <td>{formatMoney(val.totalharga)}</td>
                        <td>{val.status}</td>
                        <td>
                            <input type='button' className='btn btn-danger' value='Receipt' onClick={() => this.setState({receipt : val.bukti_transaksi, modal : true })} />
                        </td>
                        <td>
                            <input type='button' className='btn btn-success' value='Approve' onClick={() => this.approveTransaction(val)} />
                            <input type='button' className='btn btn-primary' value='Reject' onClick={() => this.rejectTransaction(val)} style={{width:'115px'}}/>  
                        </td>
                        
                    </tr>
            )
        })
        return jsx
    }

    
    render() {
        if(this.props.role === 'admin'){
            return (
                <div className="container">
                <h3 style={{padding:'20px'}}>Manage Transactions</h3>
                <table className="table table-hover">
                        <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Date of Payment</th>
                            <th scope="col">Username</th>
                            <th scope="col">Total Prices</th>
                            <th scope="col">Status</th>
                            <th scope="col">Receipt</th>
                            <th scope="col">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            {this.renderJsx()}
                        </tbody>
                    </table>

                    <div>
                        <Modal isOpen={this.state.modal} toggle={() => this.setState({modal:false})} className={this.props.className}>
                        <ModalHeader toggle={() => this.setState({modal:false})}> Transaction Receipt </ModalHeader>
                        <ModalBody>
                            {this.state.receipt ? 
                             <img src={'http://localhost:2000/'+this.state.receipt} width='100%' alt='broken' />
                             : 
                             <img src={'https://www.labaleine.fr/sites/baleine/files/image-not-found.jpg'} width='100%' alt='broken' />
                             
                            
                            }
                           
                        </ModalBody>
                        <ModalFooter>
                            <Button color="secondary" onClick={() => this.setState({modal:false})}>Back</Button>
                        </ModalFooter>
                        </Modal>
                    </div>   
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

export default connect(mapStateToProps, {hitungTransactions})(ManageTrasactions) 
