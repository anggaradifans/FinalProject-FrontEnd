import React from 'react'
import {Link} from 'react-router-dom'


class Hover extends React.Component{
    render(){
        return (
            <div>
                <div className='row justify-content-center mb-5'>
                    <div className='col-md-4'>
                    <Link to='/products?cat=1&sub=1'><div className="view overlay img">
                      <img src="http://localhost:2000/upload/PRD-1554470593046.jpeg" className="img-fluid" alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">PS4 Videogames</h2>
                        </div>
                    </div></Link>
                    </div>
                    <div className='col-md-4'>
                    <Link to='/products?cat=1&sub=2'>
                    <div className="view overlay img">
                        <img src="https://static.gamespot.com/uploads/scale_medium/1197/11970954/3181241-ig-lozbreathofthewildrelease-20170112.jpg" className="img-fluid " alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">Nintendo Switch Videogames</h2>
                        </div>
                    </div></Link>
                    </div>
                    <div className='col-md-4'>
                    <Link to ='/products?cat=2'>
                    <div className="view overlay img" style={{height:"350px"}}>
                        <img src="https://media.playstation.com/is/image/SCEA/playstation-4-slim-vertical-product-shot-01-us-07sep16?$native_t$" className="img-fluid " alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">Videogame Hardware</h2>
                        </div>
                    </div></Link>
                    </div>
                </div>
                <div className='row justify-content-center mb-5'>
                    <div className='col-md-4'>
                    <Link to ='/products?cat=3&sub=1'>
                    <div className="view overlay img">
                        <img src="https://i5.walmartimages.com/asr/d13833ca-4add-4edf-b209-c822fbb45581_1.9ea3f2cadb7d3705738743f32668e86d.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF" className="img-fluid " alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">PS4 Accessories</h2>
                        </div>
                    </div></Link>
                    </div>
                    <div className='col-md-4'>
                    <Link to='/products?cat=3&sub=2'>
                    <div className="view overlay img">
                        <img src="https://gd.image-gmkt.com/NINTENDO-SWITCH-ACCESSORIES-CONTROLLER-HANDLE-MULTIFUNCTIONAL/li/409/865/1220865409.g_400-w_g.jpg" className="img-fluid " alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">Nintendo Switch Accessories</h2>
                        </div>
                    </div></Link>
                    </div>
                    <div className='col-md-4'>
                    <Link to='/products?cat=4'>
                    <div className="view overlay img">
                        <img src="https://steamstore-a.akamaihd.net/public/images/gift/steamcards_cards_02.png" className="img-fluid " alt=" ..." />
                        <div className="mask flex-center rgba-stylish-strong">
                        <h2 className="white-text">Digital Gift Voucher</h2>
                        </div>
                    </div></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Hover;