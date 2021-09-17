import React, { Component } from 'react';
import axios from 'axios'
import { Table } from 'react-bootstrap'
import image from '../Images/bank_48px.png';
import '../App.css';
import { BrowserRouter, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import LoaderComp from './LoadComp';
import customer from '../Images/Customer.webp'
const validateForm = errors => {
  let valid = true;
  Object.values(errors).forEach(val => val.length > 0 && (valid = false));
  return valid;
};
class AllCustomers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      persons: [],
      name: null,
      email: null,
      amount: null,
      id: null,
      errors: {
        name: '',
        amount: '',
        email: '',
        emailAlreadyPresent: '',
        idAlreadyPresent: '',
        idLessThan4: '',
        idGreaterThan4: '',
      },
      flag: true,
      date: new Date().getDate(),
      month: new Date().getMonth(),
      year: new Date().getFullYear(),
      time:new Date().toLocaleTimeString(),
      dateWithTimeString:new Date().toLocaleString(),
      loading: true,
      navColor: {
        color: 'white'
      }
    }
    this.nameValue = React.createRef();
    this.emailValue = React.createRef();
    this.amountValue = React.createRef();
    this.idValue = React.createRef();
    this.deleteCustomer = this.deleteCustomer.bind(this);
    this.customerDetails = this.customerDetails.bind(this);
    this.addCustomer = this.addCustomer.bind(this);
  }
  componentDidMount() {
    super.componentDidMount();
    this.onScrollNearBottom(this.scrollToLoad);
    this.backListener = BrowserRouter.listen(location => {
      if (location.action === "POP") {
        this.props.history.push({ pathname: '/' })
      }
    });
  }
  customerDetails(e) {
    var name = e.target.name;
    var value = e.target.value;
    let errors = this.state.errors;
    switch (name) {
      case 'name':
        errors.name = value.length > 0 ? "" : 'Invalid Name'
        break;
      case 'email':
        errors.email =
          new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(String(this.emailValue.current.value).toLowerCase())
            ? ''
            : 'Email is not valid!';
        if (errors.email.length === 0) {
          errors.emailAlreadyPresent = this.state.persons.filter((person) => { return person.email === value }).length === 1 ? 'This email is already present' : '';
        }
        break;
      case 'id':
        errors.idGreaterThan4 =
          value.length > 4
            ? 'Customer ID Must be 4 digits'
            : '';
        errors.idLessThan4 =
          value.length < 4
            ? 'Customer ID Must be 4 digits'
            : '';
        if (errors.idGreaterThan4.length === 0) {
          errors.idAlreadyPresent = this.state.persons.filter((person) => { return person.customerID === value }).length === 1 ? 'This customer ID is already present' : '';
        }
        if (errors.idLessThan4.length === 0) {
          errors.idAlreadyPresent = this.state.persons.filter((person) => { return person.customerID === value }).length === 1 ? 'This customer ID is already present' : '';
        }
        break;
      case 'amount':
        errors.amount = value > 0 ? '' : 'Amount will not be 0'
        break;
      default:
        break;
    }
    this.setState({ errors, [name]: value })
  }
  addCustomer = (e) => {
    e.preventDefault();
    if (validateForm(this.state.errors)) {
      this.setState({ date: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear(),time:new Date().toLocaleTimeString(),dateWithTimeString:new Date().toLocaleString()})
      var data = {
        customerId: this.state.id,
        date: `${this.state.date}-${this.state.month}-${this.state.year}`,
        time: this.state.time,
        name: this.state.name,
        email: this.state.email,
        amount: this.state.amount,
        dateWithTimeString:this.state.dateWithTimeString
      }
      axios.post(process.env.REACT_APP_ADDCUSTOMERS, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data,
      }).then(res => {
        this.setState({ persons: res.data })
        toast.success(`The Customer '${this.state.name}' has been added`, { position: toast.POSITION.BOTTOM_LEFT })
        window.$('#modalAddCustomerForm').modal('hide');
        return false;
      }
      )
        .catch(error => console.error('Error:', error));
      this.idValue.current.value = "";
      this.nameValue.current.value = "";
      this.emailValue.current.value = "";
      this.amountValue.current.value = ""
    }
    else {
      alert("You have entered invalid details")
    }
  }
  componentDidMount() {
    this.setState({ loading: true })
    axios.get(process.env.REACT_APP_ALL_CUSTOMERS).then(res => {
      this.setState({ loading: false, persons: res.data });
    }
    )
      .catch(error => console.error('Error:', error)).finally(() => {
        this.setState({ loading: false })
      })
  }
  deleteCustomer(e, value, name) {
    axios.delete(process.env.REACT_APP_DELETECUSTOMERS+ value)
      .then(res => {
        this.setState({ persons: res.data })
        toast.error(`The Customer '${name}' has been removed`, { position: toast.POSITION.BOTTOM_LEFT })
      })
      .catch(err => {
        console.log(err.response);
      })
  }
  render() {
    return (
      <div>
        <nav className='fillBackground navbar navbar-expand-lg navbar-light  fixed-top'>
          <div className="container">
            <img src={image} className="navbar-brand" alt="logo"></img>
            <button className="navbar-toggler custom-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse " id="navbarText">
              <span className="navbar-brand" style={this.state.navColor}  >APV Bank Ltd</span>
              <ul className="navbar-nav ml-auto">
                <li className="nav-item navText">
                  <Link className="nav-link " style={this.state.navColor} to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <span className="nav-link  addcustomer" data-toggle="collapse" data-target=".navbar-collapse.show" style={this.state.navColor} data-toggle="modal" data-target="#modalAddCustomerForm"  > Add Customer</span>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " style={this.state.navColor} to="/aboutParent">About</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " style={this.state.navColor} to="/contactParent">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="modal fade" id="modalAddCustomerForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header text-center">
                <h4 className="modal-title w-100 font-weight-bold">Add Customer Details</h4>
                <button type="button" className="close" data-dismiss="modal" onClick={() => {
                  this.idValue.current.value = "";
                  this.nameValue.current.value = "";
                  this.emailValue.current.value = "";
                  this.amountValue.current.value = ""
                }
                } aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body mx-3">
                <div className="one">
                  <div className="text-right pr-2 pt-1"><i className="mdi mdi-dots-vertical dotdot"></i></div>
                  <div className="d-flex justify-content-center">
                    <img src={customer} width="100" className="rounded-circle" alt="customer"></img>
                  </div>
                  <div className="container">
                    <form autoComplete="off" onSubmit={(e) => { this.addCustomer(e) }} >
                      <div className="md-form field">
                        <i className="fa fa-id-card"></i>
                        <label for="materialFormCardConfirmEx" className="font-weight-light">Customer ID</label>
                        <input type="number" ref={this.idValue} id="materialFormCardConfirmEx" required name="id" className="form-control addCustInput" onChange={(e) => { this.customerDetails(e) }}></input>
                        {this.state.errors.idLessThan4.length > 0 &&
                          <span className='error'>{this.state.errors.idLessThan4}</span>}
                        {this.state.errors.idGreaterThan4.length > 0 &&
                          <span className='error'>{this.state.errors.idGreaterThan4}</span>}
                        {this.state.errors.idAlreadyPresent.length > 0 &&
                          <span className='error'>{this.state.errors.idAlreadyPresent}</span>}
                      </div>
                      <div className="md-form field">
                        <i className="fa fa-user prefix grey-text"></i>
                        <label for="materialFormCardNameEx" className="font-weight-light">Name</label>
                        <input type="text" ref={this.nameValue} id="materialFormCardNameEx" required name="name" className="form-control addCustInput" onChange={(e) => { this.customerDetails(e) }}></input>
                        {this.state.errors.name.length > 0 &&
                          <span className='error'>{this.state.name.name}</span>}
                      </div>
                      <div className="md-form field">
                        <i className="fa fa-envelope prefix grey-text"></i>
                        <label for="materialFormCardEmailEx" className="font-weight-light">Email</label>
                        <input type="email" ref={this.emailValue} id="materialFormCardEmailEx" required name="email" className="form-control addCustInput" onChange={(e) => {
                          this.customerDetails(e);
                        }}></input>
                        {this.state.errors.email.length > 0 &&
                          <span className='error'>{this.state.errors.email}</span>}
                        {this.state.errors.emailAlreadyPresent.length > 0 &&
                          <span className='error'>{this.state.errors.emailAlreadyPresent}</span>}
                      </div>
                      <div className="md-form field">
                        <i className="fa fa-dollar"></i>
                        <label for="materialFormCardConfirmEx" className="font-weight-light">Current Balance</label>
                        <input type="number" ref={this.amountValue} id="materialFormCardConfirmEx" required name="amount" className="form-control addCustInput" onChange={(e) => { this.customerDetails(e) }}></input>
                        {this.state.errors.amount.length > 0 &&
                          <span className='error'>{this.state.errors.amount}</span>}
                      </div>
                      <div className="text-center py-4 mt-3">
                        <button className="btn btn-danger mr-2" data-dismiss="modal" onClick={() => {
                          this.idValue.current.value = "";
                          this.nameValue.current.value = "";
                          this.emailValue.current.value = "";
                          this.amountValue.current.value = ""
                        }} >Cancel</button>
                        <button className="btn btn-primary" type="submit" >Add Customer</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        {this.state.loading ? <LoaderComp loading={this.state.loading} /> : <React.Fragment>
          <h2 className="manageCustomersHeading">Manage Customers</h2>
          <div className="container tableContainer cardContainer" >
            <Table responsive className="tableText">
              <tr>
                <th>Customer ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Current Balance </th>
                <th>Remove Customer</th>
              </tr>
              {
                this.state.persons.sort((a, b) => { return new Date(b.dateWithTime) - new Date(a.dateWithTime) }).map((person) => {
                  
                  return (<tr>
                    <td>{person.customerID}</td>
                    <td>{person.name}</td>
                    <td>{person.email}</td>
                    <td>{person.amount}</td>
                    <td><i onClick={(e) => { this.deleteCustomer(e, person.customerID, person.name) }} className="fa fa-user-times fa-2x deleteCustomer"></i></td>
                  </tr>)
                })
              }
            </Table>
          </div>
         
        </React.Fragment>}
      </div>
    );
  }
}
export default AllCustomers;