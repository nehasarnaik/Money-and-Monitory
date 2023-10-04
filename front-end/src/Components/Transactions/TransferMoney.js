import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../script.css'
import NavBarUser from "../Navbar/NavBarUser";
import NavbarFunctions from "../Navbar/NavbarFunctions";
import "../script.css"

export default function TransferMoney() {
    
    const [payment, setPayment] = useState({
        receiverAccountNumber: "",
        amount: "",
        cvv: ""
      });

    let navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPayment({ ...payment, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        navigate("/paymentgateway");
    };

    return ( 
    <div>
        <div>
        <NavBarUser />
        <NavbarFunctions />
        </div>
        <form onSubmit={onSubmit}>
            <div className="card-body form_width ">
                <h2 className="top">Make Payment</h2>
                <div className="row">
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <label className="label youraccount">Your Account Number</label>
                            <input 
                            type="text"
                            value="default value"
                            name="senderAccountNumber"
                            onChange={(e) => handleChange(e)}
                            className="form-control" 
                            placeholder="Account Number"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <label className="label">Receiver's Account Number</label>
                            <input 
                            type="text"
                            name="receiverAccountNumber"
                            value={payment.receiverAccountNumber}
                            onChange={(e) => handleChange(e)}
                            className="form-control" 
                            placeholder="Account Number"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <label className="label amount">Amount to Pay</label>
                            <input 
                            type="text"
                            name="amount"
                            value={payment.amount}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Enter Amount"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <label className="label cardnumber">Your Card Number</label>
                            <input 
                            type="text"
                            value="default value"
                            name="cardNumber"
                            className="form-control" 
                            placeholder="Card Number"
                            required></input>
                        </div>
                    </div>
                    <div className="col-lg-12 padding">
                        <div className="form-group">
                            <label className="label cvv">Your Card CVV</label>
                            <input 
                            type="text"
                            name="cvv"
                            value={payment.cvv}
                            onChange={e=>handleChange(e)}
                            className="form-control" 
                            placeholder="Enter CVV"
                            required></input>
                        </div>
                    </div>
                    </div>
                <button className="btn btn-light button" type="submit">Proceed</button>
            </div>
        </form>
    </div> 
    );
}
