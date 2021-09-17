import React, { Component } from 'react';
import FilledNavBar from './FilledNavBar';
import axios from 'axios';
import Loader from 'react-js-loader';
import '../App.css'
class TransactMoney extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            transactionHistory: [],
            transactMoney: 0,
            date: new Date().getDate(),
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
            time: new Date().toLocaleTimeString(),
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.customerDetails = this.customerDetails.bind(this);
        this.senderName = React.createRef();
        this.senderEmail = React.createRef();
        this.senderAmount = React.createRef();
        this.receiverName = React.createRef();
        this.receiverEmail = React.createRef();
        this.receiverAmount = React.createRef();
        this.receiverCustomerID = React.createRef();
        this.senderCustomerID = React.createRef();
    }
    componentDidMount() {
        axios.get(process.env.REACT_APP_ALL_CUSTOMERS)
            .then(res => {
                this.setState({ persons: res.data })
            })
            .catch(err => {
                console.log(err.response);
            })
    }
    customerDetails(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit(e) {
        e.preventDefault();
        if (parseInt(this.state.transactMoney) > 0) {
            if (parseInt(this.senderAmount.current.value) >= parseInt(this.state.transactMoney) && parseInt(this.senderAmount.current.value) > 0) {
                console.log(parseInt(this.senderAmount.current.value) + 10)
                this.setState({ date: new Date().getDate(), month: new Date().getMonth() + 1, year: new Date().getFullYear(), time: new Date().toLocaleTimeString() })
                this.setState({ loading: true });
                console.log("Transaction Loadin")
                axios.post(process.env.REACT_APP_MONEYTRANSACTION, {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: {
                        date: `${this.state.date}-${this.state.month}-${this.state.year}`,
                        time: this.state.time,
                        senderName: this.senderName.current.value,
                        senderCustomerID: this.senderCustomerID.current.value,
                        receiverCustomerID: this.receiverCustomerID.current.value,
                        senderEmail: this.senderEmail.current.value,
                        senderAmount: this.senderAmount.current.value,
                        receiverName: this.receiverName.current.value,
                        receiverEmail: this.receiverEmail.current.value,
                        receiverAmount: this.receiverAmount.current.value,
                        transactMoney: this.state.transactMoney
                    },
                }).then(res => {
                    this.setState({ loading: false });
                    this.props.history.push({ pathname: '/transactionSuccess' })
                })
                    .catch(error => {
                        console.error('Error:', error)
                    })
                    .finally(() => {
                        this.setState({ loading: false })
                    })
            }
            else {
                alert("Sender Amount is not sufficient to transact")
            }
        }
        else {
            alert("Please Give the amount to be transact")
        }
    }
    render() {
        return (
            <div>
                <FilledNavBar />
                <br />
                <br />
                <br />
                {this.state.loading ?
                    <div id="loader">
                        <Loader type="spinner-circle" visible={this.state.loading} bgColor={"#000000"} title={"spinner-circle"} size={100} />
                        <h4>Processing</h4>
                    </div> :
                    <div className=" container cardContainer">
                        <h1 className="transactMoneyHeading">Money Transaction</h1>
                        <form >
                            <h3 className="details">Sender Details</h3>
                            {
                                this.state.persons.map(person => {
                                    if (this.props.location?.state?.senderDetails === `${person.email}`) {
                                        return <React.Fragment>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label for="inputName">Name:</label>
                                                    <input type="text" disabled name="receiverName" value={person.name} ref={this.senderName} className="form-control" id="inputName" placeholder="Name" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label for="inputCustomerId">Customer ID</label>
                                                    <input type="number" disabled name="customerID" value={person.customerID} ref={this.senderCustomerID} className="form-control" id="inputCustomerId" placeholder="Customer ID" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="inputEmail">Email</label>
                                                <input type="email" disabled name="receiverEmail" value={person.email} ref={this.senderEmail} className="form-control" id="inputEmail" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label for="inputCurrentBalance">Current Balance </label>
                                                <input type="number" name="receiverAmount" disabled value={person.amount} ref={this.senderAmount} className="form-control" id="inputCurrentBalance" placeholder="Current Balance" />
                                            </div>
                                        </React.Fragment>
                                    }
                                })}<h3 className="details">Receiver Details</h3>
                            {
                                this.state.persons.map(person => {
                                    if (this.props.location?.state?.receiverDetails === `${person.email}`) {
                                        return <React.Fragment>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label for="inputName">Name:</label>
                                                    <input type="text" disabled name="senderName" value={person.name} ref={this.receiverName} className="form-control" id="inputName" placeholder="Name" />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label for="inputCustomerId">Customer ID</label>
                                                    <input type="number" disabled name="customerID" value={person.customerID} ref={this.receiverCustomerID} className="form-control" id="inputCustomerId" placeholder="Customer ID" />
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label for="inputEmail">Email</label>
                                                <input type="email" disabled name="senderEmail" value={person.email} ref={this.receiverEmail} className="form-control" id="inputEmail" placeholder="Email" />
                                            </div>
                                            <div className="form-group">
                                                <label for="inputCurrentBalance">Current Balance </label>
                                                <input type="number" name="senderAmount" disabled value={person.amount} ref={this.receiverAmount} className="form-control" id="inputCurrentBalance" placeholder="Current Balance" />
                                            </div>
                                        </React.Fragment>
                                    }
                                })}
                            <div className="form-group transactAmountDiv" >
                                <label for="transactAmount">Enter Amount to transact</label>
                                <input type="number" className="form-control" id="transactAmount" placeholder="Amount" name="transactMoney" onChange={(e) => { this.customerDetails(e) }} />
                            </div>
                            <div className="submitButton">
                                <button type="submit" className="btn btn-primary" onClick={(e) => { this.handleSubmit(e) }}>Transact Money</button>
                            </div>
                        </form>
                    </div>
                }
              
            </div>
        );
    }
}
export default TransactMoney;