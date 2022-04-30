import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/context";

const LandingPage = (props) => {
    const authCtx = useContext(AuthContext);
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[usertype, setUsertype] = useState('');
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
            setLoginFailed(false);
            // get the data by using the username and password
            const userType = (loginData.isBuyer) ? "BUYER": "SELLER";
            // //
            const userAuthInfoDemo = data; //change this line to get the actual data of the user loggeed inn
            // //
            authCtx.onLogin(loginData.userNameOrEmail, loginData.password, userType, userAuthInfoDemo);
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
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
        // console.log(loginStatus);
        // console.log(loginFailed);
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
            // get the data by using the username and password
            // const userType = (loginData.isBuyer) ? "BUYER": "SELLER";
            // const userAuthInfoDemo = (loginData.isBuyer) ? buyerAuthInfoDemo : sellerAuthInfoDemo;
            // authCtx.onLogin(loginData.userNameOrEmail, loginData.password, userType, userAuthInfoDemo);
            // navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
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
        <div>
            <h1>Login</h1>
            <form onSubmit = {loginSubmitHandler}>
                <label forhtml = "username">Username:</label>
                <input type = "text" id = "username" onChange = {usernameChangeHandler} value = {username}/>
                <br />
                <label forhtml = "password">Password:</label>
                <input type = "password" id = "password" onChange = {passwordChangeHandler} value = {password}/>
                <br />
                <label forhtml = "usertype">Login as:</label>
                <select name = "usertype" id = "usertype" onChange = {usertypeChangeHandler}>
                    <option value=""></option>
                    <option value="BUYER">Buyer</option>
                    <option value="SELLER">Seller</option>
                </select>
                <br />
                <button type = "submit">
                    Login
                </button>
            </form>
            {loginFailed && <span>Login Failed, account does not exist</span>}
            <h1>Sign Up</h1>
            <form onSubmit = {signUpsubmitHandler}>
                <label forhtml = "firstname">First Name:</label>
                <input type = "text" id = "firstname"/>
                <br />
                <label forhtml = "lastname">Last Name:</label>
                <input type = "text" id = "lastname"/>
                <br />
                <label forhtml = "username_signup">Username:</label>
                <input type = "text" id = "username_signup"/>
                <br />
                <label forhtml = "email">Email:</label>
                <input type = "text" id = "email"/>
                <br />
                <label forhtml = "password_signup">Password:</label>
                <input type = "password" id = "password_signup"/>
                <br />
                <label forhtml = "usertype_signup">Create Account For:</label>
                <select name = "usertype" id = "usertype_signup">
                    <option value=""></option>
                    <option value="BUYER">Buyer</option>
                    <option value="SELLER">Seller</option>
                </select>
                <br />
                <label forhtml = "billing">Billing Address:</label>
                <input type = "text" id = "billing"/>
                <br />
                <label forhtml = "shipping">Shipping Address:</label>
                <input type = "text" id = "shipping"/>
                <br />
                <button type = "submit">
                    Sign Up
                </button>
            </form>
            {signUpFailed && <span>Fail</span>}
        </div>
    );
}

export default LandingPage;