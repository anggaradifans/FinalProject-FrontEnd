import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Axios from 'axios';
import swal from 'sweetalert'
import Moment from 'moment'
import {Button , Icon , Input} from 'semantic-ui-react'
import { urlApi } from '../support/urlApi';
import {connect } from 'react-redux'
import {fnHitungCart, resetCount} from './../1.actions'
import {Link, Redirect} from 'react-router-dom'
import PageNotFound from './pageNotFound'

function formatMoney(number){
  return number.toLocaleString('in-RP', {style : 'currency', currency: 'IDR'})
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
  TablePaginationActions,
);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    page: 0,
    rowsPerPage: 5,
    isEdit : false,
    editItem : {},
    order : '',
    checkOutDate : '',
    checkOut : false
  };

  componentDidMount(){
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/cart/showcart/' + this.props.id)
      .then((res) => { console.log(res)
          this.setState({rows : res.data})
        })
      .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  

  onBtnEditClick = (param) => {
    this.setState({isEdit : true , editItem : param})
  }

  onBtnSave = () => {
      var quantity = this.quantityEdit.inputRef.value === "" ? this.state.editItem.quantity : this.quantityEdit.inputRef.value
      var NewData = {quantity}
      Axios.put(urlApi + '/cart/editcart/' +this.state.editItem.id,NewData)
        .then((res) => {
            this.getDataApi()
            swal("Edit Success", res.data, "success")
            this.setState({isEdit : false , editItem : {}})
        })
        .catch((err) => {
          console.log(err)
        })
    }

  onBtnCancel = () => {
    this.setState({isEdit : false , editItem : {}})
  }

  onBtnDelete = (id) => {
      Axios.delete(`${urlApi}/cart/deletecart/${id}`)
        .then((res) => {
            this.getDataApi()
            this.props.fnHitungCart(this.props.username)
        })
        .catch((err) => console.log(err))
  }

  getTotalHarga = ()=>{
    var harga=0
     for (var i=0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].price - (this.state.rows[i].price *this.state.rows[i].discount/100))*this.state.rows[i].quantity)
     }
     return harga
     
   }

   getDataCart = () => {
    var cart = []
    for(var i = 0 ; i < this.state.rows.length;i++){
      var newData = {
          product_name : this.state.rows[i].namaProduk,
          quantity : this.state.rows[i].quantity,
          price : (this.state.rows[i].price - (this.state.rows[i].price *this.state.rows[i].discount/100))*this.state.rows[i].quantity,
          tanggal_checkout : this.state.checkOutDate
      }
      cart.push(newData)
    }
    return cart
   }

   addToTransactionDetail = () => {
      for(var i = 0 ; i < this.state.rows.length;i++){
        var newData = {
            order_number : this.state.order,
            iduser : this.props.id,
            product_name : this.state.rows[i].namaProduk,
            quantity : this.state.rows[i].quantity,
            price : (this.state.rows[i].price - (this.state.rows[i].price *this.state.rows[i].discount/100))*this.state.rows[i].quantity,
            tanggal_checkout : this.state.checkOutDate
        }
        Axios.post(urlApi + '/cart/addtransdetail', newData)
          .then((res) => console.log(res))
          .catch((err) => console.log(err))
      }
    
   }

   deleteCart = () => {
     for(var i = 0 ; i < this.state.rows.length;i++){
        Axios.delete(urlApi + '/cart/deletecart/' + this.state.rows[i].id)
          .then((res) => {
            this.props.fnHitungCart(this.props.username)
            this.getDataApi()
          })
     }
   }

   checkOut = () => {
     var order_number = `GL-${this.props.id}` + Date.now()
    var tanggal_checkout = Moment().format('DD-MM-YYYY, h:mm:ss')
    this.setState({order : order_number, checkOutDate : tanggal_checkout})
    var cart = this.getDataCart() 
    var newData = {
        order_number,
        tanggal_checkout,
        username : this.props.username,
        userId : this.props.id,
        totalHarga : this.getTotalHarga(),
        jumlah_item : this.state.rows.length,
        email : this.props.email,
        cart,
        status : 'Unpaid'
     }
     Axios.post(urlApi+'/cart/checkout', newData)
      .then((res)  => {
        this.addToTransactionDetail()
        this.deleteCart()
        swal('Success', 'Invoice Sent to Email, Please Upload Your Receipt', 'success')
        this.setState({checkOut:true})
      })
   }

  renderJsx = () => {
    var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val, index) => {
          return (
                <TableRow key={val.id}>
                 <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.namaProduk}
                  </TableCell>
                  <TableCell>{formatMoney(val.price - (val.price*(val.discount/100)))}</TableCell>
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.category}</TableCell>
                  <TableCell>{val.subcategory}</TableCell>
                  <TableCell>{val.quantity}</TableCell>
                  <TableCell>
                    <Button animated color ='teal' onClick={() => this.onBtnEditClick(val)}>
                    <Button.Content visible >Edit </Button.Content>
                    <Button.Content hidden>
                        <Icon name='edit' />
                    </Button.Content>
                    </Button>
                    <Button animated color ='red' onClick={() => this.onBtnDelete(val.id)}>
                    <Button.Content visible>Delete</Button.Content>
                    <Button.Content hidden>
                        <Icon name='delete' />
                    </Button.Content>
                    </Button>
                  </TableCell>
                </TableRow>
          )
      })
      return jsx
  }

  render() {

    if(this.state.checkOut){
      return <Redirect to= {`/payment/${this.state.order}`} />
    }
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    var {namaProduk, quantity} = this.state.editItem
    
    if(this.props.username !== ''){
      if(this.state.rows.length > 0){
        return (
          <div className = 'container' style={{marginBottom:'90px'}}>
            <h2 style={{padding:'10px'}}>Shopping Cart List</h2>
             {/* EDIT PRODUCT */}
      
          {
            this.state.isEdit === true ?
            <Paper className='mt-3'>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>EDIT QUANTITY PRODUCT {namaProduk}</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                              <Input ref={input => this.quantityEdit = input} placeholder={quantity} className='mt-2 ml-2 mb-2'/>
                              <Button animated color ='teal' className='mt-2 ml-2 mb-2' onClick={this.onBtnSave}>
                              <Button.Content visible>Save Changes</Button.Content>
                              <Button.Content hidden>
                                  <Icon name='save' />
                              </Button.Content>
                              </Button>
                              <Button animated color ='red' className='mt-2 ml-2 mb-2' onClick={this.onBtnCancel}>
                              <Button.Content visible>Cancel</Button.Content>
                              <Button.Content hidden>
                                  <Icon name='cancel' />
                              </Button.Content>
                              </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
            : null
          }
            <Paper className={classes.root}>
              <div className={classes.tableWrapper}>
                <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>NO</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>PRODUCT</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>PRICE</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>DISC</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>CAT</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>SUB</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>QTY</TableCell>
                        <TableCell style={{fontSize:'20px', fontWeight:'600'}}>ACT</TableCell>
                    </TableRow>
                </TableHead>
                  <TableBody>
                    {this.renderJsx()}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                  <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4}><h3>Total Prices :   { formatMoney(this.getTotalHarga())}</h3></TableCell>
                      <TableCell colSpan={1}>
                        <Link to ='/products'><Button animated color ='teal'>
                            <Button.Content visible >Continue Shopping</Button.Content>
                            <Button.Content hidden>
                                <Icon name='cart' />
                            </Button.Content>
                            </Button>
                            </Link>
                      </TableCell>
                      <TableCell colSpan={3}>
                        <Button animated color ='teal' onClick={this.checkOut}>
                            <Button.Content visible >Check Out </Button.Content>
                            <Button.Content hidden>
                                <Icon name='cart' />
                            </Button.Content>
                            </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        SelectProps={{
                          native: true,
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        ActionsComponent={TablePaginationActionsWrapped}
                      />
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            </Paper>
            </div>
          );
      } else {
        return (
          <div className="container">
            <div className="row justify-content-center">
              <h2 className='mt-5'>Your Cart is Empty</h2>
            </div>
            <div className="row justify-content-center mt-5">
            <Link to ='/products'><input type = "button" className="btn btn-success" value = "See Our Products"/></Link>
            </div>
          </div>
        )
      }
    }
     else {
      return <PageNotFound/>
    }
    
  
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    id : state.user.id,
    username : state.user.username,
    role : state.user.role,
    cart : state.cart.cart,
    email : state.user.email
  }
}

export default connect(mapStateToProps, {fnHitungCart, resetCount})(withStyles(styles)(CustomPaginationActionsTable));