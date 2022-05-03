import { Fragment, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CartContext } from "../../../../../store/context";

const Cart = (props) => {
    const cartCtx = useContext(CartContext);
    const { username, password, usertype, buyer_id } = useParams();
    const navigate = useNavigate();

    const goBackToBuyers = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
    }

    const removeItemByOne = (id) => {
        cartCtx.removeItem(id);
    }

    const addItemByOne = (item) => {
        cartCtx.addItem({...item, amount: 1});
    }

    async function orderFetchHandler(newOrder) {
        const response = await fetch(`http://localhost:8080/order/create`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            cartCtx.removeAllItems();
            console.log("success");
            toast.success("Order created successfully! Please select payment option in Order page.");
        }
        else if (!response.ok) {
            toast.error("Not enough products in stock. Please try again later or decrease the quantity.");
            console.log("fail");
        }
    }

    const orderHandler = () => {
        const newOrderItems = cartCtx.items.map((item) => ({
            productId: item.id,
            quantity: item.amount,
            price: item.price,
        }));
        const newOrder = {
            buyerId: +buyer_id,
            totalPrice: +cartCtx.totalAmount,
            orderStatus: "PENDING",
            items: newOrderItems,
        };
        // console.log(newOrder);
        orderFetchHandler(newOrder);
    }

    const renderedItems = cartCtx.items.map((item) => 
        <li key = {item.id}>
            Product Name: {item.name}
            <br />
            Product Manufacturer: {item.manufacturer}
            <br />
            Category: {item.category}
            <br />
            Quantity: {item.amount}
            <br />
            Price: {item.price}
            <br />
            <button className="btn btn-primary m-3" onClick = {removeItemByOne.bind(null, item.id)}>-</button>
            <button className="btn btn-primary m-3" onClick = {addItemByOne.bind(null, item)}>+</button>
        </li>
    );
    return (
        <Fragment>
            <div className="container">
            <div className="card">
                <br></br>
                <h3>Your items in cart</h3>
                {cartCtx.items.length === 0 && <span>No items in your cart</span>}
                <br />
                {cartCtx.items.length !== 0 && <ul>{renderedItems}</ul>}
                {cartCtx.items.length !== 0 && <span>Total Price: ${cartCtx.totalAmount}</span>}
                <br></br>
                
            </div>
            <button className="btn btn-primary" onClick = {goBackToBuyers}>Go Back</button>
                {cartCtx.items.length !== 0 && 
                <button className="btn btn-primary m-3" onClick = {orderHandler}>Check Out</button>}
            </div>
        </Fragment>
    )
}

export default Cart;