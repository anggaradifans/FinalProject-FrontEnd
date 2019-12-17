import React from "react";
import Axios from "axios";
import { urlApi } from "./../support/urlApi";
import swal from "sweetalert";

class ManageCategory extends React.Component {
  state = {
    category: [],
    subcategory: [],
    isEditCat: 0,
    isEditSub: 0,
    editItem: {}
  };

  componentDidMount() {
    this.getCategory();
    this.getSubcategory();
  }

  //================================GET DATA==================

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

  // =============================ADD DATA=====================
  onBtnAddCat = () => {
    var newData = {
      category: this.refs.kategori.value
    };
    Axios.post(urlApi + "/category/addcategory", newData)
      .then(res => {
        swal("Success", res.data, "success");
        this.getCategory();
      })
      .catch(err => console.log(err));
  };

  onBtnAddSub = () => {
    var newData = {
      subcategory: this.refs.subkategori.value
    };
    Axios.post(urlApi + "/category/addsubcat", newData)
      .then(res => {
        swal("Success", res.data, "success");
        this.getSubcategory();
      })
      .catch(err => console.log(err));
  };
  // =============EDIT DATA=====================

  onBtnSaveCat = id => {
    Axios.put(urlApi + "/category/editcat/" + id, {
      category: this.refs.editcat.value
    })
      .then(res => {
        swal("Success", res.data, "success");
        this.setState({ isEditCat: 0 });
        this.getCategory();
      })
      .catch(err => console.log(err));
  };

  onBtnSaveSub = id => {
    Axios.put(urlApi + "/category/editsub/" + id, {
      subcategory: this.refs.editsub.value
    })
      .then(res => {
        swal("Success", res.data, "success");
        this.setState({ isEditSub: 0 });
        this.getSubcategory();
      })
      .catch(err => console.log(err));
  };

  //========================DELETE DATA====================================

  onBtnDeleteCat = id => {
    Axios.delete(urlApi + "/category/deletecat/" + id)
      .then(res => {
        swal("Success", res.data, "success");
        this.getCategory();
      })
      .catch(err => {
        console.log(err);
      });
  };

  onBtnDeleteSub = id => {
    Axios.delete(urlApi + "/category/deletesub/" + id).then(res => {
      swal("Success", res.data, "success");
      this.getSubcategory();
    });
  };

  renderCategory = () => {
    var jsx = this.state.category.map((val, index) => {
      if (val.id === this.state.isEditCat) {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>
              <input
                type="text"
                ref="editcat"
                className="form-control"
                defaultValue={val.category}
              />
            </td>
            <td>
              <input
                type="button"
                className="btn btn-sm btn-success mr-3"
                value="Save"
                onClick={() => this.onBtnSaveCat(val.id)}
              />
              <input
                type="button"
                className="btn btn-sm btn-danger"
                value="cancel"
                onClick={() => this.setState({ isEditCat: 0 })}
              />
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{val.category}</td>
          <td>
            <input
              type="button"
              className="btn btn-sm btn-primary mr-3"
              value="Edit"
              onClick={() => this.setState({ isEditCat: val.id })}
            />
            <input
              type="button"
              className="btn btn-sm btn-danger"
              value="Delete"
              onClick={() => this.onBtnDeleteCat(val.id)}
            />
          </td>
        </tr>
      );
    });
    return jsx;
  };

  renderSubcategory = () => {
    var jsx = this.state.subcategory.map((val, index) => {
      if (val.id === this.state.isEditSub) {
        return (
          <tr>
            <th scope="row">{index + 1}</th>
            <td>
              <input
                type="text"
                ref="editsub"
                className="form-control"
                defaultValue={val.subcategory}
              />
            </td>
            <td>
              <input
                type="button"
                className="btn btn-sm btn-success mr-3"
                value="Save"
                onClick={() => this.onBtnSaveSub(val.id)}
              />
              <input
                type="button"
                className="btn btn-sm btn-danger"
                value="cancel"
                onClick={() => this.setState({ isEditSub: 0 })}
              />
            </td>
          </tr>
        );
      }
      return (
        <tr>
          <th scope="row">{index + 1}</th>
          <td>{val.subcategory}</td>
          <td>
            <input
              type="button"
              className="btn btn-sm btn-primary mr-3"
              onClick={() => this.setState({ isEditSub: val.id })}
              value="Edit"
            />
            <input
              type="button"
              className="btn btn-sm btn-danger"
              onClick={() => this.onBtnDeleteSub(val.id)}
              value="Delete"
            />
          </td>
        </tr>
      );
    });
    return jsx;
  };

  render() {
    return (
      <div className="container" style={{ fontFamily: "Roboto" }}>
        <div className="row justify-content-center">
          <div className="col-md-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Category</th>
                </tr>
              </thead>
              <tbody>{this.renderCategory()}</tbody>
            </table>
          </div>
          <div className="col-md-4">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Subcategory</th>
                </tr>
              </thead>
              <tbody>{this.renderSubcategory()}</tbody>
            </table>
          </div>
        </div>
        <h2 className="text-center">Add Category/Subcategory</h2>
        <div className="row justify-content-center mb-4">
          <div className="col-md-4">
            <input
              className="form-control mb-1"
              ref="kategori"
              type="text"
              placeholder="New Category"
            />
            <input
              className="form-control mb-1"
              ref="subkategori"
              type="text"
              placeholder="New Subcategory"
            />
          </div>
          <div className="col-md-3">
            <input
              type="button"
              className="btn form-control btn-primary mb-1"
              onClick={this.onBtnAddCat}
              value="Add Category"
            />
            <input
              type="button"
              className="btn form-control btn-primary mb-1"
              onClick={this.onBtnAddSub}
              value="Add SubCategory"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default ManageCategory;
