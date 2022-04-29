import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../store/context";
import Buyer from "./Buyer/Buyer";
import Seller from "./Seller/Seller";

const UserLandingPage = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();

    const logoutHandler = () => {
        // code to logout
        authCtx.onLogout();
        navigate('/');
    }

    return (
        <div>
            {authCtx.userType === 'BUYER' ? 
                <Buyer 
                    buyerName = {authCtx.userAuthInfo.firstName}
                    buyerInfo = {authCtx.userAuthInfo}
                /> 
                : 
                <Seller 
                    sellerName = {authCtx.userAuthInfo.firstName} 
                    sellerInfo = {authCtx.userAuthInfo}
                /> 
            }
            <br />
            <button onClick = {logoutHandler}>Logout</button>
        </div>

    );
}

export default UserLandingPage;