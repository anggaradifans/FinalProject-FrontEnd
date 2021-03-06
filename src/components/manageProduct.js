import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import Axios from "axios";
import swal from "sweetalert";
import { Button, Icon } from "semantic-ui-react";
import { urlApi } from "../support/urlApi";
import { connect } from "react-redux";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import PageNotFound from "./pageNotFound";
import QueryString from "query-string";

function formatMoney(number) {
  return number.toLocaleString("in-RP", { style: "currency", currency: "IDR" });
}

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5
  }
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
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1)
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
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
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
  theme: PropTypes.object.isRequired
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, {
  withTheme: true
})(TablePaginationActions);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 500
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class CustomPaginationActionsTable extends React.Component {
  state = {
    rows: [],
    category: [],
    subcategory: [],
    page: 0,
    rowsPerPage: 5,
    modal: false,
    editItem: {},
    selectedFile: null,
    selectedFileEdit: null,
    error: "",
    searchData: "",
    filterCategory: 6,
    filterSub: 4
  };

  componentDidMount() {
    this.getDataApi();
    this.getCategory();
    this.getSubcategory();
    this.getDataUrl();
  }

  getDataApi = () => {
    Axios.get(urlApi + "/product/manageproducts")
      .then(res => this.setState({ rows: res.data }))
      .catch(err => console.log(err));
  };

  getCategory = () => {
    Axios.get(urlApi + "/category/category")
      .then(res => this.setState({ category: res.data }))
      .catch(err => console.log(err));
  };

  getSubcategory = () => {
    Axios.get(urlApi + "/category/subcategory")
      .then(res => this.setState({ subcategory: res.data }))
      .catch(err => console.log(err));
  };

  getDataUrl = () => {
    var obj = QueryString.parse(this.props.location.search);
    if (this.props.location.search) {
      if (obj.search) {
        this.setState({ searchData: obj.search.toLowerCase() });
      }
      if (obj.cat) {
        this.setState({ filterCategory: obj.cat });
      }
      if (obj.sub) {
        this.setState({ filterSub: obj.sub });
      }
    }
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  onChangeHandler = event => {
    //Untuk mendapatkan file  image
    this.setState({ selectedFile: event.target.files[0] });
  };

  valueHandler = () => {
    var value = this.state.selectedFile
      ? this.state.selectedFile.name
      : "Pick a Picture";
    return value;
  };

  onChangeHandlerEdit = event => {
    this.setState({ selectedFileEdit: event.target.files[0] });
  };

  valueHandlerEdit = () => {
    var value = this.state.selectedFileEdit
      ? this.state.selectedFileEdit.name
      : "Pick a Picture";
    return value;
  };

  pushUrl = () => {
    var newLink = "/manage";
    var params = [];
    if (this.refs.inputsearch.value) {
      params.push({
        params: "search",
        value: this.refs.inputsearch.value
      });
    }
    if (this.refs.dropdown.value <= 5) {
      params.push({
        params: "cat",
        value: this.refs.dropdown.value
      });
    }
    if (this.refs.subcat.value <= 3) {
      params.push({
        params: "sub",
        value: this.refs.subcat.value
      });
    }
    for (var i = 0; i < params.length; i++) {
      if (i === 0) {
        newLink += "?" + params[i].params + "=" + params[i].value;
      } else {
        newLink += "&" + params[i].params + "=" + params[i].value;
      }
    }
    this.props.history.push(newLink);
  };

  onBtnSearchClick = () => {
    var search = this.refs.inputsearch.value;
    this.pushUrl();
    this.setState({ searchData: search });
  };

  onBtnAdd = () => {
    if (
      this.refs.nama.value === "" ||
      this.refs.harga.value === "" ||
      this.refs.diskon.value === "" ||
      this.refs.kategori.value === "" ||
      this.refs.subkategori.value === "" ||
      this.refs.deskripsi.value === "" ||
      this.state.selectedFile === null
    ) {
      alert("Please input all data");
    }
    if (this.refs.harga.value < 0 || this.refs.diskon.value < 0) {
      swal("Error", "Price or Discount value Invalid", "error");
    } else {
      var newData = {
        product_name: this.refs.nama.value,
        price: this.refs.harga.value,
        discount: this.refs.diskon.value,
        category: this.refs.kategori.value,
        subcategory: this.refs.subkategori.value,
        deskripsi: this.refs.deskripsi.value
      };

      var fd = new FormData();
      fd.append("data", JSON.stringify(newData));
      fd.append("image", this.state.selectedFile, this.state.selectedFile.name);
      Axios.post(urlApi + "/product/addproduct", fd)
        .then(res => {
          if (res.data.error) {
            this.setState({ error: res.data.msg });
          } else {
            swal("Product Added", "New product has been added", "success");
            this.getDataApi();
            this.refs.nama.value = "";
            this.refs.harga.value = "";
            this.refs.diskon.value = "";
            this.refs.kategori.value = "";
            this.refs.subkategori.value = "";
            this.refs.deskripsi.value = "";
            this.setState({ selectedFile: null });
          }
        })
        .catch(err => console.log(err));
    }
  };

  onBtnSave = () => {
    var data = {
      product_name: this.refs.namaEdit.value
        ? this.refs.namaEdit.value
        : this.state.editItem.product_name,
      price: this.refs.hargaEdit.value
        ? this.refs.hargaEdit.value
        : this.state.editItem.price,
      discount: this.refs.diskonEdit.value
        ? this.refs.diskonEdit.value
        : this.state.editItem.discount,
      category: this.refs.kategoriEdit.value
        ? this.refs.kategoriEdit.value
        : this.state.editItem.category,
      subcategory: this.refs.subkategoriEdit.value
        ? this.refs.subkategoriEdit.value
        : this.state.editItem.subcategory,
      deskripsi: this.refs.deskripsiEdit.value
        ? this.refs.deskripsiEdit.value
        : this.state.editItem.deskripsi
    };
    if (this.state.selectedFileEdit) {
      var fd = new FormData();
      fd.append("edit", this.state.selectedFileEdit);
      fd.append("data", JSON.stringify(data));
      fd.append("imageBefore", this.state.editItem.image);
      Axios.put(
        "http://localhost:2000/product/editproduct/" + this.state.editItem.id,
        fd
      )
        .then(res => {
          swal("Product Edited", res.data, "success");
          this.getDataApi();
          this.setState({ modal: false });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      Axios.put(
        "http://localhost:2000/product/editproduct/" + this.state.editItem.id,
        data
      )
        .then(res => {
          swal("Product Edited", res.data, "success");
          this.getDataApi();
          this.setState({ modal: false });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  onBtnCancel = () => {
    this.setState({ isEdit: false, editItem: {} });
  };

  onBtnDelete = id => {
    Axios.delete(urlApi + "/product/deleteproduct/" + id)
      .then(res => {
        swal("Product Deleted", res.data, "success");
        this.getDataApi();
      })
      .catch(err => console.log(err));
  };

  renderJsx = () => {
    var arrSearch = this.state.rows.filter(val => {
      return (
        val.product_name.toLowerCase().startsWith(this.state.searchData) &&
        (parseInt(val.idcat) === parseInt(this.state.filterCategory) ||
          this.state.filterCategory > 5) &&
        (parseInt(val.idsub) === parseInt(this.state.filterSub) ||
          this.state.filterSub > 3)
      );
    });
    var jsx = arrSearch
      .slice(
        this.state.page * this.state.rowsPerPage,
        this.state.page * this.state.rowsPerPage + this.state.rowsPerPage
      )
      .map(val => {
        return (
          <TableRow key={val.id}>
            <TableCell>{val.id}</TableCell>
            <TableCell component="th" scope="row">
              {val.product_name}
            </TableCell>
            <TableCell>{formatMoney(val.price)}</TableCell>
            <TableCell>{val.discount}%</TableCell>
            <TableCell>{val.category}</TableCell>
            <TableCell>{val.subcategory}</TableCell>
            <TableCell>
              <img
                src={`http://localhost:2000/${val.image}`}
                width="50px"
                alt="..."
              />
            </TableCell>
            <TableCell>
              <Button
                animated
                color="teal"
                onClick={() => this.setState({ modal: true, editItem: val })}
              >
                <Button.Content visible>Edit </Button.Content>
                <Button.Content hidden>
                  <Icon name="edit" />
                </Button.Content>
              </Button>
              <Button
                animated
                color="red"
                onClick={() => this.onBtnDelete(val.id)}
              >
                <Button.Content visible>Delete</Button.Content>
                <Button.Content hidden>
                  <Icon name="delete" />
                </Button.Content>
              </Button>
            </TableCell>
          </TableRow>
        );
      });
    return jsx;
  };

  DropdownCategory = () => {
    var jsx = this.state.category.map(val => {
      return <option value={val.id}>{val.category}</option>;
    });
    return jsx;
  };

  DropdownSubcategory = () => {
    var jsx = this.state.subcategory.map(val => {
      return <option value={val.id}>{val.subcategory}</option>;
    });
    return jsx;
  };

  render() {
    const { classes } = this.props;
    const { rows, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    var arrSearch = this.state.rows.filter(val => {
      return (
        val.product_name.toLowerCase().startsWith(this.state.searchData) &&
        (parseInt(val.idcat) === parseInt(this.state.filterCategory) ||
          this.state.filterCategory > 5) &&
        (parseInt(val.idsub) === parseInt(this.state.filterSub) ||
          this.state.filterSub > 3)
      );
    });

    if (this.props.role === "admin") {
      return (
        <div className="container">
          <h2>Manage Product</h2>
          <div className="row justify-content-center mb-3">
            <div className="col-md-3">
              <input
                type="text"
                ref="inputsearch"
                placeholder="Search Product"
                className="form-control"
              />
            </div>
            <div className="col-md-2">
              <select
                ref="dropdown"
                defaultValue={
                  this.state.filterCategory ? this.state.filterCategory : 6
                }
                onChange={() => {
                  this.pushUrl();
                  this.setState({ filterCategory: this.refs.dropdown.value });
                }}
                className="form-control"
              >
                <option value={6}>All Categories </option>
                {this.DropdownCategory()}
              </select>
            </div>
            <div className="col-md-2">
              <select
                ref="subcat"
                defaultValue={this.state.filterSub ? this.state.filterSub : 4}
                onChange={() => {
                  this.pushUrl();
                  this.setState({ filterSub: this.refs.subcat.value });
                }}
                className="form-control"
              >
                <option value={4}>All Subcategories </option>
                {this.DropdownSubcategory()}
              </select>
            </div>
            <div className="col-md-1" style={{ marginTop: "-5px" }}>
              <input
                type="button"
                onClick={this.onBtnSearchClick}
                className="btn btn-info"
                value="search"
              />
            </div>
          </div>
          <Paper className={classes.root}>
            <div className={classes.tableWrapper}>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      ID
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      NAMA
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      HARGA
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      DISC
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      CAT
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      SUB
                    </TableCell>
                    <TableCell style={{ fontSize: "20px", fontWeight: "600" }}>
                      IMG
                    </TableCell>
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
                      count={arrSearch.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      SelectProps={{
                        native: true
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
          <div className="row mt-5 mb-2">
            <div className="col-md-4">
              <input
                className="form-control mb-1"
                ref="nama"
                type="text"
                placeholder="Masukkan nama barang"
              />
              <input
                className="form-control mb-1"
                ref="harga"
                type="number"
                placeholder="Masukkan harga barang"
              />
              <input
                className="form-control mb-1"
                ref="diskon"
                type="number"
                placeholder="Masukkan diskon barang"
              />
            </div>
            <div className="col-md-4">
              <select ref="kategori" className="form-control">
                {this.DropdownCategory()}
              </select>
              <select ref="subkategori" className="form-control">
                {this.DropdownSubcategory()}
              </select>
              <textarea
                className="form-control mb-1"
                ref="deskripsi"
                rows="3"
                placeholder="Masukkan deskripsi"
              />
            </div>
            <div className="col-md-3">
              <input
                style={{ display: "none" }}
                ref="input"
                type="file"
                onChange={this.onChangeHandler}
              />
              <input
                type="button"
                className="form-control btn-success mb-1"
                onClick={() => this.refs.input.click()}
                value={this.valueHandler()}
              />
              <input
                type="button"
                className="form-control btn-primary mb-1"
                onClick={this.onBtnAdd}
                value="Add Data"
              />
              {this.state.error ? (
                <p style={{ color: "red" }}>{this.state.error}</p>
              ) : null}
            </div>
          </div>
          {/* EDIT PRODUCT */}
          <div>
            <Modal
              isOpen={this.state.modal}
              toggle={() => this.setState({ modal: false })}
              className={this.props.className}
            >
              <ModalHeader toggle={() => this.setState({ modal: false })}>
                Edit Produk ~ {this.state.editItem.product_name}
              </ModalHeader>
              <ModalBody>
                <div className="row">
                  <div className="col-md-3">
                    <img
                      src={"http://localhost:2000/" + this.state.editItem.image}
                      width="100%"
                      alt="broken"
                    />
                    <input
                      type="file"
                      onChange={this.onChangeHandlerEdit}
                      style={{ display: "none" }}
                      ref="inputEdit"
                    />
                    <input
                      type="button"
                      value={this.valueHandlerEdit()}
                      className="btn btn-primary"
                      onClick={() => this.refs.inputEdit.click()}
                    />
                  </div>
                  <div className="col-md-9">
                    <input
                      type="text"
                      className="form-control"
                      ref="namaEdit"
                      defaultValue={this.state.editItem.product_name}
                    />
                    <input
                      type="number"
                      className="form-control mt-3"
                      ref="hargaEdit"
                      defaultValue={this.state.editItem.price}
                    />
                    <input
                      type="number"
                      className="form-control mt-3"
                      ref="diskonEdit"
                      defaultValue={this.state.editItem.discount}
                    />
                    <select
                      ref="kategoriEdit"
                      className="form-control mt-3"
                      defaultValue={this.state.editItem.idcat}
                    >
                      {this.DropdownCategory()}
                    </select>
                    <select
                      ref="subkategoriEdit"
                      className="form-control mt-3"
                      defaultValue={this.state.editItem.idsub}
                    >
                      {this.DropdownSubcategory()}
                    </select>
                    <textarea
                      className="form-control mt-3"
                      ref="deskripsiEdit"
                      defaultValue={this.state.editItem.deskripsi}
                      rows="3"
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={() => this.onBtnSave()}>
                  Save
                </Button>{" "}
                <Button
                  color="secondary"
                  onClick={() => this.setState({ modal: false })}
                >
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </div>
        </div>
      );
    } else {
      return <PageNotFound />;
    }
  }
}

CustomPaginationActionsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    role: state.user.role
  };
};

export default connect(mapStateToProps)(
  withStyles(styles)(CustomPaginationActionsTable)
);
