import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, CartContext } from "../../../../store/context";
import { dummyProducts } from "../Dummies/DummyData";
import PurchasableProduct from "./PurchasableProduct";
import 'react-toastify/dist/ReactToastify.css';

const Buyer = (props) => {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const { username, password, usertype, buyer_id } = useParams();
    const [buyerInfo, setBuyerInfo] = useState({});
    const [purchasableProds, setPurchasableProds] = useState([]);
    const [loadingPurchasableProds, setLoadingPurchasableProds] = useState(false);
    // const userAuthInfoDemo = {
    //     firstName: 'Tarcisius',
    //     lastName: 'Hartanto',
    //     userName: event.target[0].value,
    //     password: event.target[1].value,
    //     billingData: 'billingData',
    //     email: 'tarcisiusdaniel@gmail.com',
    // }

    async function productsFetchHandler() {
        setLoadingPurchasableProds(true);
        const fetchProducts = await fetch('http://localhost:8080/product/findAll');
        const productsData = await fetchProducts.json();
        console.log(productsData);
        setPurchasableProds(productsData);
        setLoadingPurchasableProds(false);
    }

    useEffect(() => {
        productsFetchHandler();
    },[authCtx])

    const viewCartHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/brid=+${authCtx.userAuthInfo.id}/cart/view`);
    }

    const viewOrdersHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/brid=+${authCtx.userAuthInfo.id}/orders/view`);
    }

    const viewTransactionsHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/brid=+${authCtx.userAuthInfo.id}/transactions/view`);
    }

    const logoutHandler = () => {
        // code to logout
        if (authCtx.userType === 'BUYER') {

        }
        authCtx.onLogout();
        navigate('/');
    }

    const editViewHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/uid=+${authCtx.userAuthInfo.user.id}/acc_infoBuyer/edit/slid=+${authCtx.userAuthInfo.id}`);
    }

    return (
        <Fragment>
            <h2>Hello {authCtx.userAuthInfo.user.firstName}</h2>
            <div className="container">
                <button className="btn btn-primary" onClick = {viewCartHandler}>View Cart</button>
                <button className="btn btn-primary m-3" onClick = {viewOrdersHandler}>View Orders</button>
                <button className="btn btn-primary" onClick = {viewTransactionsHandler}>View Shipment details</button>
                <button className="btn btn-primary m-3" onClick = {editViewHandler}>Edit/View Account Details</button>
                <button className="btn btn-primary" onClick = {logoutHandler}>Logout</button>
            </div>
            <br></br>
            {/* <div className="container">
            <h3>This is your buyer account information:</h3>

            <div className="form-group row">
                <label forhtml = "email" className="col-sm-2 col-form-label">Email:</label>
                <div className="col-sm-10">
                <input type = "text" id = "username" 
                value = {authCtx.userAuthInfo.user.email} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "firstname" className="col-sm-2 col-form-label">First Name:</label>
                <div className="col-sm-10">
                <input type = "text" id = "firstname" 
                value = {authCtx.userAuthInfo.user.firstName} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "lastname" className="col-sm-2 col-form-label">Last Name:</label>
                <div className="col-sm-10">
                <input type = "text" id = "lastname" 
                value = {authCtx.userAuthInfo.user.lastName} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "username" className="col-sm-2 col-form-label">User Name:</label>
                <div className="col-sm-10">
                <input type = "text" id = "username" 
                value = {authCtx.userAuthInfo.user.userName} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "billingInfo" className="col-sm-2 col-form-label">Billing Info:</label>
                <div className="col-sm-10">
                <input type = "text" id = "billingInfo" 
                value = {authCtx.userAuthInfo.user.billingInfo} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            <div className="form-group row">
                <label forhtml = "address" className="col-sm-2 col-form-label">Address:</label>
                <div className="col-sm-10">
                <input type = "text" id = "address" 
                value = {authCtx.userAuthInfo.user.address} readOnly
                className="form-control col-4"/>
                </div>
            </div>
            </div> */}
            <div className="container card">
                <h3>Products you can add to your cart</h3>
                <ul className="list-group">
                    {
                        purchasableProds.length === 0 && loadingPurchasableProds ?
                        <span>Loading...</span>
                        :
                        purchasableProds.map((prod) =>
                            <li className="list-group-item" key = {prod.id}>
                                <PurchasableProduct product = {prod} />
                            </li>
                        )
                    }
                </ul>
            </div>
        </Fragment>
    )
}

export default Buyer;