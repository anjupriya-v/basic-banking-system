import React, { useState, useEffect } from 'react';
import FilledNavBar from './FilledNavBar';
import '../App.css';
import contactImage from '../Images/ContactImage.png'
import { useHistory } from 'react-router-dom';
const ContactFormSubmitted = (props) => {
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
    <div>
      <div className="container successContainer cardContainer ">
        <div class="card successCard mx-auto">
          <img src={contactImage} alt="contact" ></img>
          <h3 className="successText">Thank You</h3>
          <h6 className="formSubmittedContent">Your details have been received</h6>
          <h6 className="formSubmittedContent">We will contact you shortly</h6>
        </div>
      </div>
    </div>
  </div>)
}
export default ContactFormSubmitted;