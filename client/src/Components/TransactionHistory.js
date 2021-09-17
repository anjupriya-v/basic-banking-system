import React, { useEffect, useState } from 'react';
import FilledNavBar from './FilledNavBar';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import { useHistory } from 'react-router-dom'
import LoaderComp from './LoadComp';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()
function TransactionHistory(props) {
  const [locationKeys, setLocationKeys] = useState([])
  const history = useHistory()
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [senderEmailValue, setSenderEmailValue] = useState('');
  const [receiverEmailValue, setReceiverEmailValue] = useState('');
  const [senderAmountValue, setSenderAmountValue] = useState('');
  const [receiverAmountValue, setReceiverAmountValue] = useState('');
  const [senderCustomerId, setSenderCustomerId] = useState('');
  const [receiverCustomerId, setReceiverCustomerId] = useState('');
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  useEffect(() => {
    setLoading(true)
    axios.get(process.env.REACT_APP_TRANSACTIONHISTORY).then((res) => {
      setLoading(false)
      setTransactionData(res.data);
    }).catch((err) => {
      console.error(err);
    }).finally(() => {
      setLoading(false)
    })
  }, [])
  useEffect(() => {
    return history.listen(location => {
      if (history.action === 'PUSH') {
        setLocationKeys([location.key])
      }
      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          setLocationKeys(([_, ...keys]) => keys)
        } else {
          setLocationKeys((keys) => [location.key, ...keys])
          props.history.push('/')
        }
      }
    })
  }, [locationKeys,])
  const deleteHistory = (value, senderName, receiverName) => {
    axios.delete(process.env.REACT_APP_DELETETRANSACTIONHISTORY + value)
      .then(res => {
        toast.error(`The Transaction History between ${senderName} & ${receiverName} has been deleted`, { position: toast.POSITION.BOTTOM_LEFT })
        setTransactionData(res.data);
      })
      .catch(err => {
        console.error(err);
      })
  }
  const customerDetails = (value) => {
    transactionData.filter((person) => person.id === value).map((customer) => {
      setSenderEmailValue(customer.senderEmail);
      setReceiverEmailValue(customer.receiverEmail);
      setSenderAmountValue(customer.senderAmount);
      setReceiverAmountValue(customer.receiverAmount);
      setSenderCustomerId(customer.senderCustomerID)
      setReceiverCustomerId(customer.receiverCustomerID)
      setDateValue(customer.date);
      setTimeValue(customer.time);
    })
  }
  return (
    <div>
      <FilledNavBar />
      <br />
      <br />
      <br />
      <br />
      {loading ? <LoaderComp loading={loading} /> :
        <div>
          <h2 className="transactionHistoryHeading">Transaction History</h2>
          <div className="container tableContainer cardContainer">
            <Table responsive className="tableText">
              <tr>
                <th>Date</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount Transacted</th>
                <th>Action</th>
                <th>Delete</th>
              </tr>
              {
                
                transactionData.sort((a, b) => { 
                  
                  return b.id - a.id }).map((person) => {
               
                  
                  return (<tr>
                    <td>{person.date}</td>
                    <td>{person.senderName}</td>
                    <td>{person.receiverName}</td>
                    <td>{person.amountTransacted}</td>
                    <td><span data-toggle="modal" onClick={() => { customerDetails(person.id) }} data-target="#exampleModalCenter" className="viewDetails">More Details<i className="fa fa-arrow-right"></i></span></td>
                    <td ><i onClick={() => { deleteHistory(person.id, person.senderName, person.receiverName) }} className="fa fa-trash fa-1.5x deleteHistory" aria-hidden="true"></i></td>
                  </tr>
                  )
                })
              }
              <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="vertical-alignment-helper">
                  <div className="modal-dialog vertical-align-center" role="document">
                    <div className="modal-content">
                      <div className="modal-header text-center">
                        <h5 className="modal-title w-100" id="exampleModalLongTitle">Transaction Details</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div className="modal-body">
                        <form>
                          <h3 className="details">Sender Details</h3>
                          <div className="form-group ">
                            <label for="customerID">Customer ID</label>
                            <input type="number" className="form-control" id="customerID" placeholder="Customer ID" disabled value={senderCustomerId}></input>
                          </div>
                          <div className="form-group ">
                            <label for="inputEmail">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" disabled value={senderEmailValue}></input>
                          </div>
                          <div className="form-group">
                            <label for="inputBalance">Amount Balance</label>
                            <input type="number" className="form-control" id="inputBalance" placeholder="Amount Balance" disabled value={senderAmountValue}></input>
                          </div>
                          <h3 className="details">Receiver Details</h3>
                          <div className="form-group ">
                            <label for="customerID">Customer ID</label>
                            <input type="number" className="form-control" id="customerID" placeholder="Customer ID" disabled value={receiverCustomerId}></input>
                          </div>
                          <div className="form-group ">
                            <label for="inputEmail">Email</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Email" disabled value={receiverEmailValue}></input>
                          </div>
                          <div className="form-group">
                            <label for="inputBalance">Amount Balance</label>
                            <input type="number" className="form-control" id="inputBalance" placeholder="Amount Balance" disabled value={receiverAmountValue}></input>
                          </div>
                          <hr />
                          <div className="form-group">
                            <label for="inputDate">Date </label>
                            <input type="text" className="form-control" id="inputDate" placeholder="Date" disabled value={dateValue}></input>
                          </div>
                          <div className="form-group">
                            <label for="inputTime">Time</label>
                            <input type="text" className="form-control" id="inputTime" placeholder="Time" disabled value={timeValue}></input>
                          </div>
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Table>
          </div>
        </div>}
    
    </div>
  );
}
export default TransactionHistory;