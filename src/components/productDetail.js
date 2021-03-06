import React from "react";
import Axios from "axios";
import { urlApi } from "./../support/urlApi";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import swal from "sweetalert";
import { fnHitungCart } from "./../1.actions";

function formatMoney(number) {
  return number.toLocaleString("in-RP", { style: "currency", currency: "IDR" });
}

class ProductDetail extends React.Component {
  state = { product: {}, cart: 0, ToCart: false, wishlist: false };

  componentDidMount() {
    this.getDataApi();
    this.getDataWishlist();
  }

  getDataApi = () => {
    var idUrl = this.props.match.params.id;
    Axios.get(urlApi + "/product/product-detail/" + idUrl)
      .then(res => {
        this.setState({ product: res.data[0] });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getDataWishlist = () => {
    var idUrl = this.props.match.params.id;
    Axios.get(urlApi + `/product/wl?iduser=${this.props.id}&idproduk=${idUrl}`)
      .then(res => {
        console.log(res);
        if (res.data[0]) {
          this.setState({ wishlist: true });
        }
      })
      .catch(err => console.log(err));
  };

  proteksiJumlah = () => {
    if (this.refs.jumlah.value < 1) {
      this.refs.jumlah.value = 1;
    }
  };

  AddToWishlist = () => {
    var newData = {
      iduser: this.props.id,
      idproduk: this.state.product.id
    };
    Axios.post(urlApi + "/product/addtowl", newData)
      .then(res => {
        swal("Success", res.data, "success");
        if (this.state.wishlist === false) {
          this.setState({ wishlist: true });
        } else {
          this.setState({ wishlist: false });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  BuyNow = () => {
    var qty = this.refs.jumlah.value;
    var newData = {
      userId: this.props.id,
      productId: this.state.product.id,
      quantity: qty
    };
    Axios.post(urlApi + "/cart/addtocart", newData)
      .then(res => {
        swal("Thanks for the Purchase", res.data, "success");
        this.props.fnHitungCart(this.props.username);
        this.setState({ ToCart: true });
      })
      .catch(err => console.log(err));
  };

  onBtnCart = () => {
    var qty = this.refs.jumlah.value;
    var newData = {
      userId: this.props.id,
      productId: this.state.product.id,
      quantity: qty
    };
    Axios.post(urlApi + "/cart/addtocart", newData)
      .then(res => {
        swal("Thanks for the Purchase", res.data, "success");
        this.props.fnHitungCart(this.props.username);
      })
      .catch(err => console.log(err));
  };

  render() {
    var {
      product_name,
      image,
      discount,
      deskripsi,
      price
    } = this.state.product;
    if (this.state.ToCart) {
      return <Redirect to="/cart" />;
    }
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 mt-5 mb-5">
            <div className="card" style={{ width: "100%" }}>
              <img
                className="card-img-top"
                src={`http://localhost:2000/${image}`}
                alt="Card cap"
              />
            </div>
          </div>
          <div className="col-md-8 mt-5 mb-5">
            <h1 style={{ color: "#4C4C4C" }}>{product_name}</h1>
            {discount > 0 ? (
              <div
                style={{
                  backgroundColor: "#D50000",
                  width: "50px",
                  height: "22px",
                  color: "white",
                  textAlign: "center",
                  display: "inline-block"
                }}
              >
                {discount}%
              </div>
            ) : null}
            {discount > 0 ? (
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: "600",
                  color: "#606060",
                  marginLeft: "10px",
                  textDecoration: "line-through"
                }}
              >
                {formatMoney(price)}
              </span>
            ) : null}
            <div
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: "#FF5722",
                marginTop: "20px"
              }}
            >
              {formatMoney(price - price * (discount / 100))}{" "}
            </div>
            <div className="row">
              <div className="col-md-2">
                <div
                  style={{
                    marginTop: "10px",
                    color: "#606060",
                    fontWeight: "700",
                    fontSize: "14px"
                  }}
                >
                  Quantity
                </div>
                <input
                  type="number"
                  ref="jumlah"
                  min={1}
                  defaultValue={1}
                  className="form-control"
                  onChange={this.proteksiJumlah}
                  style={{ width: "60px", marginTop: "10px" }}
                />
              </div>
              {/* <div className="col-md-6">
                <div
                  style={{
                    marginTop: "10px",
                    color: "#606060",
                    fontWeight: "700",
                    fontSize: "14px"
                  }}
                >
                  Catatan untuk Penjual (Opsional)
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Contoh: Warna putih, Ukuran XL, Edisi ke-2"
                  style={{ marginTop: "13px" }}
                />
              </div> */}
            </div>
            <div className="row mt-4">
              <div className="col-md-8">
                <p
                  style={{
                    color: "#606060",
                    fontStyle: "italic",
                    fontFamily: "Lato"
                  }}
                >
                  {deskripsi}
                </p>
              </div>
            </div>

            {this.props.username !== "" ? (
              <div className="row mt-4">
                {this.state.wishlist ? (
                  <button
                    className="btn btn-light ml-3"
                    value="Add to Wishlist"
                    onClick={() => this.AddToWishlist()}
                  >
                    <i class="fas fa-heart" style={{ color: "red" }}></i>
                  </button>
                ) : (
                  <button
                    className="btn btn-deep-orange ml-3"
                    value="Add to Wishlist"
                    onClick={() => this.AddToWishlist()}
                  >
                    <i class="fas fa-heart"></i>
                  </button>
                )}

                <button
                  className="btn btn-danger ml-2"
                  onClick={() => this.BuyNow()}
                >
                  Buy Now
                </button>
                <input
                  type="button"
                  className="btn btn-success  ml-2"
                  value="Add to Cart"
                  onClick={() => this.onBtnCart()}
                />
              </div>
            ) : (
              <Link to="/login">
                <div className="row mt-4">
                  <input
                    type="button"
                    className="btn btn-outline-secondary col-md-2 ml-3"
                    value="Add to Wishlist"
                  />
                  <input
                    type="button"
                    className="btn btn-outline-danger col-md-3 ml-2"
                    value="Buy Now"
                  />
                  <input
                    type="button"
                    className="btn btn-outline-success col-md-3 ml-2"
                    value="Add to Cart"
                  />
                </div>
              </Link>
            )}
          </div>
        </div>
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

export default connect(mapStateToProps, { fnHitungCart })(ProductDetail);
