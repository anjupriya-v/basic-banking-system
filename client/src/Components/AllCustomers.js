import React, { Component } from 'react';
import '../App.css';
import axios from 'axios'
import FilledNavBar from './FilledNavBar';
import LoaderComp from './LoadComp';
import { Table } from 'react-bootstrap';
class AllCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            persons: [],
            loading: true
        }
    }
    componentDidMount() {
        this.setState({ loading: true })
        axios.get(process.env.REACT_APP_ALL_CUSTOMERS)
            .then(res => {
                this.setState({ loading: false })
                this.setState({ persons: res.data })
            })
            .catch(err => {
                console.log(err.response);
            }).finally(() => {
                this.setState({ loading: false })
            })
    }
    render() {
        return (
            <div>
                <FilledNavBar />
                <br />
                <br />
                <br />
                {this.state.loading ?
                    <LoaderComp loading={this.state.loading} /> :
                    <React.Fragment>
                        <h2 className="allCustomersHeading">All Customers</h2>
                        <div className="container tableContainer cardContainer">
                            <Table responsive className="tableText">
                                <tr>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Current Balance </th>
                                </tr>
                                {
                                    this.state.persons.sort((a, b) => { return new Date(b.dateWithTime) - new Date(a.dateWithTime) }).map((person) => {
                                        return <tr>
                                            <td>{person.customerID}</td>
                                            <td>{person.name}</td>
                                            <td>{person.email}</td>
                                            <td>{person.amount}</td>
                                        </tr>
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