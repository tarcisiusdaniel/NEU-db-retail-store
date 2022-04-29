import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../store/context";

const LandingPage = (props) => {
    const[username, setUsername] = useState('');
    const[password, setPassword] = useState('');
    const[usertype, setUsertype] = useState('');

    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const usernameChangeHandler = (event) => {
        setUsername(event.target.value);
    }

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }

    const usertypeChangeHandler = (event) => {
        console.log(event.target.value);
        setUsertype(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        // setUsername('');
        // setPassword('');
        const userAuthInfoDemo = {
            id: 1,
            firstName: 'Tarcisius',
            lastName: 'Hartanto',
            userName: event.target[0].value,
            password: event.target[1].value,
            billingData: 'billingData',
            email: 'tarcisiusdaniel@gmail.com',
            address: '10721 Meridian Ave N',
        }
        console.log(event.target[0].value);
        console.log(event.target[1].value);
        console.log(event.target[2].value);
        authCtx.onLogin(event.target[0].value, event.target[1].value, event.target[2].value, userAuthInfoDemo);
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
    }
    
    return (
        <div>
            <form onSubmit = {submitHandler}>
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
                    {/* <Link to = {`/un=+${username}/pw=+${password}/ut=+${usertype}`}> */}
                        Login
                    {/* </Link> */}
                </button>
            </form>
        </div>
    );
}

export default LandingPage;