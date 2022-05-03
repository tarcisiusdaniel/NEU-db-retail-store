import { Fragment, useState, useEffect } from "react";

const CartListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cartData, setCartData] = useState([]);

    async function cartFetchHandler() {
        setIsLoading(true);
        const cartFetch = await fetch('http://localhost:8080/cart/findAll');
        const cartFetchedData = await cartFetch.json();
        console.log(cartFetchedData);
        setCartData(cartFetchedData);
        setIsLoading(false);
    }

    useEffect(() => {
        cartFetchHandler();
    }, []);

    const cartRenderedView = cartData.map((cart) => 
        <li key = {cart.id}>
            <span><b>For cart item with id of {cart.id}</b></span>
            <ul class="list-group">
                <li class="list-group-item">Cart Product's ID: {cart.productId}</li>
                <li class="list-group-item">Cart Buyer's ID: {cart.buyerId}</li>
                <li class="list-group-item">Cart Item's price: ${cart.totalPrice}</li>
                <li class="list-group-item">Cart Item's Quantity: {cart.quantity}</li>
            </ul>
        </li>
    );

    return (
        <Fragment>
            <div>
                <h1>List Screen For Cart's Table</h1>
                <a href = "/">Go To Home Page</a>
                {isLoading && cartData.length === 0 && <p>Loading...</p>}
                {!isLoading && cartData.length === 0 && <h3>There are no cart items</h3>}
                {!isLoading && cartData.length !== 0 && <h3>There are {cartData.length} cart items:</h3>}
                {cartRenderedView}
                {!isLoading && <a href = '/edit_screen/cart'>Edit a cart record or create a new cart</a>}
            </div>
        </Fragment>
    )
}

export default CartListScreen;