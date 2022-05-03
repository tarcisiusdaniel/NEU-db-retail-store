import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const BuyerEdit = (props) => {
    const { username, password, usertype, user_id, buyer_id } = useParams();
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordui, setPassword] = useState('');
    const [billingAddress, setBillingAddress] = useState('');
    const [shippingAddress, setShippingAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [contactNumber, setContactNumber] = useState('');


    async function updateBuyerFetchHandler(updatedBuyer) {
        const response = await fetch(`http://localhost:8080/buyer/update/${updatedBuyer.id}`, {
            method: 'POST',
            body: JSON.stringify(updatedBuyer),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            toast.success("Details updated successfully!!");
            //navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            toast.error("Details updation failed.");
            setUpdateStatus(false);
        }
    }

    const updateBuyerHandler = (event) => {
        //cal the API to update buyer info
        event.preventDefault();
        const updatedBuyer = {
            id: +buyer_id,
            user: {
                id: +user_id,
                firstName: event.target[1].value,
                lastName: event.target[2].value,
                userName: event.target[3].value,
                password: event.target[4].value,
                email: event.target[0].value,
                dateOfBirth: event.target[7].value,
                contactNumber: event.target[8].value,
            },
            billingAddress: event.target[5].value,
            shippingAddress: event.target[6].value,
        }
        updateBuyerFetchHandler(updatedBuyer);
    }
    async function getBuyerFetchHandler(buyer_id) {
        const buyerFetch = await fetch(`http://localhost:8080/buyer/find/${buyer_id}`);
        const buyerFetchedData = await buyerFetch.json();
        console.log(buyerFetchedData);
        setFirstName(buyerFetchedData.user.firstName);
        setLastName(buyerFetchedData.user.lastName);
        setUserName(buyerFetchedData.user.userName);
        setPassword(buyerFetchedData.user.password);
        setEmail(buyerFetchedData.user.email);
        setDateOfBirth(buyerFetchedData.user.dateOfBirth);
        setContactNumber(buyerFetchedData.user.contactNumber);
        setBillingAddress(buyerFetchedData.billingAddress);
        setShippingAddress(buyerFetchedData.shippingAddress);
    }

    useEffect(()=>{
        if(buyer_id){
            getBuyerFetchHandler(buyer_id);
        }
    },[])

    const goToDashboardHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
    }

    const viewCartHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/brid=+${buyer_id}/cart/view`);
    }

    return (
        <Fragment>
            <div className="container">
            <h3>Edit the information for Buyer {firstName} {lastName}</h3>
            <form onSubmit = {updateBuyerHandler}>

                <div className="form-group row">
                    <label forhtml = "email" className="col-sm-2 col-form-label">Email:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="email " 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "firstName" className="col-sm-2 col-form-label">First Name:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="firstName " 
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="Enter First Name"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "lastName" className="col-sm-2 col-form-label">Last Name:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="lastName " 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Enter Last Name"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "userName" className="col-sm-2 col-form-label">User Name:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="userName " 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Enter User Name"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "password" className="col-sm-2 col-form-label">Password:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="password " 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "billingAddress" className="col-sm-2 col-form-label">Billing Address:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="billingAddress" 
                        value={billingAddress}
                        onChange={(e) => setBillingAddress(e.target.value)}
                        placeholder="Enter Billing Address"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "shippingAddress" className="col-sm-2 col-form-label">Shipping Address:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="shippingAddress" 
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        placeholder="Enter Shipping Address"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "dateOfBirth" className="col-sm-2 col-form-label">Date of Birth:</label>
                    <div className="col-sm-10">
                        <input type="date" 
                        className="form-control col-4" 
                        id="dateOfBirth" 
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        placeholder="Enter Date of Birth"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "contactNumber" className="col-sm-2 col-form-label">Contact Number:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="contactNumber " 
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="Enter Contact number"/>
                    </div>
                </div>
                
                
                <button className="btn btn-primary" type = "submit">Update Details</button>
                <button className="btn btn-primary m-3" onClick = {viewCartHandler}>Edit Cart</button>
                <button className="btn btn-primary" type = "submit" onClick={goToDashboardHandler}>Go to Dashboard</button>
            </form>
            {!updateStatus && <span>Update failed</span>}
            </div>
        </Fragment>
    )
}   

export default BuyerEdit;
