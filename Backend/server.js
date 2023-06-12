const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
// const Savepayment = require("../models/payment.model.js");
const app = express();


const {Payment,paymentFailed, getPaymentData, getUserReciept, getUser} = require("./app/controller/payment.controller.js");

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



app.post("/api/getuser", getUser);
app.post("/api/payment", Payment);
app.post("/api/paymentfailed", paymentFailed);
app.post("/api/getpaymentdata", getPaymentData);
// app.post("/api/getuserdata", getUserData);
app.post("/api/getuserreciept", getUserReciept);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
