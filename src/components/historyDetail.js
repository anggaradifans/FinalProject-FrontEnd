import React from "react";
import Axios from "axios";
import { connect } from "react-redux";
import { urlApi } from "./../support/urlApi";
import { Link } from "react-router-dom";

class HistoryDetail extends React.Component {
  state = { rows: [] };

  componentDidMount() {
    this.getDataApi();
  }
  getDataApi = () => {
    var idUrl = this.props.match.params.id;
    Axios.get(urlApi + "/trans/transdetail/" + idUrl)
      .then(res => {
        this.setState({ rows: res.data });
      })
      .catch(err => console.log(err));
  };

  renderJsx = () => {
    var detail = this.state.rows.map((val, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{val.product_name}</td>
          <td>{val.quantity}</td>
          <td>Rp. {val.price},00</td>
        </tr>
      );
    });
    return detail;
  };

  render() {
    return (
      <div className="container">
        <table className=" table table-responsive table-hover">
          <thead>
            <tr>
              <td>No</td>
              <td>Nama Produk</td>
              <td>Quantity</td>
              <td>Harga</td>
            </tr>
          </thead>
          <tbody>{this.renderJsx()}</tbody>
        </table>
        <Link to={"/history"}>
          <input
            type="button"
            className="btn btn-success"
            value="Back to Previous Menu"
          />
        </Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.user.username,
    id: state.user.id,
    cart: state.cart.cart
  };
};

export default connect(mapStateToProps)(HistoryDetail);
