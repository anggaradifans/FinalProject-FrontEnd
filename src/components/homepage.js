import React from 'react'
// import { Card, Button, CardImg, CardTitle, CardText, CardGroup,CardBody  } from 'reactstrap';
// import {Link} from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Carousel from './carousel-1'
import Hover from './hover';
import GreatDeal from './greatDeal';
import BestSellers from './bestSellers'


class Homepage extends React.Component{
    render (){
        return (
        <div className="container">    
          <div className="row justify-content-center">
            <Carousel/>
          </div>
          <Fade>
          <div className="ml-1 mt-5 mb-5"> 
            <h1 className='mdb-color darken-3 text-white rounded-pill shadow-lg' style={{textAlign:"center"}}> Welcome to GamersLab </h1>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Great Deals</h2>            
            <hr/>
            <GreatDeal/>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Best Sellers</h2>            
            <hr/>
            <BestSellers/>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Our Products</h2>
            <hr/>
          </div>
          </Fade>
          <Fade>
          <Hover/>
          </Fade>
        </div>
        )
    }
}


export default Homepage;