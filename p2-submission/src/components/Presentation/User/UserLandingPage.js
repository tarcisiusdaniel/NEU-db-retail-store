import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, CartContext } from "../../../store/context";
import Buyer from "./Buyer/Buyer";
import Seller from "./Seller/Seller";

const UserLandingPage = (props) => {
    const cartCtx = useContext(CartContext);
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        // code to logout
        if (authCtx.userType === 'BUYER') {

        }
        authCtx.onLogout();
        navigate('/');
    }

    // console.log(authCtx.userAuthInfo);

    return (
        <div>
            {authCtx.userType === 'BUYER' ? 
                <Buyer 
                    // buyerName = {authCtx.userAuthInfo.user.firstName}
                    // buyerInformation = {authCtx.userAuthInfo}
                /> 
                : 
                <Seller 
                    // sellerName = {authCtx.userAuthInfo.user.firstName}
                    // sellerInformation = {authCtx.userAuthInfo}
                /> 
            }
            <br />
            <button onClick = {logoutHandler}>Logout</button>
        </div>

    );
}

export default UserLandingPage;