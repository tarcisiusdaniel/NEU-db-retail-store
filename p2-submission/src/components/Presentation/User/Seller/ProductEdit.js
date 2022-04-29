import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ProductEdit = (props) => {
    const { username, password, usertype, product_id } = useParams();
    const navigate = useNavigate();

    const editProductSubmissionHandler = (event) => {
        //call the API endpoint to edit a product
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
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
                <label forhtml="quantity">Quantity:</label>
                <input type = "number" id = "quantity" min = '0' step = '1' />
                <br />
                <label forhtml="price">Price:</label>
                <input type = "number" id = "price" min = '0' step = '1' />
                <br />
                <button type = "submit">Submit Changes</button>
            </form>
        </Fragment>
    )
}

export default ProductEdit;