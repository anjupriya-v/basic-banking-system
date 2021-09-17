import React, { Component } from 'react';
import About from './About';
import FilledNavBar from './FilledNavBar';
class AboutParent extends Component {
    render() {
        return (
            <div >
                <FilledNavBar/>
               <div className="cardContainer">     <About/></div>
            </div>
        );
    }
}
export default AboutParent;