import React, { Component } from 'react';
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
import LoadingOverlay from 'react-loading-overlay-ts';
import {withRouter} from 'react-router-dom';
init(process.env.REACT_APP_USER_ID);

class Contact extends Component {
    constructor(props) {
        super(props);
        this.state={
            loading:false
        }
        this.sendEmail=this.sendEmail.bind(this);
    }
     sendEmail=(e)=> {
        e.preventDefault();
    this.setState({loading:true})
        emailjs.sendForm(process.env.REACT_APP_SERVICE_ID,process.env.REACT_APP_TEMPLATE_ID, e.target,process.env.REACT_APP_USER_ID)
          .then((result) => {
              console.log(result.text);
              this.setState({loading:false})
              this.props.history.push({ pathname: '/contactFormSubmitted' ,
           })
          }, (error) => {
              console.log(error.text);
          });
      }
    render() {
        return (
          <LoadingOverlay
          active={this.state.loading}
          text="Please Wait"
          spinner
          styles={{
            overlay: (base) => ({
              ...base,
              background: 'rgba(255, 255, 255, 0.5)',
              color:'rgba(0, 0, 0)',
              '& svg circle': {
                stroke: 'rgba(0, 0, 0)'
              }
            })
          }}
        >
            <div id="ourServices">
                <h1 className="secondHeading">Contact US</h1>
                <div className="container cardContainer contactContent" >
                <form onSubmit={this.sendEmail}>
  <div className="form-row">
    <div className="form-group col-md-6">
      <label for="firstName">First Name</label>
      <input type="text" className="form-control" name="firstName" required id="firstName" placeholder="First Name"/>
    </div>
    <div className="form-group col-md-6">
      <label for="lastName">Last Name</label>
      <input type="text" className="form-control" name="secondName" required id="lastName" placeholder="Last Name"/>
    </div>
  </div>
  <div className="form-group">
    <label for="Email">Email</label>
    <input type="email" className="form-control" name="email" required id="Email" placeholder="Email"/>
  </div>
  <div className="form-group">
    <label for="phoneNumber">Phone Number</label>
    <input type="number" className="form-control" name="phoneNumber" required id="phoneNumber" placeholder="Phone Number"/>
  </div>
  <div className="form-group">
    <label for="Message">Type your Message here...</label>
    <textarea className="form-control" id="Message"  name="message" required rows="3"></textarea>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
            </div>
            </LoadingOverlay>
        );
    }
}
export default withRouter(Contact);