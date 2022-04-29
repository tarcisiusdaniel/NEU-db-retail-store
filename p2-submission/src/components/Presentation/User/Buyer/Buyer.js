import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyProducts } from "../Dummies/DummyData";
import PurchasableProduct from "./PurchasableProduct";

const Buyer = (props) => {
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();
    // const userAuthInfoDemo = {
    //     firstName: 'Tarcisius',
    //     lastName: 'Hartanto',
    //     userName: event.target[0].value,
    //     password: event.target[1].value,
    //     billingData: 'billingData',
    //     email: 'tarcisiusdaniel@gmail.com',
    // }

    const viewCartHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/cart/view`);
    }

    const viewOrdersHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/orders/view`);
    }

    const viewTransactionsHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/transactions/view`);
    }

    return (
        <Fragment>
            <h1>Hello {props.buyerInfo.firstName}</h1>
            <div>
                <button onClick = {viewCartHandler}>View Cart</button>
                <button onClick = {viewOrdersHandler}>View Orders</button>
                <button onClick = {viewTransactionsHandler}>View Transactions</button>
            </div>
            <br /><br />
            <div>
                This is your buyer account information:
                <ul>
                    <li>Email: {props.buyerInfo.email}</li>
                    <li>First Name: {props.buyerInfo.firstName}</li>
                    <li>Last Name: {props.buyerInfo.lastName}</li>
                    <li>User Name: {props.buyerInfo.userName}</li>
                    <li>Billing Info: {props.buyerInfo.billingInfo}</li>
                    <li>Address: {props.buyerInfo.address}</li>
                </ul>
            </div>
            <div>
                <h2>Products you can add to your cart</h2>
                <ul>
                    {
                        dummyProducts.map((prod) =>
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