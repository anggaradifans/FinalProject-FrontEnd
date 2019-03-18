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
import CurrencyFormat from 'react-currency-format'
import {Button , Icon , Input} from 'semantic-ui-react'
import { urlApi } from '../support/urlApi';
import {fnHitungCart} from './../1.actions'
import {connect } from 'react-redux'
import cookie from 'universal-cookie'


const Cookies = new cookie()
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
    editItem : {}
  };

  componentDidMount(){
    var cookie = Cookies.get('userData')
    this.getDataApi(cookie)
  }

  getDataApi = (name) => {
      Axios.get(urlApi + '/cart?username=' + name)
      .then((res) => { console.log(res)
          this.setState({rows : res.data})
          this.props.fnHitungCart(res.data.length)
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
      var username = this.props.username
      var userId = this.props.id
      var productId = this.state.editItem.productId
      var name = this.state.editItem.namaProduk 
      var harga = this.state.editItem.harga
      var diskon = this.state.editItem.discount
      var kategori = this.state.editItem.kategori
      var image = this.state.editItem.img
      var quantity = this.quantityEdit.inputRef.value === "" ? this.state.editItem.quantity : this.quantityEdit.inputRef.value
  
      var NewData = {username, userId, productId, namaProduk : name , harga : parseInt(harga) , discount : parseInt(diskon) , kategori , img : image , quantity : parseInt(quantity) }
      Axios.put(urlApi + '/cart/' +this.state.editItem.id,NewData)
        .then((res) => {
            this.getDataApi()
            swal("Edit Success", "Product has been edited", "success")
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
      Axios.delete(urlApi + '/cart/' + id)
        .then((res) => {
          var cookie = Cookies.get('userData')
            this.getDataApi(cookie)
        })
        .catch((err) => console.log(err))
  }

  getTotalHarga = ()=>{
    var harga=0
     for (var i=0;i<this.state.rows.length;i++){
        harga += parseInt((this.state.rows[i].harga - (this.state.rows[i].harga *this.state.rows[i].discount/100))*this.state.rows[i].quantity)
     }
     return harga
     
   }

  checkOut =() => {
    Axios.get(urlApi+'/cart?userId='+this.props.id)
      .then((res)=> {
        if(res.data.length > 0){
            for (var i = 0 ; i< this.state.rows.length; i++){
              var today = new Date();
              var dd = String(today.getDate()).padStart(2, '0');
              var mm = String(today.getMonth() + 1).padStart(2, '0');
              var yyyy = today.getFullYear();
              today = mm + '/' + dd + '/' + yyyy;
              var quantity = res.data[i].quantity
              var username = res.data[i].username
              var userId = res.data[i].userId
              var productId = res.data[i].productId
              var namaProduk = res.data[i].namaProduk
              var harga = res.data[i].harga
              var discount = res.data[i].discount
              var kategori = res.data[i].kategori

              var newData = {tanggal : today, quantity, username, userId, productId, namaProduk, harga, discount, kategori }
              Axios.post(urlApi + '/history',newData)
                .then((res) => {
                swal('Success', 'Transaksi Sukses', 'success')
                })
                .catch((err) => console.log(err))
              Axios.delete(urlApi+"/cart/"+this.state.rows[i].id)
                .then((res) => {
                  console.log(res)
                  this.getDataApi()

                })
                .catch((err) => console.log(err))
            }
        } else {
          swal("Cart Anda Kosong", "Coba belanja dulu", "error")
        }
      })
      .catch((err)=> console.log(err))
  }

  renderJsx = () => {
      var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val, index) => {
          return (
                <TableRow key={val.id}>
                 <TableCell>{index+1}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.namaProduk}
                  </TableCell>
                  <CurrencyFormat value= {val.harga - (val.harga*(val.discount/100))} displayType={'text'} thousandSeparator={true} prefix={'Rp. '} renderText={value => <TableCell>{value}</TableCell>} />
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.kategori}</TableCell>
                  <TableCell><img src={val.img} width='50px' alt='...'/></TableCell>
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
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
    var {namaProduk, quantity} = this.state.editItem
    
    return (
    <div className = 'container'>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>NO</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>PRODUK</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>HARGA</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>DISC</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>CAT</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>IMG</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>QTY</TableCell>
              </TableRow>
          </TableHead>
            <TableBody>
              {this.renderJsx()}
              <TableRow>
              <TableCell colSpan={7}>Total Harga : Rp. {this.getTotalHarga()}</TableCell>
                <TableCell colSpan={6}>
                  <Button animated color ='teal' onClick={this.checkOut}>
                      <Button.Content visible >Check Out </Button.Content>
                      <Button.Content hidden>
                          <Icon name='cart' />
                      </Button.Content>
                      </Button>
                </TableCell>
              </TableRow>
              {emptyRows > 0 && (
                <TableRow style={{ height: 48 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
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
      </div>
    );
  
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
    cart : state.cart.cart
  }
}

export default connect(mapStateToProps ,{fnHitungCart})(withStyles(styles)(CustomPaginationActionsTable));