import React from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import { urlApi } from "./../support/urlApi";

function formatMoney(number) {
  return number.toLocaleString("in-RP", { style: "currency", currency: "IDR" });
}

class BestSeller extends React.Component {
  state = { listProduct: [], cart: 0 };

  componentDidMount() {
    this.getDataProduct();
  }

  getDataProduct = () => {
    axios
      .get(urlApi + "/data/bestsellers")
      .then(res => this.setState({ listProduct: res.data }))
      .catch(err => console.log(err));
  };

  renderJsx = () => {
    var jsx = this.state.listProduct.map(val => {
      return (
        <div className="card">
          <Link to={"/product-detail/" + val.id}>
            <img
              src={`http://localhost:2000/${val.image}`}
              style={{ width: "250px", height: "250px" }}
              className="card-img-top img"
              alt="Card cap"
            />
          </Link>
          {val.discount > 0 ? (
            <div className="discount" style={{ right: "100px" }}>
              {val.discount}%
            </div>
          ) : null}
          <div
            className="kategori"
            style={{
              right: "100px",
              width: "150px",
              bottom: "10px",
              height: "20px",
              fontSize: "17px"
            }}
          >
            {formatMoney(val.price - val.price * (val.discount / 100))}
          </div>
        </div>
      );
    });
    return jsx;
  };

  render() {
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "60px",
      slidesToShow: 3,
      speed: 500
    };
    return (
      <div style={{ width: "100%" }}>
        <Slider {...settings}>{this.renderJsx()}</Slider>
      </div>
    );
  }
}

export default BestSeller;
