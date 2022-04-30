import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useState } from "react";

const AddProduct = (props) => {
    const { username, password, usertype, seller_id } = useParams();
    const [createStatus, setCreateStatus] = useState(true);
    const navigate = useNavigate();

    async function addProductFetchHandler(newProduct) {
        const response = await fetch(`http://localhost:8080/product/create/${seller_id}`, {
            method: 'POST',
            body: JSON.stringify(newProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        if (!response.ok) {
            setCreateStatus(false);
        }
    }

    const addProductSubmissionHandler = (event) => {
        event.preventDefault();
        // call the POST API to post the product
        const newProduct = {
            productName: event.target[0].value,
            manufacturerName: event.target[1].value,
            category: event.target[2].value,
            price: event.target[4].value,
            quantity: event.target[3].value,
        }
        addProductFetchHandler(newProduct);
        
    }
    
    return(
        <Fragment>
            <h2>Add your product here</h2>
            <form onSubmit = {addProductSubmissionHandler}>
                <label forhtml="product_name">Product Name:</label>
                <input type = "text" id = "product_name"/>
                <br />
                <label forhtml="manufacturer_name">Manufacturer Name:</label>
                <input type = "text" id = "manufacturer_name"/>
                <br />
                <label forhtml = "category">Product Category:</label>
                <select name = "category" id = "category">
                    <option value=""></option>
                    <option value="GROCERY">Grocery</option>
                    <option value="ELECTRONICS">Electronics</option>
                    <option value="CLEANING_SUPPLIES">Cleaning Supplies</option>
                    <option value="LUXURY_ITEMS">Luxury Items</option>
                </select>
                <br />
                <label forhtml="quantity">Quantity:</label>
                <input type = "number" id = "quantity" min = '0' step = '1' />
                <br />
                <label forhtml="price">Price:</label>
                <input type = "number" id = "price" min = '0' step = '1' />
                <br />
                <button type = "submit">Add Product</button>
            </form>
            {!createStatus && <span>Creatiion Failed</span>}
        </Fragment>
    );
}

export default AddProduct;