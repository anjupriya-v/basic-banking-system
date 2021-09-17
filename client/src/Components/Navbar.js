import React from 'react';
import { useState } from 'react';
import image from '../Images/bank_48px.png';
const Navbar=(props)=>{
    const [colorChange, setColorchange] = useState(false);
    const [color]=useState({color:'white'})
    const changeNavbarColor = () =>{
       if(window.scrollY >= 20){
         setColorchange(true);
       }
       else{
         setColorchange(false);
       }
    };
    window.addEventListener('scroll', changeNavbarColor);
    return (
        <nav className={colorChange?'fillBackground navbar navbar-expand-lg navbar-light  fixed-top':'navbar navbar-expand-lg navbar-light  fixed-top transparentBackground'} >
        <div className="container">
         <a className="navbar-brand" href="#"><img src={image} alt="logo"></img></a>
         <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
           <span className="navbar-toggler-icon"></span>
         </button>
         <div className="collapse navbar-collapse " id="navbarText">
         <a className="navbar-brand " style={color}  href="#">APV Bank Ltd</a>
           <ul className="navbar-nav ml-auto">
           <li className="nav-item navText">
               <span className="nav-link " style={color}   onClick={props.scrolltoHomeFunction}>Home  </span>
             </li>
             <li className="nav-item">
             <span  className="nav-link " style={color} data-toggle="collapse" data-target=".navbar-collapse.show" onClick={props.scrolltoAboutFunction}>About</span>
             </li>
             <li className="nav-item">
            <span  className="nav-link " style={color} data-toggle="collapse" data-target=".navbar-collapse.show" onClick={props.scrolltoContactFunction}>Contact</span>
             </li>
             </ul>
         </div>
         </div>
       </nav>
    );
}
export default Navbar;