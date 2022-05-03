import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const SellerEdit = (props) => {
    const { username, password, usertype, user_id, seller_id } = useParams();
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState(true);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [passwordui, setPassword] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [contactNumber, setContactNumber] = useState('');


    async function updateSellerFetchHandler(updatedSeller) {
        const response = await fetch(`http://localhost:8080/seller/update/${updatedSeller.id}`, {
            method: 'POST',
            body: JSON.stringify(updatedSeller),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            toast.success("Seller updated successfully!!");
            //navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            toast.error("Seller updation failed.");
            setUpdateStatus(false);
        }
    }

    const updateSellerHandler = (event) => {
        //cal the API to update seller info
        event.preventDefault();
        const updatedSeller = {
            id: +seller_id,
            user: {
                id: +user_id,
                firstName: event.target[1].value,
                lastName: event.target[2].value,
                userName: event.target[3].value,
                password: event.target[4].value,
                email: event.target[0].value,
                dateOfBirth: event.target[6].value,
                contactNumber: event.target[7].value,
            },
            address: event.target[5].value,
        }
        updateSellerFetchHandler(updatedSeller);
    }
    async function getSellerFetchHandler(seller_id) {
        const sellerFetch = await fetch(`http://localhost:8080/seller/find/${seller_id}`);
        const sellerFetchedData = await sellerFetch.json();
        console.log(sellerFetchedData);
        setFirstName(sellerFetchedData.user.firstName);
        setLastName(sellerFetchedData.user.lastName);
        setUserName(sellerFetchedData.user.userName);
        setPassword(sellerFetchedData.user.password);
        setEmail(sellerFetchedData.user.email);
        setDateOfBirth(sellerFetchedData.user.dateOfBirth);
        setContactNumber(sellerFetchedData.user.contactNumber);
        setAddress(sellerFetchedData.address);
    }

    useEffect(()=>{
        if(seller_id){
            getSellerFetchHandler(seller_id);
        }
    },[])

    const goToDashboardHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
    }
    
    return (
        <Fragment>
            <div className="container">
            <h3>Edit the information for Seller {firstName} {lastName}</h3>
            <form onSubmit = {updateSellerHandler}>

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
                        value={passwordui}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "address" className="col-sm-2 col-form-label">Address:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="address " 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="Enter Address"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "dateOfBirth" className="col-sm-2 col-form-label">Date of Birth:</label>
                    <div className="col-sm-10">
                        <input type="date" 
                        className="form-control col-4" 
                        id="dateOfBirth " 
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
                
                
                <button className="btn btn-primary" type = "submit">Update Seller</button>
                <button className="btn btn-primary m-3" type = "submit" onClick={goToDashboardHandler}>Go to Dashboard</button>
            </form>
            {!updateStatus && <span>Update failed</span>}
            </div>
        </Fragment>
    )
}   

export default SellerEdit;
