import { React, Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
import { dummyProducts, dummySellerInfo } from "../Dummies/DummyData";
import { AuthContext } from "../../../../store/context";

const Seller = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [sellerData, setSellerData] = useState({
        id: null,
        user: {
            id: null,
            email: null,
            firstName: null,
            lastName: null,
            userName: null,
            password: null,
        },
        address: null,
    });
    const [loadSellersProduct, setLoadSellersProduct] = useState(false);
    const [sellersProduct, setSellersProduct] = useState([]);

    async function sellerFetchHandler() {
        if (authCtx.userAuthInfo.id === undefined || authCtx.userAuthInfo.id === null ) {
            return;
        }
        setIsLoading(true);
        // console.log("hello from seller")
        // console.log(authCtx.userAuthInfo.id);
        const sellerFetch = await fetch(`http://localhost:8080/seller/find/${authCtx.userAuthInfo.id}`);
        const sellerFetchedData = await sellerFetch.json();
        // console.log(sellerFetchedData);
        setSellerData(sellerFetchedData);
        setIsLoading(false);
    }

    async function sellersProductFetchHandler() {
        if (authCtx.userAuthInfo.id === undefined || authCtx.userAuthInfo.id === null ) {
            return;
        }
        setLoadSellersProduct(true);
        const sellersProdFetch = await fetch(`http://localhost:8080/product/findBySellerId/${authCtx.userAuthInfo.id}`);
        const sellersProdData = await sellersProdFetch.json();
        // console.log(sellersProdData);
        setSellersProduct(sellersProdData);
        setLoadSellersProduct(false);
    }

    useEffect(() => {
        sellerFetchHandler();
        sellersProductFetchHandler();
    }, [authCtx]);

    const navigateToUpdateSellerHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/uid=+${authCtx.userAuthInfo.user.id}/acc_info/edit/slid=+${authCtx.userAuthInfo.id}`);
    }

    const navigateToAddProductHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/slid=+${authCtx.userAuthInfo.id}/product/add`);
    }

    const logoutHandler = () => {
        // code to logout
        if (authCtx.userType === 'BUYER') {

        }
        authCtx.onLogout();
        navigate('/');
    }

    return (
        <Fragment>
            <h1>Hello {sellerData.user.firstName}</h1>
            <div>
                <button className="btn btn-primary" onClick = {navigateToUpdateSellerHandler}>Update Seller Info</button>
                <button className="btn btn-primary m-3" onClick = {navigateToAddProductHandler}>Post Product</button>
                <button className="btn btn-primary" onClick = {logoutHandler}>Logout</button>
            </div>
            <br /><br />
                {
                    (isLoading && sellerData !== {}) ? 
                        <div>
                            <span>Loading...</span> 
                        </div>
                    :
                    <div>
                        <span>This is your seller account information:</span>
                        <div className="form-group row">
                            <label forhtml = "email" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-10">
                            <input type = "text" id = "email" 
                            value = {sellerData.user.email}readOnly
                            className="form-control col-4"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label forhtml = "firstname" className="col-sm-2 col-form-label">First Name:</label>
                            <div className="col-sm-10">
                            <input type = "text" id = "firstname" 
                            value = {sellerData.user.firstName}readOnly
                            className="form-control col-4"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label forhtml = "lastname" className="col-sm-2 col-form-label">Last Name:</label>
                            <div className="col-sm-10">
                            <input type = "text" id = "lastname" 
                            value = {sellerData.user.lastName}readOnly
                            className="form-control col-4"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label forhtml = "userName" className="col-sm-2 col-form-label">User Name:</label>
                            <div className="col-sm-10">
                            <input type = "text" id = "userName" 
                            value = {sellerData.user.userName}readOnly
                            className="form-control col-4"/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label forhtml = "address" className="col-sm-2 col-form-label">Address:</label>
                            <div className="col-sm-10">
                            <input type = "text" id = "address" 
                            value = {sellerData.address}readOnly
                            className="form-control col-4"/>
                            </div>
                        </div>
                    </div>
                }
            <br />
            <span>Your products:</span>
            <ul>
                { loadSellersProduct ? <span>Loading...</span> :
                sellersProduct.map((product) =>
                    <li key = {product.id}>
                        <Product prod = {product} sellerId = {sellerData.id}/>
                    </li>
                )
                }
            </ul>
        </Fragment>
    )
}

export default Seller;