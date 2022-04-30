import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = (props) => {
    const { username, password, usertype, seller_id, product_id } = useParams();
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState(true);

    async function editProductFetchHandler(sellerId, editedProduct) {
        //error
        const response = await fetch(`http://localhost:8080/product/update/${sellerId}`, {
            method: 'POST',
            body: JSON.stringify(editedProduct),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setUpdateStatus(true);
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            setUpdateStatus(false);
        }
        
    }

    const editProductSubmissionHandler = (event) => {
        //call the API endpoint to edit a product
        event.preventDefault();
        const editedProduct = {
            id: +product_id,
            productName: event.target[0].value,
            manufacturerName: event.target[1].value,
            category: event.target[2].value,
            price: +event.target[4].value,
            quantity: +event.target[3].value,
            createdBy: +seller_id,
        }
        editProductFetchHandler(seller_id, editedProduct);
    }

    return(
        <Fragment>
            <h2>Edit the information for Product with id {product_id}</h2>
            <form onSubmit = {editProductSubmissionHandler}>
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
                <button type = "submit">Submit Changes</button>
            </form>
            {!updateStatus && <span>Update Failed</span>}
        </Fragment>
    )
}

export default ProductEdit;