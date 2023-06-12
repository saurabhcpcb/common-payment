import Select from "react-select";
import { useState } from "react";
import sha512 from "js-sha512";
import axios from "axios";
import "font-awesome/css/font-awesome.min.css";

import { Commonurl } from "./commonurl";

const Home = () => {
  const [showdiv, setShowDiv] = useState("");

  const options = [
    { value: "battery", label: "EPR Portal For Battery Waste Management" }

  ];

  const changeForm = (event) => {
    if (event.value === "battery") {
      setShowDiv("showdiv");
    } else {
      setShowDiv("");
    }
  };

  const [key, setKey] = useState("Ts1FMO");
  const [txnid, setTxnid] = useState("");
  const [amount, setAmount] = useState("");
  const [productinfo, setProduct] = useState("iPhone");
  const [firstname, setfirstname] = useState("");
  const [email, setEmail] = useState("");
  const [SALT, setSalt] = useState("jgHC8u1Y25nJY2C90qnXaepqRDgRY6zT");
  const [hash, sethash] = useState("");
  const [paidamount, setPaidAmount] = useState("");
  const [paymentsatus, setPaymentstatus] = useState("");
  const [errormeg, setErrormes] = useState("");

  const getData = () => {
    // console.log(email);
    axios
      .post(Commonurl+"/getuser", { email: email })
      .then((response) => {
        // console.log('response',response.data.data);return;
        if (response.data.data != "") {
          setfirstname(response.data.data.name);
          setPaidAmount(response.data.data.amount);
          setTxnid("RP_" + Math.floor(10000000 + Math.random() * 90000000));
          setPaymentstatus(response.data.data.status);
          setErrormes("");
        } else {
          setErrormes("Transaction Details Not Found!");
          setfirstname("");
          setPaidAmount("");
          setTxnid("RP_" + Math.floor(10000000 + Math.random() * 90000000));
          setPaymentstatus("");
        }
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
        setErrormes("Transaction Details Not Found!");
        setfirstname("");
        setPaidAmount("");
        setTxnid("RP_" + Math.floor(10000000 + Math.random() * 90000000));
        setPaymentstatus("");
      });
  };

  // console.log('Commonurl ', Commonurl);

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          {/* <form method="post" action="https://test.payu.in/_payment"> */}
            <form method="post" action="https://secure.payu.in/_payment">
            <div className="mb-3 text-center">
              <img
                alt="not found"
                width={"150px"}
                src={"assets/img/cpcb.jpg"}
              />
            </div>
            {/* <h3>Balance Payment Initiation Platform</h3> */}
            <h3>Balance Payment Platform</h3>

            <div className="hidden_fields">
              <input type="hidden" name="key" value={key} />
              <input type="hidden" name="txnid" value={txnid} />
              <input type="hidden" name="appname" value="battery" />
              {/* <input type="hidden" name="firstname" value="Ashish" /> */}
              <input type="hidden" name="productinfo" value="iPhone" />
              {/*<input type="hidden" name="lastname" value="Kumar" /> */}
              <input
                type="hidden"
                name="surl"
                value={Commonurl+"/payment"}
              />
              <input
                type="hidden"
                name="furl"
                value={Commonurl+"/paymentfailed"}
              />
              <input type="hidden" name="hash" value={hash} />
            </div>

            <div className="mb-3">
              <label>Select Portal</label>
              <Select options={options} onChange={changeForm} />
            </div>
            <div className={showdiv + " payuform"}>
              <div className="mb-3">
                <label htmlFor="regemail"> Registered Email ID </label>
                <input
                  type="email"
                  id="regemail"
                  name="email"
                  className="form-control"
                  placeholder="Enter register e-mail.."
                  onChange={(e) => {
                    setEmail(e.target.value);
                    // console.log(e.target.value);
                    sethash(
                      sha512(
                        key +
                        "|" +
                        txnid +
                        "|" +
                        amount +
                        "|" +
                        productinfo +
                        "|" +
                        firstname +
                        "|" +
                        e.target.value +
                        "|||||||||||" +
                        SALT
                      )
                    );
                  }}
                  required
                />
                <i
                  class="fa fa-search searchdata"
                  aria-hidden="true"
                  onClick={getData}
                ></i>
                <span
                  style={{ color: "red", fontSize: "13px", fontWeight: "500" }}
                >
                  {errormeg}
                </span>
              </div>
              <div className="mb-3">
                <label htmlFor="companyname"> Name of Company </label>
                <input
                  type="text"
                  id="companyname"
                  className="form-control"
                  name="firstname"
                  placeholder="Enter company name.."
                  value={firstname}
                  onChange={(e) => {
                    setfirstname(e.target.value);
                    sethash(
                      sha512(
                        key +
                        "|" +
                        txnid +
                        "|" +
                        amount +
                        "|" +
                        productinfo +
                        "|" +
                        e.target.value +
                        "|" +
                        email +
                        "|||||||||||" +
                        SALT
                      )
                    );
                  }}
                  required
                />
              </div>

              <div className="mb-3">
                {/* <label htmlFor="transid"> Transaction ID </label> */}
                <input
                  type="hidden"
                  id="transid"
                  className="form-control"
                  placeholder="xxxx-xxxx-xxxx"
                  name="txnid"
                  value={txnid}
                  onChange={(e) => {
                    setTxnid(e.target.value);
                    sethash(
                      sha512(
                        key +
                        "|" +
                        e.target.value +
                        "|" +
                        amount +
                        "|" +
                        productinfo +
                        "|" +
                        firstname +
                        "|" +
                        email +
                        "|||||||||||" +
                        SALT
                      )
                    );
                  }}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="paidamount"> Amount (Rs) </label>
                <input
                  type="text"
                  id="paidamount"
                  name="paidamount"
                  className="form-control"
                  placeholder="Enter amount.."
                  value={paidamount}
                  onChange={(e) => {
                    setPaidAmount(e.target.value);
                  }}
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label htmlFor="amount"> Balance Amount (Rs) </label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  className="form-control"
                  placeholder="Enter amount.."
                  onChange={(e) => {
                    setAmount(e.target.value);
                    sethash(
                      sha512(
                        key +
                        "|" +
                        txnid +
                        "|" +
                        e.target.value +
                        "|" +
                        productinfo +
                        "|" +
                        firstname +
                        "|" +
                        email +
                        "|||||||||||" +
                        SALT
                      )
                    );
                  }}
                  required
                />
              </div>

              <div className="mb-3 text-center">
                <input
                  type="submit"
                  name="initiate"
                  value={"Initiate Payment"}
                  className="btn btn-success"
                // onClick={submitData}
                />
              </div>
            </div>
          </form>

          {/* <form action="https://test.payu.in/_payment" method="post">
        <input type="hidden" name="key" value="99sCa8" />
        <input type="hidden" name="txnid" value="t6svtqtjRdl4ws" />
        <input type="hidden" name="productinfo" value="iPhone" />
        <input type="hidden" name="amount" value="10" />
        <input type="hidden" name="email" value="test@gmail.com" />
        <input type="hidden" name="firstname" value="Ashish" />
        <input type="text" name="lastname" />
        <input
          type="hidden"
          name="surl"
          value="https://apiplayground-response.herokuapp.com/"
        />
        <input
          type="hidden"
          name="furl"
          value="https://apiplayground-response.herokuapp.com/"
        />
        <input type="hidden" name="phone" value="9988776655" />
        <input
          type="hidden"
          name="hash"
          // value={sha512(merchantkey + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|' + udf1 + '|' + udf2 + '|||||||||' + salt)}.
          value={hashvalue}
        />
        <input type="submit" value="submit" />
      </form> */}
        </div>
      </div>
    </>
  );
};

export default Home;
