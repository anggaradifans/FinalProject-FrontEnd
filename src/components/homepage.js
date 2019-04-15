import React from 'react'
// import { Card, Button, CardImg, CardTitle, CardText, CardGroup,CardBody  } from 'reactstrap';
// import {Link} from 'react-router-dom'
import Carousel from './carousel'
import Hover from './hover';
import GreatDeal from './greatDeal';


class Homepage extends React.Component{
    render (){
        return (
        <div className="container">    
          <div className="row justify-content-center">
            <Carousel/>
          </div>
          <div className="ml-1 mt-5 mb-5"> 
            <h1 className='blue-gradient text-white rounded-pill shadow-lg' style={{textAlign:"center"}}> Welcome to Walaoeh Games </h1>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Great Deals</h2>            
            <hr/>
            <GreatDeal/>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Our Products</h2>
            <hr/>
          </div>
          <Hover/>
        </div>
        )
    }
}


export default Homepage;