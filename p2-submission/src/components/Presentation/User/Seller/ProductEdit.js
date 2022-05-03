import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ProductEdit = (props) => {
    const { username, password, usertype, seller_id, product_id } = useParams();
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState(true);
    const [productName, setProductName] = useState('');
    const [manufacturerName, setManufacturerName] = useState('');
    const [category, setProductCategory] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

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
            toast.success("Product updated successfully.");
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            toast.error("Product update failed.");
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

    async function getProductFetchHandler(product_id) {
        //setIsLoading(true);
        const productFetch = await fetch(`http://localhost:8080/product/find/${product_id}`);
        const productFetchedData = await productFetch.json();
        console.log(productFetchedData);
        setProductName(productFetchedData.productName);
        setManufacturerName(productFetchedData.manufacturerName);
        setProductCategory(productFetchedData.category);
        setQuantity(productFetchedData.quantity);
        setPrice(productFetchedData.price);
    }

    useEffect(()=>{
        if(product_id){
            getProductFetchHandler(product_id);
        }
    },[])
    const categoryChangeHandler = (event) => {
        setProductCategory(event.target.value);
    }

    const goToDashboardHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
    }

    return(
        <Fragment>
            <div className="container">
            <h2>Edit the information for Product with id {product_id}</h2>
            <form onSubmit = {editProductSubmissionHandler}>
          

                <div className="form-group row">
                    <label forhtml = "product_name" className="col-sm-2 col-form-label">Product Name:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="productName " 
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter Product Name"/>
                        </div>
                    </div>
                    <div className="form-group row">
                    <label forhtml = "manufacturer_name" className="col-sm-2 col-form-label">Product Name:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="manufacturerName " 
                        value={manufacturerName }
                        onChange={(e) => setManufacturerName(e.target.value)}
                        placeholder="Enter Manufacturer Name"/>
                        </div>
                    </div>
                
                    <div className="form-group row">
                    <label forhtml = "category" className="col-sm-2 col-form-label">Product Category:</label>
                        <div className="col-sm-10">
                        <select name = "category" id = "category" onChange = {categoryChangeHandler} value={category}
                        className="form-select ddl">
                            <option value="Select category">Select category</option>
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
                        <input type="text" 
                        className="form-control col-4" 
                        id="quantity" 
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="Enter Quantity"/>
                        </div>
                    </div>

                    <div className="form-group row">
                    <label forhtml = "price" className="col-sm-2 col-form-label">Price:</label>
                    <div className="col-sm-10">
                        <input type="text" 
                        className="form-control col-4" 
                        id="price" 
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="Enter Price"/>
                        </div>
                    </div>

                <button className="btn btn-primary" type = "submit">Submit Changes</button>
                <button className="btn btn-primary m-3" onClick = {goToDashboardHandler}>Go Back</button>
            </form>
            {!updateStatus && <span>Update Failed</span>}
            </div>
        </Fragment>
    )
}

export default ProductEdit;