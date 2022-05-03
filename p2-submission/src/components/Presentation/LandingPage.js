import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../store/context";

const LandingPage = (props) => {
    const authCtx = useContext(AuthContext);
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[usertype, setUsertype] = useState('');
    const[buyer_id, setBuyerId] = useState('');
    const[loginFailed, setLoginFailed] = useState(false);
    const[signUpFailed, setSignUpFailed] = useState(null);
    
    const sellerAuthInfoDemo = {
        id: 6,
        user: {
            id: 23,
            firstName: "Tarcisius",
            lastName: "Hartanto",
            userName: "tarcih",
            password: "somepassword",
            email: "tarcih@uw.edu",
            dateOfBirth: null,
            contactNumber: null,
            createdOn: null
        },
        address: "19128 112TH AVE NE #312"
    }

    const buyerAuthInfoDemo = {
        id: 8,
        user: {
            id: 8,
            firstName: "updatedFirstNameNew",
            lastName: "postm",
            userName: "usernameupdated",
            password: null,
            email: null,
            dateOfBirth: null,
            contactNumber: null,
            createdOn: null
        },
        billingAddress: "Indore, MP, India",
        shippingAddress: "Mumbai, MH, India"
    }

    const navigate = useNavigate();

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const usertypeChangeHandler = (event) => {
        setUsertype(event.target.value);
    }

    async function getUserLoggedInDataHandler(userNameOrEmail, password, userType) {

    }

    async function authLoginHandler(loginData) {
        const response = await fetch(`http://localhost:8080/api/auth/login`, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
            toast.success("Login done successfully!");
            setLoginFailed(false);
            // get the data by using the username and password
            const userType = (loginData.isBuyer) ? "BUYER": "SELLER";
            // //
            const buyer_id = data.id;
            console.log(">>>> "+ data.id);
            const userAuthInfoDemo = data; //change this line to get the actual data of the user loggeed inn
            setBuyerId(data.id);
            // //
            authCtx.onLogin(loginData.userNameOrEmail, loginData.password, userType, userAuthInfoDemo);
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            toast.error("Invalid credentials entered!");
            // console.log("goes right here");
            // return "FAIL"
            // console.log("goes here");
            setLoginFailed(true);
        }
        //
    }

    const loginSubmitHandler = (event) => {
        event.preventDefault();
        // setUsername('');
        // setPassword('');
        
        const loginData = {
            userNameOrEmail: event.target[0].value,
            password: event.target[1].value,
            isBuyer: event.target[2].value === 'BUYER',
        }
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        console.log(event.target[2].value);
        // authCtx.onLogin(event.target[0].value, event.target[1].value, event.target[2].value, buyerAuthInfoDemo);
        // navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        authLoginHandler(loginData);
    }

    async function signUpFetchHandler(newUserInfo) {
        const response = await fetch(`http://localhost:8080/api/auth/signup`, {
            method: 'POST',
            body: JSON.stringify(newUserInfo),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        console.log(data);
        if (response.ok) {
            setSignUpFailed(false);
            toast.success("User created! Please login.");
            // get the data by using the username and password
            // const userType = (loginData.isBuyer) ? "BUYER": "SELLER";
            // const userAuthInfoDemo = (loginData.isBuyer) ? buyerAuthInfoDemo : sellerAuthInfoDemo;
            // authCtx.onLogin(loginData.userNameOrEmail, loginData.password, userType, userAuthInfoDemo);
            // navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            toast.error("User registration failed due to duplicate email or username. Please change them.");
            // console.log("goes right here");
            // return "FAIL"
            // console.log("goes here");
            setSignUpFailed(true);
        }
    }

    const signUpsubmitHandler = (event) => {
        event.preventDefault();
        const newUserInfo = {
            firstName: event.target[0].value,
            lastName: event.target[1].value,
            userName: event.target[2].value,
            email: event.target[3].value,
            password: event.target[4].value,
            isBuyer: (event.target[5].value === 'BUYER'),
            billingAddress: event.target[6].value,
            shippingAddress: event.target[7].value,
        }
        event.target[0].value = '';
        event.target[1].value = '';
        event.target[2].value = '';
        event.target[3].value = '';
        event.target[4].value = '';
        event.target[5].value = '';
        event.target[6].value = '';
        event.target[7].value = '';
        signUpFetchHandler(newUserInfo);
    }
    
    return (
        <div className="container">
            <h1>Login</h1>
            <form onSubmit = {loginSubmitHandler}>
            
            <div className="form-group row">
                <label forhtml = "username" className="col-sm-2 col-form-label">Username:</label>
                <div className="col-sm-10">
                <input type = "text" id = "username" onChange = {usernameChangeHandler} 
                value = {username} placeholder="Enter User Name"
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "password" className="col-sm-2 col-form-label">Password:</label>
                <div className="col-sm-10">
                <input type = "password" id = "password" onChange = {passwordChangeHandler} 
                value = {password} placeholder="Enter Password"
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "usertype" className="col-sm-2 col-form-label">User Type:</label>
                <div className="col-sm-10">
                <select name = "usertype" id = "usertype" onChange = {usertypeChangeHandler}
                className="form-select ddl">
                    <option value="Select User Type">Select User Type</option>
                    <option value="BUYER">Buyer</option>
                    <option value="SELLER">Seller</option>
                </select>
                </div>
            </div>
                <button className="btn btn-primary" type = "submit">
                    Login
                </button>
            </form>
            {/* {loginFailed && <span>Login Failed, account does not exist</span>} */}
            
            <h1 className="signup-header">Sign Up</h1>
            <form onSubmit = {signUpsubmitHandler}>
            <div className="form-group row">
                <label forhtml = "firstname" className="col-sm-2 col-form-label">First Name:</label>
                <div className="col-sm-10">
                <input type = "text" id = "firstname" placeholder="Enter First Name"
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "lastname" className="col-sm-2 col-form-label">Last Name:</label>
                <div className="col-sm-10">
                <input type = "text" id = "lastname"placeholder="Enter Last Name"
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "username_signup" className="col-sm-2 col-form-label">Username:</label>
                <div className="col-sm-10">
                <input type = "text" id = "username_signup" className="form-control col-4"
                placeholder="Enter User Name"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "email" className="col-sm-2 col-form-label">Email:</label>
                <div className="col-sm-10">
                <input type = "text" id = "email" className="form-control col-4"
                placeholder="Enter Email"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "password_signup" className="col-sm-2 col-form-label">Password:</label>
                <div className="col-sm-10">
                <input type = "password" id = "password_signup"className="form-control col-4"
                placeholder="Enter Password"/>
                </div>
            </div>


            <div className="form-group row">
                <label forhtml = "usertype_signup" className="col-sm-2 col-form-label">Create Account For:</label>
                <div className="col-sm-10">
                <select name = "usertype" id = "usertype" onChange = {usertypeChangeHandler}
                className="form-select ddl">
                    <option value="Select User Type">Select User Type</option>
                    <option value="BUYER">Buyer</option>
                    <option value="SELLER">Seller</option>
                </select>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "billing" className="col-sm-2 col-form-label">Billing Address:</label>
                <div className="col-sm-10">
                <input type = "text" id = "billing"className="form-control col-4"
                placeholder="Enter Billing Address"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "shipping" className="col-sm-2 col-form-label">Shipping Address:</label>
                <div className="col-sm-10">
                <input type = "text" id = "shipping"className="form-control col-4"
                placeholder="Enter Shipping Address"/>
                </div>
            </div>
                <button className="btn btn-primary" type = "submit">
                    Sign Up
                </button>
            </form>
            {/* {signUpFailed && <span>Fail</span>} */}
        </div>
    );
}

export default LandingPage;