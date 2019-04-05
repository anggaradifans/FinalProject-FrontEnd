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
import {Button , Icon , Input, Label} from 'semantic-ui-react'
import { urlApi } from '../support/urlApi';
import {connect } from 'react-redux'
import PageNotFound from './pageNotFound'

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
    selectedFile : null,
    error : ''

  };

  componentDidMount(){
    this.getDataApi()
  }

  getDataApi = () => {
      Axios.get(urlApi + '/product/products')
      .then((res) => this.setState({rows : res.data}) )
      .catch((err) => console.log(err))
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onChangeHandler =  (event) => {
    //Untuk mendapatkan file  image
    this.setState({selectedFile : event.target.files[0] })
}

  valueHandler = () => {
    var value = this.state.selectedFile ? this.state.selectedFile.name : 'Pick a Picture'
    return value
  }

  onBtnAdd = () => {
      var newData = {product_name : this.refs.nama.value , price : this.refs.harga.value ,
                    discount : this.refs.diskon.value , category : this.refs.kategori.value , 
                    subcategory : this.refs.subkategori.value,  deskripsi : this.refs.deskripsi.value }
        alert(newData.product_name)
      var fd = new FormData()
      fd.append('data' , JSON.stringify(newData))
      fd.append('image', this.state.selectedFile, this.state.selectedFile.name)
      Axios.post(urlApi+'/product/addproduct', fd)
        .then((res) => {
        if(res.data.error){
          this.setState({error : res.data.msg})
        } else {
          swal("Product Added", "New product has been added", "success")
            this.getDataApi()
            this.refs.nama.value=''
            this.refs.harga.value=''
            this.refs.diskon.value=''
            this.refs.kategori.value=''
            this.refs.subkategori.value=''
            this.refs.deskripsi.value=''
            this.setState({selectedFile: null})
        }
        })
        .catch((err) => console.log(err))
  }

  onBtnEditClick = (param) => {
    this.setState({isEdit : true , editItem : param})
  }

  onBtnSave = () => {
      var name = this.namaEdit.inputRef.value === "" ? this.state.editItem.nama : this.namaEdit.inputRef.value
      var harga = this.hargaEdit.inputRef.value === "" ? this.state.editItem.harga : this.hargaEdit.inputRef.value
      var diskon = this.discountEdit.inputRef.value === "" ? this.state.editItem.discount : this.discountEdit.inputRef.value
      var kategori = this.categoryEdit.inputRef.value === "" ? this.state.editItem.kategori : this.categoryEdit.inputRef.value
      var image = this.imageEdit.inputRef.value === "" ? this.state.editItem.img : this.imageEdit.inputRef.value
      var deskripsi = this.deskripsiEdit.inputRef.value === "" ? this.state.editItem.deskripsi : this.deskripsiEdit.inputRef.value
  
      var NewData = {nama : name , harga : parseInt(harga) , discount : parseInt(diskon) , kategori , img : image ,deskripsi }
      Axios.put(urlApi + '/products/' +this.state.editItem.id,NewData)
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
      Axios.delete(urlApi + '/products/' + id)
        .then((res) => {
            this.getDataApi()
        })
        .catch((err) => console.log(err))
  }

  renderJsx = () => {
      var jsx = this.state.rows.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((val) => {
          return (
                <TableRow key={val.id}>
                 <TableCell>{val.id}</TableCell>
                  <TableCell component="th" scope="row">
                    {val.product_name}
                  </TableCell>
                  <TableCell>Rp. {val.price}</TableCell>
                  <TableCell>{val.discount}%</TableCell>
                  <TableCell>{val.category}</TableCell>
                  <TableCell><img src={val.img} width='50px' alt='...'/></TableCell>
                  <TableCell>{val.deskripsi}</TableCell>
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
    var {nama, harga, discount, kategori, img, deskripsi} = this.state.editItem
    
    if(this.props.role === 'admin'){
    return (
    <div className = 'container'>
      <Paper className={classes.root}>
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
          <TableHead>
              <TableRow>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>ID</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>NAMA</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>HARGA</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>DISC</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>CAT</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>IMG</TableCell>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>DESC</TableCell>
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

      {/* ADD PRODUCT */}
      <h2>Add Product</h2>
      <div className = 'row mt-5 mb-2'>
          <div className= 'col-md-3'>
              <input className="form-control" ref ="nama" type="text" placeholder='Masukkan nama barang'/>
          </div>
          <div className= 'col-md-3'>
              <input className="form-control" ref="harga" type="number" placeholder='Masukkan harga barang'/>
          </div>
          <div className= 'col-md-3'>
              <input className="form-control" ref="diskon" type="number" placeholder='Masukkan diskon barang'/>
          </div>
          <div className= 'col-md-3'>
              <input className="form-control" ref ="kategori" type="text" placeholder='Masukkan kategori'/>
          </div>
      </div>
      <div className = 'row mb-5'>
          <div className= 'col-md-3'>
              <input className="form-control" ref="subkategori" type="text" placeholder='Masukkan subkategori'/>
          </div>
          <div className= 'col-md-3'>
              <input className="form-control" ref="deskripsi" type="text" placeholder='Masukkan deskripsi'/>
          </div>
          <div className= 'col-md-3'>
            <input style={{display:"none"}} ref="input" type="file" onChange={this.onChangeHandler}/>
            <input type="button" className="form-control btn-success" onClick={() => this.refs.input.click()} value={this.valueHandler()}/>
          </div>
          <div className= 'col-md-3'>
            <input type="button" className="form-control btn-primary" onClick={this.onBtnAdd} value="Add Data"/>
            {
              this.state.error ? <p style={{color:'red'}}>{this.state.error}</p> : null
            }
          </div>
      </div>
  {/* EDIT PRODUCT */}

    {
      this.state.isEdit === true ?
      <Paper className='mt-3'>
          <Table>
              <TableHead>
              <TableRow>
                  <TableCell style={{fontSize:'20px', fontWeight:'600'}}>EDIT PRODUCT {nama}</TableCell>
              </TableRow>
              </TableHead>
              <TableBody>
                  <TableRow>
                      <TableCell>
                        <Input ref={input => this.namaEdit = input} placeholder={nama} className='mt-2 ml-2 mb-2'/>
                      <Input  ref={input => this.hargaEdit = input} labelPosition='right' type='number' className='mt-2 ml-2 mb-2' placeholder={harga}>
                            <Label basic>Rp</Label>
                            <input />
                            <Label>.00</Label>
                        </Input>
                        <Input ref={input => this.discountEdit = input} placeholder={discount} className='mt-2 ml-2 mb-2'/>
                        <Input ref={input => this.categoryEdit = input} placeholder={kategori} className='mt-2 ml-2 mb-2'/>
                        <Input ref={input => this.imageEdit = input} placeholder={img} className='mt-2 ml-2 mb-2'/>
                        <Input ref={input => this.deskripsiEdit = input} placeholder={deskripsi} className='mt-2 ml-2 mb-2'/>
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
  } else {
    return <PageNotFound/>
  }
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    role : state.user.role
  }
}

export default connect(mapStateToProps)(withStyles(styles)(CustomPaginationActionsTable));