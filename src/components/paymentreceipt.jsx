import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import companyLogo from "../assets/cpcb.jpg";
import jsPDF from "jspdf";

const Payment = () => {
  const [searchParams] = useSearchParams();
  let useremail = searchParams.get("email");

  const [paymentsatus, setPaymentstatus] = useState("");
  const [paymentmdg, setPaymentmsg] = useState("");
  const [conpanyname, setconpanyname] = useState("");
  const [transid, settransid] = useState("");
  const [transdate, settransdate] = useState("");
  const [address, setaddress] = useState("");
  const [usermail, setuseremail] = useState("");
  const [paidamount, setpaidamount] = useState("");

  // const article = { title: "React POST Request Example" };
  useEffect(() => {
    axios
      .post("http://localhost:8080/getuserreciept", { email: useremail })
      .then((response) => {
        console.log("response ", response.data);
        setconpanyname(response.data.result[0].name);
        settransid(response.data.result[0].trxnid);
        settransdate(response.data.result[0].created_at);
        setaddress(
          response.data.result[0].reg_address +
            ", " +
            response.data.result[0].district_name +
            ", " +
            response.data.result[0].state_name
        );
        setuseremail(response.data.result[0].email);
        setpaidamount(response.data.result[0].amount);
        // setPaymentmsg(response.data.data[0].message)
      })
      .catch((error) => {
        // this.setState({ errorMessage: error.message });
        console.error("There was an error!", error);
      });
  });
  const Print = () => {
    //console.log('print');
    let printContents = document.getElementById("payment-receipt").innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };

  const reportTemplateRef = useRef(null);

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      // orientation: 'landscape',
      unit: "pt",
      format: "a4",
      lineHeight: 0.2,
    });

    // Adding the fonts.
    // doc.setFont('Inter-Regular', 'normal');
    // doc.setFont('Inter-Regular', 'normal');
    // doc.setFontSize(9);
    doc.setFontSize(50);

    doc.html(reportTemplateRef.current, {
      async callback(doc) {
        await doc.save("document" + new Date());
      },
    });
  };

  return (
    <>
      {/* <div className="card payment-failed"> */}
      <div className="auth-wrapper" id="payment-receipt">
        <div className="container mt-6 mb-7" style={{ margin: "auto" }}>
          <div className="row justify-content-center">
            <div className="col-lg-12 col-xl-7">
              <div className="card payment-card">
                <div className="pdf-data" ref={reportTemplateRef}>
                  <div className="logo-div">
                    <img
                      src={companyLogo}
                      alt="BigCo Inc. logo"
                      className="receipt-logo"
                    />
                    <p>Central Pollution Control Board</p>
                    <h4>Payment Details</h4>
                  </div>
                  <div className="payment-content mt-5">
                    <div className="row">
                      <div className="col-md-4 mb-2">
                        <strong>Company's Name: </strong>
                      </div>
                      <div className="col-md-8">{conpanyname}</div>

                      <div className="col-md-4 mb-4">
                        <strong>Transaction ID: </strong>
                      </div>

                      <div className="col-md-8">{transid}</div>

                      <div className="col-md-4 mb-2">Date:</div>
                      <div className="col-md-8">{transdate}</div>

                      <div className="col-md-4 mb-2">Address:</div>
                      <div className="col-md-8">{address}</div>

                      <div className="col-md-4 mb-2">Email:</div>
                      <div className="col-md-8">{usermail}</div>

                      <div className="col-md-4 mb-2">Total Amount Paid:</div>
                      <div className="col-md-8">{paidamount}</div>

                      <div className="col-md-4 mb-2">
                        Total GSTR 9 Balance Sheet of Previous Financial Year:
                      </div>
                      <div className="col-md-8">No data</div>

                      <br />

                      <p className="mt-5">
                        <strong>Address:</strong> Parivesh Bhawan, East Arjun
                        Nagar, Delhi - 110032
                      </p>
                      <p>
                        <strong>Email:</strong>{" "}
                        <a href="mailto:battry.cpcb@gov.in">
                          battry.cpcb@gov.in
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="print-button">
                  <button
                    className="btn btn-success receipt-btn"
                    onClick={Print}
                  >
                    Print Receipt
                  </button>
                  <button className="btn btn-success receipt-btn" onClick={handleGeneratePdf}>
                    Save as PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
