import { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, CartContext } from "../../../../store/context";
import { dummyProducts } from "../Dummies/DummyData";
import PurchasableProduct from "./PurchasableProduct";

const Buyer = (props) => {
    const authCtx = useContext(AuthContext);
    const cartCtx = useContext(CartContext);
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();
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
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/orders/view`);
    }

    const viewTransactionsHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/transactions/view`);
    }

    return (
        <Fragment>
            <h1>Hello {authCtx.userAuthInfo.user.firstName}</h1>
            <div>
                <button onClick = {viewCartHandler}>View Cart</button>
                <button onClick = {viewOrdersHandler}>View Orders</button>
                <button onClick = {viewTransactionsHandler}>View Transactions</button>
            </div>
            <br /><br />
            <div>
                This is your buyer account information:
                <ul>
                    <li>Email: {authCtx.userAuthInfo.user.email}</li>
                    <li>First Name: {authCtx.userAuthInfo.user.firstName}</li>
                    <li>Last Name: {authCtx.userAuthInfo.user.lastName}</li>
                    <li>User Name: {authCtx.userAuthInfo.user.userName}</li>
                    <li>Billing Info: {authCtx.userAuthInfo.billingInfo}</li>
                    <li>Address: {authCtx.userAuthInfo.address}</li>
                </ul>
            </div>
            <div>
                <h2>Products you can add to your cart</h2>
                <ul>
                    {
                        purchasableProds.length === 0 && loadingPurchasableProds ?
                        <span>Loading...</span>
                        :
                        purchasableProds.map((prod) =>
                            <li key = {prod.id}>
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