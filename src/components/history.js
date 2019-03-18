import React from 'react'
import Axios from 'axios';
import {connect} from 'react-redux'

class History extends React.Component{
    
    state = {rows : []}
    getDataApi = () => {
        Axios.get(urlApi + '/history?userId='+this.props.id)
            .then((res) => {
                console.log(res)
                this.setState({rows : res.data})
            })
            .catch((err) => console.log(err))
    }

    renderJsx = () => {
        var jsx = this.state.rows.map((val, index) => {
            return (
                <div>
                    <tr>
                        <th scope="row">{index+1}</th>
                        <td>{val.namaProduk}</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                </div>
            )
        })
    }

    
    render() {
        return (
            <table className="table table-hover">
                    <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Nama</th>
                        <th scope="col">Harga</th>
                        <th scope="col">Quantity</th>
                    </tr>
                    </thead>
                    <tbody>
                        {this.renderJsx()}
                    </tbody>
                </table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        id : state.user.id
    }
}

export default connect(mapStateToProps)(History)