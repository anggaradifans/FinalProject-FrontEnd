import React,  { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem} from 'reactstrap';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux'
import {resetUser, resetCount, getSearchData} from './../1.actions'
import cookie from 'universal-cookie'
import './../support/css/style.css'

const objCookie = new cookie()
class HeaderKu extends Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
        isOpen: false
      };
    }
    toggle() {
       this.setState({
         isOpen: !this.state.isOpen
       });
    }

    state = {
        searchData : ''
    }

    valueHandler = () => {
        this.setState({searchData : this.refs.searchBook.value})
    }
    onBtnSearch = () => {
        this.props.getSearchData(this.state.searchData.toLowerCase())
    }

    onBtnLogOut = () => {
        objCookie.remove('userData')
        this.props.resetUser()
        this.props.resetCount()
    }

    render(){ 
            if(this.props.username === ""){
                return(
                    <div style={{marginBottom:"70px", marginTop:"-15px"}}>
                        <Navbar className="mdb-color darken-3" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" style={{fontFamily: 'Viga', fontSize:'30px'}}><Link to='/'><img src="http://localhost:2000/upload/LogoNavbar.png" alt="brand" width="40px" />GamersLab</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                    <div className="input-group mt-1" style={{width:"350px"}}>
                                        <input type="text" ref="searchBook" onChange={() => this.setState({searchData:this.refs.searchBook.value})} className="form-control" placeholder="Enter keywords..." style={{fontFamily:'Roboto'}}/>
                                        <div className="input-group-append " style={{marginTop:"-6px", height:"42px"}}>
                                        <Link to={'/search?q='+this.state.searchData}><button className="btn blue-gradient mb-1" type="button" id="button-addon2" style={{height:"35px"}} onClick ={this.onBtnSearch}><i className="fas fa-search" /></button></Link>
                                        </div>
                                    </div> 
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/register"><NavLink className="btn blue-gradient rounded-pill text-light mr-1 btn-sm" style={{fontSize:"12px"}}><i className="fas fa-user-plus" />Register</NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                        <Link to="/login"><NavLink className="btn blue-gradient rounded-pill text-light btn-sm" style={{fontSize:"12px"}}><i className="fas fa-sign-in-alt" /> Login</NavLink></Link>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                )
            } else {
                return(
                    <div style={{marginBottom:"70px", marginTop:"-15px"}}>
                        <Navbar className="mdb-color darken-3" light expand="md" fixed="top">
                        <NavbarBrand className="ml-2" style={{fontFamily: 'Viga', fontSize:'30px'}}><Link to='/'><img src="http://localhost:2000/upload/LogoNavbar.png" alt="brand" width="40px" />GamersLab</Link> </NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                    <div className="input-group mt-2" style={{width:"350px"}}>
                                        <input type="text" ref="searchBook" className="form-control" onChange ={this.valueHandler} placeholder="Enter keywords... " style={{fontFamily:'Roboto'}} />
                                        <div className="input-group-append mr-2" style={{marginTop:"-6px", height:"42px"}}>
                                        { this.state.searchData ? 
                                            <Link to={'/search?q='+this.state.searchData}><button className="btn blue-gradient mb-1" type="button" id="button-addon2" style={{height:"35px"}} onClick ={this.onBtnSearch}><i className="fas fa-search" /></button></Link>
                                         : <button className="btn blue-gradient mb-1" type="button" id="button-addon2" style={{height:"35px"}}><i className="fas fa-search" /></button>}
                                        </div>
                                    </div> 
                                    </NavItem>
                                    <NavItem style={{marginLeft:"10px"}}>
                                        <NavLink style={{color:"white", marginTop:"5px", fontFamily:'Roboto'}}> Hello, {this.props.username} </NavLink>
                                    </NavItem>
                                    <UncontrolledDropdown  nav inNavba style={{marginRight:"10px"}}>
                                        <DropdownToggle style={{color:"white",  marginTop:"5px", fontFamily:'Roboto'}} nav caret>
                                        Menu
                                        </DropdownToggle>
                                        <DropdownMenu right>
                                        {this.props.role === 'admin' ?
                                        <Link to="/manage"><DropdownItem>
                                        Manage Products
                                        </DropdownItem></Link>
                                         : null
                                        }
                                        {this.props.role === 'admin' ?
                                        <Link to="/category"><DropdownItem>
                                        Manage Category
                                        </DropdownItem></Link>
                                        : null
                                        }
                                        <DropdownItem>
                                            Edit Profile
                                        </DropdownItem>
                                        <DropdownItem divider />
                                        {this.props.role === 'admin' ?
                                        <Link to='/annualreport'><DropdownItem>
                                        Annual Report
                                        </DropdownItem></Link>
                                        : <Link to='/history'><DropdownItem>
                                            Transaction History
                                        </DropdownItem>
                                        </Link>
                                        }
                                        
                                        <Link to='/'><DropdownItem onClick={this.onBtnLogOut}>
                                            Logout
                                        </DropdownItem>
                                        </Link>
                                        </DropdownMenu>
                                    </UncontrolledDropdown>
                                    <NavItem>
                                        <Link to="/cart"><NavLink className="notification" style={{color:"white"}}><i class="fas fa-shopping-cart"></i> {this.props.cart ? this.props.cart : null} </NavLink></Link>
                                    </NavItem>
                                    <NavItem>
                                    <Link to='/wishlist'><NavLink className="wishlist" style={{color:"white"}}><i class="fas fa-heart"></i></NavLink></Link>
                                    </NavItem>
                                    {this.props.role === 'admin' ? 
                                    <NavItem>
                                    <Link to='/transactions'><NavLink className="transactions" style={{color:"white"}}><i class="fas fa-bell"></i> {this.props.transactions ? this.props.transactions : null} </NavLink></Link>
                                    </NavItem> :  <NavItem>
                                    <Link to='/paymentlist'><NavLink className="transactions" style={{color:"white"}}><i class="fas fa-bell"></i></NavLink></Link>
                                    </NavItem>
                                    }
                                    
                                </Nav>
                            </Collapse>
                        </Navbar>
                    </div>
                );
            }
        }
}

const mapStateToProps = (state) => {
    return {
        username : state.user.username,
        role : state.user.role,
        cart : state.cart.cart,
        search : state.search.searchData,
        transactions : state.trans.transactions
    
    }
}



export default connect(mapStateToProps,{resetUser, resetCount, getSearchData})(HeaderKu);