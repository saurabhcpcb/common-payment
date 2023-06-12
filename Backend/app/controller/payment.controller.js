const sql = require("../models/db");
// const Front_URL = 'http://localhost:3000';
const Front_URL = 'http://103.7.181.103:3000';
const axios = require('axios');


async function getUser(req, res) {
    const email = req.body.email
    axios.post("http://103.7.181.102/api/getuser", {
        email: email,
    })
        .then(response => {

            var sqlquery = "INSERT INTO user_data (user_id, portal, name, email, legal_name, state_name, reg_address, district_name, pin_code, pan_no, mobile, person_aadhar) VALUES ('" + response.data.data[0].id + "', 'battery', '" + response.data.data[0].name + "', '" + response.data.data[0].email + "', '" + response.data.data[0].legal_name + "', '" + response.data.data[0].state_name + "', '" + response.data.data[0].reg_address + "', '" + response.data.data[0].district_name + "', '" + response.data.data[0].pin_code + "', '" + response.data.data[0].pan_no + "', '" + response.data.data[0].mobile + "', '" + response.data.data[0].person_aadhar + "')";
            // console.log('response', sqlquery);
            sql.query(sqlquery, function (err, result) {
                if (err) throw err;
                res.status(200).json({ data: response.data.data[0] });
            });
            // res.status(200).json(response.data);
        })
        .catch((err) => {
            res.status(200).json({ message: err, data:"" });
        });
}

async function Payment(req, res) {
    // console.log('data', res); return;
    var sqlquery = "INSERT INTO payment_status (status, email, message, trxnid, amount, payment_source) VALUES ('" + req.body.status + "', '" + req.body.email + "', '" + req.body.error_Message + "', '" + req.body.txnid + "', '" + req.body.amount + "', '" + req.body.payment_source + "' )";
    sql.query(sqlquery, function (err, result) {
        if (err) throw err;
        res.redirect(Front_URL + "/paymentstatus?email=" + req.body.email);
    });
}

async function paymentFailed(req, res) {
    // console.log('data', res); return;
    var sqlquery = "INSERT INTO payment_status (status, email, message, trxnid, amount, payment_source) VALUES ('" + req.body.status + "', '" + req.body.email + "', '" + req.body.error_Message + "', '" + req.body.txnid + "', '" + req.body.amount + "', '" + req.body.payment_source + "' )";
    sql.query(sqlquery, function (err, result) {
        if (err) throw err;
        res.redirect(Front_URL + "/paymentfailed?email=" + req.body.email);
    });
}

async function getPaymentData(req, res) {
    var sqlquery = "SELECT * FROM payment_status WHERE email = '" + req.body.email + "' ORDER BY id DESC LIMIT 1";
    sql.query(sqlquery, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json({ 'data': result })
    });
}

// async function getUserData(req, res) {
//     var sqlquery = "SELECT users.*, paymentsuccesses.* FROM users INNER JOIN paymentsuccesses ON users.id=paymentsuccesses.user_id WHERE users.email = '" + req.body.email + "'  ORDER BY users.id DESC LIMIT 1";

//     sql.query(sqlquery, function (err, result) {
//         if (err) throw err;
//         // console.log(result);
//         // console.log(result.length);
//         if (result.length > 0) {
//             res.json({ result, 'length': result.length })
//         } else {
//             res.json({ 'data': "Data not found", 'length': 0 })
//         }

//     });
// }

async function getUserReciept(req, res) {
    var sqlquery = "SELECT user_data.*, payment_status.* FROM user_data INNER JOIN payment_status ON user_data.email=payment_status.email WHERE user_data.email = '" + req.body.email + "'  ORDER BY payment_status.id DESC LIMIT 1";
    // console.log(sqlquery);return;
    sql.query(sqlquery, function (err, result) {
        if (err) throw err;
        // console.log(result);
        res.json({ result })
    });
}

module.exports = { Payment, paymentFailed, getPaymentData, getUserReciept, getUser }