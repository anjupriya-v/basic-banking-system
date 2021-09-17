import React, { Component } from 'react';
import Navbar from './Components/Navbar';
import axios from 'axios';
import About from './Components/About';
import './App.css';
import { Link } from 'react-router-dom'
import Contact from './Components/Contact';
import Footer from './Components/Footer';
import allCustomers from './Images/All_Customers.jpg';
import manageCustomers from './Images/Manage_Customers.jpg';
import transactMoney from './Images/TransactMoney.jpg';
import transactionHistory from './Images/TransactionHistory.jpg';
import transactMoneyImage from './Images/TransactMoneyImage.jpg';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      persons: [],
      sender: '',
      receiver: '',
      backdrop: "false"
    }
    this.receiver = this.receiver.bind(this);
    this.sender = this.sender.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.senderDefault = React.createRef();
    this.receiverDefault = React.createRef();
    this.scrolltoServices = React.createRef();
    this.scrolltoHome = React.createRef();
    this.scrolltoAbout = React.createRef();
    this.scrolltoContact = React.createRef();
  }
  handleClick = () => {
    document.getElementsByClassName('modal')[0].style.display = 'none'
    this.props.history.push({
      pathname: '/transactMoney',
      state: {
        senderDetails: this.state.sender,
        receiverDetails: this.state.receiver
      }
    });
    window.location.reload()
  }
  sender = (e) => {
    this.setState({ sender: e.target.value })
  }
  receiver = (e) => {
    this.setState({ receiver: e.target.value })
  }
  componentDidMount() {
    axios.get('http://localhost:3001/body')
      .then(res => {
        this.setState({ persons: res.data })
      })
      .catch(err => {
        console.log(err.response);
      })
  }
  scrolltoServicesFunction = () => {
    this.scrolltoServices.current.scrollIntoView({ behavior: 'smooth' });
  }
  scrolltoHomeFunction = () => {
    this.scrolltoHome.current.scrollIntoView({ behavior: 'smooth' });
  }
  scrolltoAboutFunction = () => {
    this.scrolltoAbout.current.scrollIntoView({ behavior: 'smooth' });
  }
  scrolltoContactFunction = () => {
    this.scrolltoContact.current.scrollIntoView({ behavior: 'smooth' });
  }
  render() {
    return (
      <div>
        <div id="header" ref={this.scrolltoHome} >
          <Navbar scrolltoHomeFunction={this.scrolltoHomeFunction} scrolltoAboutFunction={this.scrolltoAboutFunction} scrolltoContactFunction={this.scrolltoContactFunction} />
          <div id="mainHeading" className='container' >
            <h1>APV Bank Ltd</h1>
            <h5 className="subHeading">Transact Money Between Multiple Customers</h5>
            <span className="btn btn-primary addCustButton" onClick={() => {
              this.scrolltoServicesFunction();
            }}>Our Services</span>
          </div>
        </div>
        <div ref={this.scrolltoAbout}>
          <About />
        </div>
        <section id="ourServices" ref={this.scrolltoServices}>
          <h1 className="secondHeading"   >Our Services</h1>
          <div className=" container">
            <div className="row">
              <div className="col-lg-3 mt-4 col-md-6 col-sm-6 col-xs-12">
                <Link className="sectionTitle" to="/viewAllCustomers">
                  <div className="card mainCard card-block">
                    <img className="cardImage" src={allCustomers} alt="viewAllTheCustomers"></img>
                    <h5 className="card-title mt-3 mb-3">View All The Customers</h5>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 mt-4 col-md-6 col-sm-6 col-xs-12">
                <Link className="sectionTitle" to="/manageCustomers">
                  <div className="card mainCard card-block">
                    <img className="cardImage" src={manageCustomers} alt="manageCustomers"></img>
                    <h5 className="card-title  mt-3 mb-3">Manage Customers</h5>
                  </div>
                </Link>
              </div>
              <div className="col-lg-3 mt-4 col-md-6 col-sm-6 col-xs-12">
                <div className="card mainCard card-block" data-toggle="modal" data-target="#modalAddCustomerForm">
                  <img className="cardImage" src={transactMoney} alt="TransactMoney"></img>
                  <h5 className="card-title  mt-3 mb-3">Transact Money</h5>
                </div>
              </div>
              <div className="col-lg-3 mt-4 col-md-6 col-sm-6 col-xs-12">
                <Link className="sectionTitle" to="/transactionHistory">
                  <div className="card mainCard card-block">
                    <img className="cardImage" src={transactionHistory} alt="TransactionHistory"></img>
                    <h5 className="card-title  mt-3 mb-3">Transaction History</h5>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <div className="modal fade" data-backdrop='static' id="modalAddCustomerForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold transactionTitle">Transaction</h4>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                  this.senderDefault.current.value = "";
                  this.receiverDefault.current.value = "";
                  this.setState({ sender: "", receiver: "" })
                }} >
                  <span aria-hidden="true" >&times;</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div className="one">
                  <div className="text-right pr-2 pt-1"><i className="mdi mdi-dots-vertical dotdot"></i></div>
                  <div className="d-flex justify-content-center">
                    <img src={transactMoneyImage} alt="transactMoney" width="100" className="rounded-circle"></img>
                  </div>
                  <div className="container transaction">
                    <form autoComplete="off" >
                      <div className="md-form field">
                        <i className="fa fa-user prefix grey-text"></i>
                        <label for="materialFormCardNameEx" className="font-weight-light">Sender</label>
                        <select id="myList" ref={this.senderDefault} value={this.state.sender} onChange={(e) => { this.sender(e) }} required className="form-control">
                          <option selected disabled value="" >Select Sender </option>
                          {
                            this.state.persons.filter((person) => person.email !== this.state.receiver).map((customer) => {
                              return <option value={customer.email}>{customer.name}-{customer.email}-{customer.amount}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="md-form field">
                        <i className="fa fa-user prefix grey-text"></i>
                        <label for="materialFormCardEmailEx" className="font-weight-light">Receiver</label>
                        <select id="myList" ref={this.receiverDefault} value={this.state.receiver} onChange={(e) => { this.receiver(e) }} required className="form-control" >
                          <option selected disabled value="">Select Receiver </option>
                          {
                            this.state.persons.filter((person) => person.email !== this.state.sender).map((customer) => {
                              return <option value={customer.email}>{customer.name}-{customer.email}-{customer.amount}</option>
                            })
                          }
                        </select>
                      </div>
                      <div className="text-center py-4 mt-3 ">
                        <button className="btn btn-primary mr-2" type="submit" onClick={() => {
                          if (this.state.sender !== '' && this.state.receiver !== '') {
                            return this.handleClick()
                          }
                        }
                        }>Proceed</button>
                        <button className="btn btn-danger" data-dismiss="modal">Cancel</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref={this.scrolltoContact}>
          <Contact />
        </div>
        <Footer />
      </div>
    );
  }
}
export default App;