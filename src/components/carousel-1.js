import React, { Component } from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from 'mdbreact';
import {Link} from 'react-router-dom'

class Carousel extends Component {
  render() {
      return (
          <MDBCarousel
            activeItem={1}
            length={3}
            showControls={true}
            showIndicators={true}
            className="z-depth-1"
          >
            <MDBCarouselInner>
              <MDBCarouselItem itemId="1">
                <MDBView>
                  <img
                    className="d-block"
                    src="https://wallpapersmug.com/download/2560x1080/5a0a1b/spider-man-ps4-4k.jpg"
                    alt="First slide"
                    width='1270px'
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <h1 style={{position:"absolute", left:'0px', bottom:'150px', fontFamily: 'Viga'}}>Spiderman</h1>
                  <h3 style={{position:"absolute", left:'0px', bottom:'120px', fontFamily: 'Viga'}}>Rp 495.000,00</h3>
                  <Link to='/product-detail/37'><input type='button' className='btn blue-gradient rounded-pill text-light' style={{position:"absolute", left:'0px', bottom:'50px'}} value='See Product'/></Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="2">
                <MDBView>
                  <img
                    className="d-block"
                    src="https://live.staticflickr.com/1932/43650622460_dcf9dc4319_b.jpg"
                    alt="Second slide"
                    
                    width='1270px'
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <h1 style={{position:"absolute", left:'0px', bottom:'150px',fontFamily: 'Viga'}}>Red Dead Redemption 2</h1>
                  <h3 style={{position:"absolute", left:'0px', bottom:'120px',fontFamily: 'Viga'}}>Rp488.750,00</h3>
                  <Link to='/product-detail/7'><input type='button' className='btn blue-gradient rounded-pill text-light' style={{position:"absolute", left:'0px', bottom:'50px'}} value='See Product'/></Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>
              <MDBCarouselItem itemId="3">
                <MDBView>
                  <img
                    className="d-block"
                    src="https://hdwallpaper20.com/wp-content/uploads/data/2018/3/3/The-Witcher-3-Game-Wallpaper-2017.jpg"
                    alt="Third slide"
                    width='1270px'
                  />
                </MDBView>
                <MDBCarouselCaption>
                  <h1 style={{position:"absolute", left:'0px', bottom:'150px', fontFamily: 'Viga'}}>The Witcher 3 : Wild Hunt</h1>
                  <h3 style={{position:"absolute", left:'0px', bottom:'120px', fontFamily: 'Viga'}}>Rp427.500,00</h3>
                  <Link to='/product-detail/36'><input type='button' className='btn blue-gradient rounded-pill text-light' style={{position:"absolute", left:'0', bottom:'50px'}} value='See Product'/></Link>
                </MDBCarouselCaption>
              </MDBCarouselItem>
            </MDBCarouselInner>
          </MDBCarousel>
    
      )}
}


export default Carousel;