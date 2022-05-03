import { useNavigate, useParams } from "react-router-dom";
import { Fragment, useState, useEffect } from "react";

const AddProduct = (props) => {
    const { username, password, usertype, seller_id } = useParams();
    const [createStatus, setCreateStatus] = useState(true);
    const navigate = useNavigate();
    const {id} = useParams();
    const [productName, setProductName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [category, setProductCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

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

    const goBackToBuyers = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
    }

    return(
        <Fragment>
            <div className="container group row">
            <h3>Add your product</h3>
            <form onSubmit = {addProductSubmissionHandler}>

                <div className="form-group row">
                    <label forhtml = "product_name" className="col-sm-2 col-form-label">Product Name:</label>
                    <div className="col-sm-10">
                    <input type = "text" id = "product_name" 
                    placeholder="Enter Product Name"
                    className="form-control col-4"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "manufacturer_name" className="col-sm-2 col-form-label">Manufacturer Name:</label>
                    <div className="col-sm-10">
                    <input type = "text" id = "manufacturer_name"
                    placeholder="Enter Manufacturer Name"
                    className="form-control col-4"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "category" className="col-sm-2 col-form-label">Product Category:</label>
                    <div className="col-sm-10">
                    <select name = "usertype" id = "usertype"
                    className="form-select ddl">
                        <option value="Select Product Category">Select Product Category</option>
                        <option value="GROCERY">Grocery</option>
                        <option value="ELECTRONICS">Electronics</option>
                        <option value="CLEANING_SUPPLIES">Cleaning Supplies</option>
                        <option value="LUXURY_ITEMS">Luxury Items</option>
                    </select>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "quantity" className="col-sm-2 col-form-label">Quantity:</label>
                    <div className="col-sm-10">
                    <input type = "number" id = "quantity"
                    placeholder="Enter Quantity"
                    className="form-control col-4"/>
                    </div>
                </div>

                <div className="form-group row">
                    <label forhtml = "price" className="col-sm-2 col-form-label">Price:</label>
                    <div className="col-sm-10">
                    <input type = "number" id = "price" placeholder="Enter Price"
                    className="form-control col-4"/>
                    </div>
                </div>

                <button className="btn btn-primary" type = "submit" >Add Product</button>
                <button className="btn btn-primary m-3" 
                onClick = {goBackToBuyers}>Go Back to Dashboard</button>
            </form>
            
            {!createStatus && <span>Creation Failed</span>}
            </div>
        </Fragment>
    );
}

export default AddProduct;