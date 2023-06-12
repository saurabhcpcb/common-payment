import Select from "react-select";
import { useState } from "react";
import sha512 from "js-sha512";
import axios from "axios";

const Home = () => {
  const [showdiv, setShowDiv] = useState("");
  const [hashvalue, setHashvalue] = useState("");
  const [companyname, setcompanyname] = useState("");
  const [regemail, setregemail] = useState("");
  const [trxnid, settrxnid] = useState("");
  const [getamount, setamount] = useState("");
  // const [hashvalue, setHashvalue] = useState("");
  // const [hashvalue, setHashvalue] = useState("");

  const options = [
    { value: "battry", label: "Battry Portal PayU" },
    { value: "select1", label: "Select 1" },
    { value: "select2", label: "Select 2" },
  ];

  const changeForm = (event) => {
    if (event.value === "battry") {
      setShowDiv("showdiv");
    } else {
      setShowDiv("");
    }
  };

  let merchantkey = "Q37iqkUXYd9lwrRyEK9KOHVUena3t2Xb";
  let txnid = "testjhghj156";
  let amount = 500;
  let productinfo = "test";
  let firstname = "Saurabh";
  let email = "sp27243@gmail.com";
  let udf1 = "test";
  let udf2 = "test";
  let salt = "Q37iqkUXYd9lwrRyEK9KOHVUena3t2Xb";

  return (
    <>
      <form method="post" action="https://test.payu.in/_payment">
        <div className="mb-3 text-center">
          <img alt="not found" width={"150px"} src={"assets/img/cpcb.jpg"} />
        </div>
        <h3>Common Payment Initiation Platform</h3>

        <div className="hidden_fields">
          <input type="hidden" name="key" value="99sCa8" />
          <input type="hidden" name="txnid" value="t6svtqtjRdl4ws" />
          {/* <input type="hidden" name="firstname" value="Ashish" /> */}
          <input type="hidden" name="productinfo" value="iPhone" />
          {/*<input type="hidden" name="lastname" value="Kumar" /> */}
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
          <input type="hidden" name="hash" value={hashvalue} />
        </div>

        <div className="mb-3">
          <label>Select Portal</label>
          <Select options={options} onChange={changeForm} />
        </div>
        <div className={showdiv + " payuform"}>
          <div className="mb-3">
            <label htmlFor="companyname"> Name of Company </label>
            <input
              type="text"
              id="companyname"
              className="form-control"
              name="firstname"
              placeholder="Enter company name.."
              onChange={(e) => {
                setcompanyname(e.target.value);
                let hashSequence =
                  merchantkey +
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
                  "|" +
                  udf1 +
                  "|" +
                  udf2 +
                  "|||||||||" +
                  salt;
                setHashvalue(
                  "a64f069037f2f9bbd3d5c37783defefd84258e6fe5d3812b484177e3a321b626d798f44e744c17f5865519272c25d5f77a3c8978e5c307b0da58a74d75a4eab8"
                );
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="regemail"> Registered Email ID </label>
            <input
              type="email"
              id="regemail"
              name="email"
              className="form-control"
              placeholder="Enter register e-mail.."
              onChange={(e) => {
                setregemail(e.target.value);
                let hashSequence =
                  merchantkey +
                  "|" +
                  trxnid +
                  "|" +
                  amount +
                  "|" +
                  productinfo +
                  "|" +
                  companyname +
                  "|" +
                  e.target.value +
                  "|" +
                  udf1 +
                  "|" +
                  udf2 +
                  "|||||||||" +
                  salt;
                setHashvalue(
                  "a64f069037f2f9bbd3d5c37783defefd84258e6fe5d3812b484177e3a321b626d798f44e744c17f5865519272c25d5f77a3c8978e5c307b0da58a74d75a4eab8"
                );
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="transid"> Transaction ID </label>
            <input
              type="text"
              id="transid"
              className="form-control"
              placeholder="xxxx-xxxx-xxxx"
              onChange={(e) => {
                settrxnid(e.target.value);
                let hashSequence =
                  merchantkey +
                  "|" +
                  e.target.value +
                  "|" +
                  amount +
                  "|" +
                  productinfo +
                  "|" +
                  companyname +
                  "|" +
                  regemail +
                  "|" +
                  udf1 +
                  "|" +
                  udf2 +
                  "|||||||||" +
                  salt;
                setHashvalue(
                  "a64f069037f2f9bbd3d5c37783defefd84258e6fe5d3812b484177e3a321b626d798f44e744c17f5865519272c25d5f77a3c8978e5c307b0da58a74d75a4eab8"
                );
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="amount"> Amount (Rs) </label>
            <input
              type="text"
              id="amount"
              name="amount"
              className="form-control"
              placeholder="Enter amount.."
              onChange={(e) => {
                setamount(e.target.value);
                let hashSequence = companyname + "|" + trxnid + "|" + e.target.value + "|" + productinfo + "|" + firstname + "|" + regemail + "|" + udf1 + "|" + udf2 + "|||||||||" + salt;
                setHashvalue(
                  "a64f069037f2f9bbd3d5c37783defefd84258e6fe5d3812b484177e3a321b626d798f44e744c17f5865519272c25d5f77a3c8978e5c307b0da58a74d75a4eab8"
                );
              }}
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

      <form action="https://test.payu.in/_payment" method="post">
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
          value={sha512(merchantkey + '|' + txnid + '|' + amount + '|' + productinfo + '|' + firstname + '|' + email + '|' + udf1 + '|' + udf2 + '|||||||||' + salt)}
        />
        <input type="submit" value="submit" />{" "}
      </form>
    </>
  );
};

export default Home;
