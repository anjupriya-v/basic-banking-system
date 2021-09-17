var express = require('express');
var app = express();
const cors = require('cors')
const bodyParser = require('body-parser')
const mysql = require('mysql');
require('dotenv').config()
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,

  database: process.env.DB_Name
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get(`${process.env.DB_ALLCUSTOMERS}`, ((req, res) => {
  connection.query("SELECT * FROM BBS_ALLCUSTOMERS", ((err, result) => {
    if (err) {
      console.log("cannot able fetch");
      return
    }
    res.send(result)
  }))
}))
app.delete(`${process.env.DB_DELETECUSTOMERS}`, (req, res) => {
  connection.query(`DELETE FROM bbs_allcustomers WHERE customerID = ${req.params.id}`, (error, results, fields) => {
    if (error) {
      console.error( error.message);
      return
    }
    connection.query("SELECT * FROM BBS_ALLCUSTOMERS", ((err, result) => {
      if (err) {
        console.log("cannot able fetch");
        return
      }
      res.send(result)
    }))
  })
});
app.post(`${process.env.DB_ADDCUSTOMERS}`, function (req, res) {
 
  const customerId = req.body.body.customerId;
  const date = req.body.body.date;
  const time = req.body.body.time;
  const username = req.body.body.name;
  const email = req.body.body.email;
  const currentBalance = req.body.body.amount;
  const dateWithTime = req.body.body.dateWithTimeString;
  connection.query(`INSERT INTO BBS_ALLCUSTOMERS SET customerID=?,date=?,time=?, name = ? , email = ? , amount = ?,dateWithTime = ? `, [customerId, date, time, username, email, currentBalance, dateWithTime], function (err, result) {
    connection.query("SELECT * FROM BBS_ALLCUSTOMERS", ((err, values) => {
      if (err) {
        console.log("cannot able fetch");
        return
      }
      res.send(values)
    }))
  });
})
app.post(`${process.env.DB_MONEYTRANSACTION}`, function (req, res) {
  let senderAmount = parseInt(req.body.body.senderAmount) - parseInt(req.body.body.transactMoney);
  let receiverAmount = parseInt(req.body.body.receiverAmount) + parseInt(req.body.body.transactMoney);
  connection.query(`INSERT INTO bbs_transaction SET date = ?,time=? , senderCustomerID=?, senderName=?,senderEmail = ? , senderAmount = ?,receiverCustomerID=?,receiverName=?,receiverEmail=?,receiverAmount=?,amountTransacted=? `, [req.body.body.date, req.body.body.time, req.body.body.senderCustomerID, req.body.body.senderName, req.body.body.senderEmail, senderAmount, req.body.body.receiverCustomerID, req.body.body.receiverName, req.body.body.receiverEmail, receiverAmount, req.body.body.transactMoney], function (err, result) {
    connection.query(`UPDATE bbs_allcustomers SET amount = '${parseInt(senderAmount)}' WHERE email = '${req.body.body.senderEmail}'`)
    connection.query(`UPDATE bbs_allcustomers SET amount = '${parseInt(receiverAmount)}' WHERE email = '${req.body.body.receiverEmail}'`)
    connection.query("SELECT * FROM bbs_transaction ", ((err, values) => {
      if (err) {
        console.log("cannot able fetch");
        return;
      }
     
      res.send(values);
    }))
  });
});
app.get(`${process.env.DB_TRANSACTIONHISTORY}`, (req, res) => {
  connection.query("SELECT * FROM bbs_transaction ", ((err, values) => {
    if (err) {
      console.log("cannot able fetch");
      return;
    }
    res.send(values);
  }))
})
app.delete(`${process.env.DB_DELETETRANSACTIONHISTORY}`, (req, res) => {
  connection.query(`DELETE FROM bbs_transaction WHERE ID = ${req.params.id} `, ((err, values) => {
    connection.query("SELECT * FROM bbs_transaction ", ((err, values) => {
      if (err) {
        console.log("cannot able fetch");
        return;
      }
      res.send(values);
    }))
  }))
})
app.listen(process.env.PORT||process.env.DB_PORT, () => {
  console.log("Your App is Running🚀")
});
