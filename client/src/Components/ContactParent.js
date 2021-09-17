import React, { Component } from 'react';
import Contact from './Contact';
import FilledNavBar from './FilledNavBar';
import Footer from './Footer';
class ContactParent extends Component {
    render() {
        return (
            <div>
                <FilledNavBar/>
                <Contact/>
                <Footer/>
            </div>
        );
    }
}
export default ContactParent;