import { Fragment, useState, useEffect } from "react";

const CartEditScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [cartReadData, setCartReadData] = useState(null);
    const [buyersData, setBuyersData] = useState([]);
    const [productsData, setProductsData] = useState([]);

    async function getAllBuyers() {
        const buyersReadFetch = await fetch(`http://localhost:8080/buyer/findAll`);
        const buyersReadFetchedData = await buyersReadFetch.json();
        setBuyersData(buyersReadFetchedData);
    }

    async function getAllProducts() {
        const productsReadFetch = await fetch(`http://localhost:8080/product/findAll`);
        const productsReadFetchedData = await productsReadFetch.json();
        setProductsData(productsReadFetchedData);
    }

    useEffect(() => {
        setIsLoading(true);
        getAllBuyers();
        getAllProducts();
        setIsLoading(false);
    }, []);

    const cartReadingHandler = (event) => {
        event.preventDefault();
        cartReadingFetchHandler(+event.target[0].value);
    }

    async function cartReadingFetchHandler(id) {
        const cartReadFetch = await fetch(`http://localhost:8080/cart/find/${id}`);
        const cartReadFetchedData = await cartReadFetch.json();
        setCartReadData(cartReadFetchedData);
    }

    async function getCartBuyer(buyerId) {
        const buyerReadFetch = await fetch(`http://localhost:8080/buyer/find/${buyerId}`);
        const buyerReadFetchedData = await buyerReadFetch.json();
        return buyerReadFetchedData;
    }

    const cartUpdateHandler = (event) => {
        event.preventDefault();
        const updatedCart = {
            id: +event.target[0].value,
            productId: +event.target[1].value,
            buyerId: +event.target[2].value,
            totalPrice: +event.target[3].value,
            quantity: +event.target[4].value,
        }
        cartUpdateFetchHandler(+event.target[0].value, updatedCart);
    }

    async function cartUpdateFetchHandler(id, updatedCart) {
        console.log(JSON.stringify(updatedCart));
        const response = await fetch(`http://localhost:8080/cart/update/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedCart),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const cartDeleteHandler = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        cartDeleteFetchHandler(+event.target[0].value);
    }

    async function cartDeleteFetchHandler(id) {
        const response = await fetch(`http://localhost:8080/cart/delete/${id}`);
    }

    const cartCreateHandler = (event) => {
        event.preventDefault();
        const createdCart = {
            productId: +event.target[0].value,
            buyerId: +event.target[1].value,
            totalPrice: +event.target[2].value,
            quantity: +event.target[3].value,
        }
        cartCreateFetchHandler(createdCart);
    }

    async function cartCreateFetchHandler(createdCart) {
        const response = await fetch(`http://localhost:8080/cart/create`, {
            method: 'POST',
            body: JSON.stringify(createdCart),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const buyersIDs = buyersData.map((buyer) => <li>{buyer.id}</li>);
    const productsIDs = productsData.map((product) => <li>{product.id}</li>);
    return (
        <Fragment>
            <div>
                <h1>Edit Screen For cart's Table</h1>
                    {isLoading && (buyersData.length === 0 || productsData.length === 0) && <p>Loading...</p>}
                    {!isLoading && buyersData.length !== 0 && productsData.length !== 0 && 
                        <div>
                            <p>Here is the available buyers' IDs:</p>
                            <ul>
                                {buyersIDs}
                            </ul>
                            <p>Here is the available product's IDS:</p>
                            <ul>
                                {productsIDs}
                            </ul>
                        </div>
                    }
                    <h3><b>Reading</b></h3>
                        <form onSubmit = {cartReadingHandler}>
                            <label htmlFor="cart_id">Cart ID</label>
                            <input name = "cart_id" />
                            <button type = "submit">Submit ID</button>
                        </form>
                        <p>
                            {cartReadData === null ? 
                                <p></p>
                                :
                                <ul>
                                    <li>Cart's Product's ID: {cartReadData.productId}</li>
                                    <li>Cart's Buyer's ID: {cartReadData.buyerId}</li>
                                    <li>Cart's Total Price: ${cartReadData.totalPrice}</li>
                                    <li>Cart's Quantity: {cartReadData.quantity}</li>
                                </ul>
                            }
                        </p>
                    <h3><b>Update</b></h3>
                        <form onSubmit = {cartUpdateHandler}>
                            <label htmlFor="update_cart_id">Cart ID</label>
                            <input name = "update_cart_id" type = "number"/>
                            <br />
                            <label htmlFor="update_cart_product_id">Cart's Product ID:</label>
                            <input name = "update_cart_product_id" type = "number"/>
                            <br />
                            <label htmlFor="update_buyer_id">Buyer ID:</label>
                            <input name = "update_buyer_id" type = "number"/>
                            <br />
                            <label htmlFor="update_cart_total_price">Cart's Total Price:</label>
                            <input name = "update_cart_total_price" type = "number"/>
                            <br />
                            <label htmlFor="update_cart_quantity">Cart Quantity:</label>
                            <input name = "update_cart_quantity" type = "number"/>
                            <br />
                            <button type = "submit">Update cart</button>
                        </form>
                    <h3><b>Deleting</b></h3>
                        <form onSubmit = {cartDeleteHandler}>
                            <label htmlFor="delete_cart_id">Cart ID</label>
                            <input name = "delete_cart_id" />
                            <br />
                            <button type = "submit">Delete cart</button>
                        </form>
                    <h3><b>Creating</b></h3>
                        <form onSubmit = {cartCreateHandler}>
                            <label htmlFor="create_cart_product_id">Cart's Product ID:</label>
                            <input name = "create_cart_product_id" type = "number"/>
                            <br />
                            <label htmlFor= "create_cart_manufacturer">Cart Buyer's ID:</label>
                            <input name = "create_cart_manufacturer" type = "number"/>
                            <br />
                            <label htmlFor= "create_cart_price">Cart Total Price: $</label>
                            <input name = "create_cart_price" type = "number"/>
                            <br />
                            <label htmlFor= "create_cart_quantity">Cart Quantity:</label>
                            <input name = "create_cart_quantity" type = "number"/>
                            <br />
                            <button type = "submit">Create cart</button>
                        </form>
                        <br /><br />
                    <a href = "/list_screen/cart">Go To Cart's List Screen</a>
            </div>
        </Fragment>
    )
}

export default CartEditScreen;