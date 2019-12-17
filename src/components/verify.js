import React from "react";
import queryString from "query-string";
import Axios from "axios";
import swal from "sweetalert";

class Verify extends React.Component {
  componentDidMount() {
    this.verification();
  }

  verification = () => {
    var params = queryString.parse(this.props.location.search);
    Axios.put("http://localhost:2000/user/verifyuser", {
      username: params.username,
      password: params.password
    })
      .then(res => swal("Success", res.data, "success"))
      .catch(err => console.log(err));
  };

  render() {
    return <div className="container">Email Berhasil di verifikasi</div>;
  }
}

export default Verify;
