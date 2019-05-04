import React from 'react'
import {urlApi} from './../support/urlApi'
import Axios from 'axios';
import {connect} from 'react-redux'
import {Modal, ModalHeader, ModalBody, ModalFooter, Button} from 'reactstrap'
import PageNotFound from './pageNotFound'
import swal from 'sweetalert';


class ManageTrasactions extends React.Component{

    state = {
        data : [],
        receipt : '',
        modal : false
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

    approveTransaction = (id) => {
        Axios.put(urlApi+ '/trans/approve/'+id, {status : 'Approved'})
            .then((res) => {
                swal('Success', res.data, 'success')
                this.getDataTransactions()
            })
            .catch((err) => {
                console.log(err)
            })
    }

    renderJsx = () => {
        var jsx = this.state.data.map((val, index) => {
            return (
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.tanggal_bayar}</td>
                        <td>{val.username}</td>
                        <td>Rp. {val.totalharga} ,00</td>
                        <td>{val.status}</td>
                        <td>
                            <input type='button' className='btn btn-danger' value='Receipt' onClick={() => this.setState({receipt : val.bukti_transaksi, modal : true })} />
                        </td>
                        <td>
                            <input type='button' className='btn btn-success' value='Approve' onClick={() => this.approveTransaction(val.id)} />
                            <input type='button' className='btn btn-primary' value='Reject' style={{width:'115px'}}/>  
                        </td>
                        
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
                            <th scope="col">Tanggal Pembayaran</th>
                            <th scope="col">Username</th>
                            <th scope="col">Total Harga</th>
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
                             <h2>No Transactions Receipt</h2>
                            
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

export default connect(mapStateToProps)(ManageTrasactions) 
