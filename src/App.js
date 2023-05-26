import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/home";
import Payment from "./components/paymentstatus";
import Paymentreceipt from "./components/paymentreceipt";
import Paymentfailed from "./components/paymentfailed";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/paymentstatus" element={<Payment />} />
          <Route exact path="/paymentreceipt" element={<Paymentreceipt />} />
          <Route exact path="/paymentfailed" element={<Paymentfailed />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
