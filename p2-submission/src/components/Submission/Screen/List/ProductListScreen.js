import { Fragment, useEffect, useState } from "react";

const ProductListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);

    async function productFetchHandler() {
        setIsLoading(true);
        const productFetch = await fetch('http://localhost:8080/product/findAll');
        const productFetchedData = await productFetch.json();
        console.log(productFetchedData);
        setProductData(productFetchedData);
        setIsLoading(false);
    }

    useEffect(() => {
        productFetchHandler();
    }, []);

    const productRenderedView = productData.map((product) => 
        <li key = {product.id}>
            <span><b>For product with id of {product.id}</b></span>
            <ul>
                <li>Product Name: {product.productName}</li>
                <li>Manufacturer: {product.manufacturerName}</li>
                <li>Price: ${product.price}</li>
                <li>Quantity: {product.quantity}</li>
            </ul>
        </li>
    );

    return (
        <Fragment>
            <div>
                <h1>List Screen For Product's Table</h1>
                <a href = "/">Go To Home Page</a>
                {isLoading && productData.length === 0 && <p>Loading...</p>}
                {!isLoading && productData.length === 0 && <h3>There are no products</h3>}
                {!isLoading && productData.length !== 0 && <h3>There are {productData.length} products:</h3>}
                {productRenderedView}
                {!isLoading && <a href = '/edit_screen/product'>Edit a product record or create a new product</a>}
            </div>
        </Fragment>
    )
}

export default ProductListScreen;