import React from 'react'
import { Card, Button, CardImg, CardTitle, CardText, CardGroup,CardBody  } from 'reactstrap';
import {Link} from 'react-router-dom'
import Carousel from './carousel'

class Homepage extends React.Component{
    render (){
        return (
        <div className="container">    
          <div className="row justify-content-center">
            <Carousel/>
          </div>
          <div className="container mt-5 mb-5"> 
            <h1 style={{textAlign:"center"}}> Selamat Datang di Online Game Shop kami </h1>
            <h2 style={{textAlign:"center", fontWeight:"700"}}>Produk Kami</h2>
          </div>
          <CardGroup>
            <Card>
                <CardImg top height="400px" width="100%" src="https://store.playstation.com/store/api/chihiro/00_09_000/container/ID/en/19/UP0102-CUSA08216_00-ASIAFULLGAME0000/1552021784000/image?w=360&h=360&bg_color=000000&opacity=100&_version=00_09_000" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Videogame </CardTitle>
                  <CardText>Kami menjual videogame dari konsol ternama (PS4, Switch)</CardText>
                  <Link to='/products'><Button>Go to Videogame Software Section</Button></Link>
                </CardBody>
            </Card>
            <Card>
                <CardImg top height="500px" width="100%" src="https://image.tmdb.org/t/p/w1280/y31QB9kn3XSudA15tV7UWQ9XLuW.jpg" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Movie Database</CardTitle>
                  <CardText>Anda bisa mencari film favoritmu disini</CardText>
                  <Link to='/search'><Button>Go to Our Movie Database</Button></Link>
                </CardBody>
            </Card>
            <Card>
                <CardImg top width="100%" src="https://media.playstation.com/is/image/SCEA/playstation-4-slim-vertical-product-shot-01-us-07sep16?$native_t$" alt="Card image cap" />
                <CardBody>
                  <CardTitle>Videogame Console</CardTitle>
                  <CardText>Kami menjual konsole videogame seperti PS4 dan Nintendo Switch</CardText>
                  <Button>Go to Videogame Hardware Section</Button>
                </CardBody>
            </Card>
          </CardGroup>
        </div>
        )
    }
}


export default Homepage;