import React, { Component } from 'react';

class Carousel extends Component {
  render() {
      return (
        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
        <ol className="carousel-indicators">
          <li data-target="#carouselExampleIndicators" data-slide-to={0} className="active" />
          <li data-target="#carouselExampleIndicators" data-slide-to={1} />
          <li data-target="#carouselExampleIndicators" data-slide-to={2} />
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img className="d-block w-100" src="https://ksassets.timeincuk.net/wp/uploads/sites/54/2018/06/DfXNOZrXkAE1bJh.jpg" alt="First slide" />
            <div className="carousel-caption d-none d-md-block">
              <h3>Devil May Cry 5</h3>
              <p></p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://cdn.wccftech.com/wp-content/uploads/2016/07/zelda-breath-of-the-wild.jpg" alt="Second slide" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Legend Of Zelda : Breath of The Wild</h5>
              <p>...</p>
            </div>
          </div>
          <div className="carousel-item">
            <img className="d-block w-100" src="https://hdqwalls.com/download/monster-hunter-world-hd-h6-1280x720.jpg" alt="Third slide" />
            <div className="carousel-caption d-none d-md-block">
              <h5>Monster Hunter World</h5>
              <p>...</p>
            </div>
          </div>
        </div>
        <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="sr-only">Previous</span>
        </a>
        <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="sr-only">Next</span>
        </a>
      </div>
      )
   
  }
}


export default Carousel;