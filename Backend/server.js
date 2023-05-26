const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
// const Savepayment = require("../models/payment.model.js");
const sql = require("./app/models/db.js");
const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

// app.use(cors(corsOptions));
app.use(cors())

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(
  express.urlencoded({ extended: true })
); /* bodyParser.urlencoded() is deprecated */

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

const Front_URL = 'http://localhost:3000';

app.post("/payment", (req, res) => {

  var sqlquery = "INSERT INTO payment_status (status, email, message, trxnid, amount, payment_source) VALUES ('"+req.body.status+"', '"+req.body.email+"', '"+req.body.error_Message+"', '"+req.body.txnid+"', '"+req.body.amount+"', '"+req.body.payment_source+"' )";
  sql.query(sqlquery, function (err, result) {
    if (err) throw err;
    res.redirect(Front_URL+"/paymentstatus?email="+ req.body.email );
  });

});

app.post("/paymentfailed", (req, res) => {

  var sqlquery = "INSERT INTO payment_status (status, email, message, trxnid, amount, payment_source) VALUES ('"+req.body.status+"', '"+req.body.email+"', '"+req.body.error_Message+"', '"+req.body.txnid+"', '"+req.body.amount+"', '"+req.body.payment_source+"' )";
  sql.query(sqlquery, function (err, result) {
    if (err) throw err;
    res.redirect(Front_URL+"/paymentfailed?email="+ req.body.email );
  });

});

app.post("/getpaymentdata", (req, res) => {

  var sqlquery = "SELECT * FROM payment_status WHERE email = '"+ req.body.email +"' ORDER BY id DESC LIMIT 1";
  sql.query(sqlquery, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.json({'data':result})
  });

});

app.post("/getuserdata", (req, res) => {

  var sqlquery = "SELECT users.*, paymentsuccesses.* FROM users INNER JOIN paymentsuccesses ON users.id=paymentsuccesses.user_id WHERE users.email = '"+ req.body.email +"'  ORDER BY users.id DESC LIMIT 1";

  sql.query(sqlquery, function (err, result) {
    if (err) throw err;
    // console.log(result);
    // console.log(result.length);
    if(result.length > 0){
      res.json({result, 'length':result.length})
    }else{
      res.json({'data':"Data not found", 'length':0})
    }
    
  });

});

app.post("/getuserreciept", (req, res) => {

  var sqlquery = "SELECT users.*, payment_status.* FROM users INNER JOIN payment_status ON users.email=payment_status.email WHERE users.email = '"+ req.body.email +"'  ORDER BY payment_status.id DESC LIMIT 1";
// console.log(sqlquery);return;
  sql.query(sqlquery, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.json({result})
  });

});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
