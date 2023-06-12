import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import {Commonurl} from "./commonurl";

const Payment = () => {
  const [searchParams] = useSearchParams();
  let useremail = searchParams.get("email");

  const [paymentsatus, setPaymentstatus] = useState("");
  const [paymentmdg, setPaymentmsg] = useState("");

  // const article = { title: "React POST Request Example" };
  useEffect(() => {
    axios
      .post(Commonurl+"/getpaymentdata", { email: useremail })
      .then((response) => {
        // console.log("response ", response.data.data[0].status);
        setPaymentstatus(response.data.data[0].status);
        setPaymentmsg(response.data.data[0].message);
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  }, []);

  // console.log("paymentsatus ", paymentsatus);
  // if (paymentsatus === "success") {
  //   // console.log("response data");
    setTimeout(function () {
      window.location.replace("http://103.7.181.103:3000/paymentreceipt?email=" + useremail);
      // console.log('paymentsatus if ', paymentsatus);
    }, 5000);
  // } else {
  //   // setTimeout(function () {
  //     // window.location.replace("http://localhost:3000/paymentreceipt?email=" + useremail);
  //   console.log('paymentsatus else ', paymentsatus);
  //   // }, 5000);
  // }

  return (
    <>
      <div className="auth-wrapper">
        <div className="auth-inner">
          
            <div className="card payment-success">
              <div
                style={{
                  borderRadius: "200px",
                  height: "200px",
                  width: "200px",
                  background: "#F8FAF5",
                  margin: "0 auto",
                }}
              >
                <i className="checkmark">✓</i>
              </div>
              <h1>Success</h1>
              <p>{paymentmdg}</p>
              <div>
                
              </div>
            </div>
          
        </div>
      </div>
    </>
  );
};

export default Payment;
