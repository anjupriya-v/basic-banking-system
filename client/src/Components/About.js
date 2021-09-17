import React, { Component } from 'react';
import image from '../Images/Bank_Image.jpg'
class About extends Component {
    render() {
        return (
            <div id="ourServices" >
                <h1 className="secondHeading">About</h1>
                <div className="container aboutContent" >
                    <div className="row">
                        <div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 aboutImage">
                            <img src={image} width="100%" height="auto" alt="bank" />
                        </div>
                        <div className="col-lg-8 col-md-8 col-sm-12 col-xs-12 content" >
                            APV Bank Ltd., is the bank that serves transaction between multiple customers. We easily transact your money to another customer and keep your account details more secure.We have the services like   add or delete customers from our bank , transact money between multiple customers , after transaction you can view the transaction history.
                            <br />
                            <p style={{ textAlign: 'center' }}><b>Email  :</b>apv@gmail.com</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default About;