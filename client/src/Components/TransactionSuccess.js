import React, { useState, useEffect } from 'react';
import FilledNavBar from './FilledNavBar';
import '../App.css';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import image from '../Images/SuccessImage.png';
const TransactionSuccess = (props) => {
  const [locationKeys, setLocationKeys] = useState([])
  const history = useHistory()
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
          history.push('/')
        }
      }
    })
  }, [locationKeys,])
  return (<div>
    <FilledNavBar />
    <br />
    <br />
    <br />
    <br />
    <div className="container successContainer cardContainer  ">
      <div class="card successCard mx-auto" >
        <img src={image} alt="success"></img>
        <h3 className="successText">Transaction Success!</h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          <Link to="/transactionHistory">Transaction History</Link>
          <Link to="/">Back to Home</Link>
        </div>
      </div>
    </div>

  </div>)
}
export default TransactionSuccess;