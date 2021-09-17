import React, { Component } from 'react';
import image from '../Images/bank_48px.png'
class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="text-center text-white" >
          <div className="container pt-4">
            <section className="mb-4">
              <h4 className="followHeading">Follow us on</h4>
              <a
                className="btn btn-link btn-floating btn-lg text-dark"
                href="https://facebook.com"
                role="button"
                data-mdb-ripple-color="dark"
              ><i className="fa fa-facebook icon"></i
              ></a>
              <a
                className="btn btn-link btn-floating btn-lg text-dark"
                href="https://instagram.com"
                role="button"
                data-mdb-ripple-color="dark"
              ><i className="fa fa-instagram icon"></i
              ></a>
              <a
                className="btn btn-link btn-floating btn-lg text-dark"
                href="https://linkedin.com"
                role="button"
                data-mdb-ripple-color="dark"
              ><i className="fa fa-linkedin icon"></i
              ></a>
              <a
                className="btn btn-link btn-floating btn-lg text-dark"
                href="https://twitter.com"
                role="button"
                data-mdb-ripple-color="dark"
              ><i className="fa fa-twitter icon"></i
              ></a>
            </section>
          </div>
          <div className="text-center p-3" className="bankContent">
            <img src={image} alt="logo"></img>
            <h4 className="text-white bankText">APV Bank Ltd</h4>
          </div>
        </footer>
      </div>
    );
  }
}
export default Footer;