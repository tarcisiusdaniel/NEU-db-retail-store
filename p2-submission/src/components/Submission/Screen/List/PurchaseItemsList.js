import { Fragment, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PurchaseItemsList = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState([]);
    const { id } = useParams();
    const { username, password, usertype, buyer_id } = useParams();
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState('');

    async function purchaseItemsListFetchHandler(orderId) {
        setIsLoading(true);
        const productFetch = await fetch(`http://localhost:8080/order/findPurchaseItems/${orderId}`);
        const productFetchedData = await productFetch.json();
        console.log(productFetchedData);
        setProductData(productFetchedData);
        setQuantity(productFetchedData.quantity);
        setIsLoading(false);
    }

    useEffect(() => {
        if(id){
            purchaseItemsListFetchHandler(id);
        }
        
    }, []);

    const goBackToBuyers = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
        
    }

    return (
        <Fragment>
            <div className="container">
                <h3>List Screen For Product's Table</h3>
               
                {isLoading && productData.length === 0 && <p>Loading...</p>}
                <div>
                <table className="table table-bordered table-striped table-hover table-light table-sm">
                <thead className="thead-dark">
                    <tr>
                        <th>Order Id</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                {productData.map(productData => (
                            
                            <tr key={productData[0]}>
                                <td>{productData[1]}</td>
                                <td>{productData[3]}</td>
                                <td>{productData[2]}</td>
                            </tr>
                            ))
                        } 
                </tbody>
                </table>
                </div>
                <button className="btn btn-primary" onClick = {goBackToBuyers}>Go Back</button>
            </div>
        </Fragment>
    )
}

export default PurchaseItemsList;