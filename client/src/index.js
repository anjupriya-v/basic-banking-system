import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ContactParent from './Components/ContactParent';
import AboutParent from './Components/AboutParent';
import AllCustomers from './Components/AllCustomers';
import ManageCustomers from './Components/ManageCustomers';
import TransactionHistory from './Components/TransactionHistory';
import TransactMoney from './Components/TransactMoney';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import TransactionSuccess from './Components/TransactionSuccess';
import ContactFormSubmitted from './Components/ContactFormSubmitted';
const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/aboutParent" component={AboutParent} />
        <Route path="/contactParent" component={ContactParent} />
        <Route path='/viewAllCustomers' component={AllCustomers} />
        <Route path='/manageCustomers' component={ManageCustomers} />
        <Route path='/transactMoney' component={TransactMoney} />
        <Route path='/transactionHistory' component={TransactionHistory} />
        <Route path="/transactionSuccess" component={TransactionSuccess} />
        <Route path="/contactFormSubmitted" component={ContactFormSubmitted} />
      </Switch>
    </Router>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
