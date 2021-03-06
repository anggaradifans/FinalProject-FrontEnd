import React from "react";
import Axios from "axios";
import { urlApi } from "../support/urlApi";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function formatMoney(number) {
  return number.toLocaleString("in-RP", { style: "currency", currency: "IDR" });
}

class PaymentList extends React.Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    Axios.get(urlApi + "/trans/translist/" + this.props.id)
      .then(res => {
        this.setState({ data: res.data });
      })
      .catch(err => console.log(err));
  };

  renderJsx = () => {
    var jsx = this.state.data.map((val, index) => {
      return (
        <tr>
          <td>{index + 1}</td>
          <td>{val.tanggal_checkout}</td>
          <td>{val.jumlah_item}</td>
          <td>{formatMoney(val.totalharga)}</td>
          <td>{val.order_number}</td>
          <td>{val.status}</td>
          <Link to={"/payment/" + val.order_number}>
            <input type="button" className="btn btn-success" value="Detail" />
          </Link>
        </tr>
      );
    });
    return jsx;
  };

  render() {
    return (
      <div className="container">
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">Tanggal Checkout</th>
              <th scope="col">Jumlah Item</th>
              <th scope="col">Total Harga</th>
              <th scope="col">No Invoice</th>
              <th scope="col">Status</th>
              <th scope="col">Detail Transaksi</th>
            </tr>
          </thead>
          <tbody>{this.renderJsx()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    id: state.user.id
  };
};

export default connect(mapStateToProps)(PaymentList);
