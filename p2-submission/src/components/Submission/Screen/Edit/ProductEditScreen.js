import { useState, Fragment } from "react";

const ProductEditScreen = (props) => {
    const [productReadData, setProductReadData] = useState(null);

    const productReadingHandler = (event) => {
        event.preventDefault();
        productReadingFetchHandler(+event.target[0].value);
    }

    async function productReadingFetchHandler(id) {
        const productReadFetch = await fetch(`http://localhost:8080/product/find/${id}`);
        const productReadFetchedData = await productReadFetch.json();
        setProductReadData(productReadFetchedData);
    }

    // async function getproductUserId(productId) {
    //     const productReadFetch = await fetch(`http://localhost:8080/product/find/${productId}`);
    //     const productReadFetchedData = await productReadFetch.json();
    //     return +productReadFetchedData.user.id;
    // }

    const productUpdateHandler = (event) => {
        event.preventDefault();
        const updatedProduct = {
            id: +event.target[0].value,
            productName: event.target[1].value,
            manufacturerName: event.target[2].value,
            quantity: +event.target[3].value,
            price: +event.target[4].value,
        }
        productUpdateFetchHandler(+event.target[0].value, updatedProduct);
    }

    async function productUpdateFetchHandler(id, updatedproduct) {
        console.log(JSON.stringify(updatedproduct));
        const response = await fetch(`http://localhost:8080/product/update/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedproduct),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    const productDeleteHandler = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        productDeleteFetchHandler(+event.target[0].value);
    }

    async function productDeleteFetchHandler(id) {
        const productReadFetch = await fetch(`http://localhost:8080/product/delete/${id}`);
    }

    const productCreateHandler = (event) => {
        event.preventDefault();
        const createdProduct = {
            productName: event.target[0].value,
            manufacturerName: event.target[1].value,
            quantity: +event.target[2].value,
            price: +event.target[3].value,
        }
        productCreateFetchHandler(createdProduct);
    }

    async function productCreateFetchHandler(createdProduct) {
        const response = await fetch(`http://localhost:8080/product/create`, {
            method: 'POST',
            body: JSON.stringify(createdProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }

    return (
        <Fragment>
            <div>
                <h1>Edit Screen For product's Table</h1>
                    <h3><b>Reading</b></h3>
                        <form onSubmit = {productReadingHandler}>
                            <label htmlFor="product_id">product ID</label>
                            <input name = "product_id" />
                            <button type = "submit">Submit ID</button>
                        </form>
                        <p>
                            {productReadData === null ? 
                                <p></p>
                                :
                                <ul>
                                    <li>Product Name: {productReadData.productName}</li>
                                    <li>Manufacturer: {productReadData.manufacturerName}</li>
                                    {/* <li>Category: {productReadData.user.category}</li> */}
                                    <li>Quantity: {productReadData.quantity}</li>
                                    <li>Price: ${productReadData.price}</li>
                                </ul>
                            }
                        </p>
                    <h3><b>Update</b></h3>
                        <form onSubmit = {productUpdateHandler}>
                            <label htmlFor="update_product_id">Product ID</label>
                            <input name = "update_product_id" />
                            <br />
                            <label htmlFor="update_product_name">Product Name:</label>
                            <input name = "update_product_name" />
                            <br />
                            <label htmlFor="update_product_manufacturer">Product Manufacturer:</label>
                            <input name = "update_product_manufacturer" />
                            <br />
                            <label htmlFor="update_product_quantity">Product Quantity:</label>
                            <input name = "update_product_quantity" type = "number"/>
                            <br />
                            <label htmlFor="update_product_price">Product Price: $</label>
                            <input name = "update_product_price" type = "number"/>
                            <br />
                            <button type = "submit">Update product</button>
                        </form>
                    <h3><b>Deleting</b></h3>
                        <form onSubmit = {productDeleteHandler}>
                            <label htmlFor="delete_product_id">Product ID</label>
                            <input name = "delete_product_id" />
                            <br />
                            <button type = "submit">Delete product</button>
                        </form>
                    <h3><b>Creating</b></h3>
                        <form onSubmit = {productCreateHandler}>
                            <label htmlFor= "create_product_name">Product Name:</label>
                            <input name = "create_product_name" />
                            <br />
                            <label htmlFor= "create_product_manufacturer">Product Manufacturer:</label>
                            <input name = "create_product_manufacturer" />
                            <br />
                            <label htmlFor= "create_product_quantity">Product Quantity:</label>
                            <input name = "create_product_quantity" type = "number"/>
                            <br />
                            <label htmlFor= "create_product_price">Product Price: $</label>
                            <input name = "create_product_price" type = "number"/>
                            <br />
                            <button type = "submit">Create product</button>
                        </form>
                        <br /><br />
                    <a href = "/list_screen/product">Go To product's List Screen</a>
            </div>
        </Fragment>
    )
}

export default ProductEditScreen;