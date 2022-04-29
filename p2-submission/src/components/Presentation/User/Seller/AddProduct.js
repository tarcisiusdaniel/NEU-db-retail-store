import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react";

const AddProduct = (props) => {
    const { username, password, usertype } = useParams();
    const navigate = useNavigate();
    const addProductSubmissionHandler = () => {
        // call the POST API to post the product
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
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
                <label forhtml="quantity">Quantity:</label>
                <input type = "number" id = "quantity" min = '0' step = '1' />
                <br />
                <label forhtml="price">Price:</label>
                <input type = "number" id = "price" min = '0' step = '1' />
                <br />
                <button type = "submit">Add Product</button>
            </form>
        </Fragment>
    );
}

export default AddProduct;