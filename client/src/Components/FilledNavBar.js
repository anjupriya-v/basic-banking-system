import React, { Component } from 'react';
import image from '../Images/bank_48px.png';
import '../App.css'
import { Link } from 'react-router-dom'  
class FilledNavBar extends Component {
  constructor(props) {
    super(props);
    this.state={
      navLinkColor:{
        color:'white'
      }
    }
  }
    render() {
        return (
        <nav className='fillBackground navbar navbar-expand-lg navbar-light  fixed-top'>
  <div className="container">
   <img src={image} className="navbar-brand" alt="logo"></img>
   <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
     <span className="navbar-toggler-icon"></span>
   </button>
   <div className="collapse navbar-collapse " id="navbarText">
   <span className="navbar-brand " style={this.state.navLinkColor}  >APV Bank Ltd</span>
     <ul className="navbar-nav ml-auto">
     <li className="nav-item navText">
         <Link  className="nav-link " style={this.state.navLinkColor}  to="/">Home</Link>
       </li>
       <li className="nav-item">
   <Link  className="nav-link " style={this.state.navLinkColor} to="/aboutParent">About</Link>
       </li>
       <li className="nav-item">
         <Link  to="/contactParent" className="nav-link " style={this.state.navLinkColor}>Contact</Link>
       </li>
       </ul>
   </div>
   </div>
 </nav>
        );
    }
}
export default FilledNavBar;