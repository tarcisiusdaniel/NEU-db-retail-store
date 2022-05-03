import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "bootstrap";
import { toast } from "react-toastify";
// {
//     id: 18,
//     buyerId: 2,
//     totalPrice: 12,
//     orderStatus: "PENDING",
//     items: [ ]
// },
const Orders = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [orders, setOrders] = useState([]);
    const {id} = useParams();
    const { username, password, usertype, buyer_id } = useParams();
    const[payment, setPayment] = useState('');
    const navigate = useNavigate();

    const goBackToBuyers = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
    }

    async function orderFetchHandler() {
        setIsLoading(true);
        const orderFetch = await fetch(`http://localhost:8080/order/findOrderByBuyerId/${buyer_id}`);
        const orderFetchedData = await orderFetch.json();
        console.log(orderFetchedData);
        setOrders(orderFetchedData);
        setIsLoading(false);
    }

    async function purchaseItemsFetchHandler(newOrder) {
        const response = await fetch(`http://localhost:8080/order/update/${newOrder.id}`, {
            method: 'POST',
            body: JSON.stringify(newOrder),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            console.log("success");
            toast.success("Order saved successfully with id: "+newOrder.id);
            orderFetchHandler();
            setIsLoading(true);
        }
        else if (!response.ok) {
            console.log("fail");
            toast.error(response.statusText);
            orderFetchHandler();
            setIsLoading(false);
        }
    }

    const purchaseItemsHandler = (id) => {
        const seletedOrder = orders.find(o => o.id == id);
        const newOrderItems = seletedOrder.items.map(items =>({
            id: items.id,
            productId: items.productId,
            quantity: items.quantity,
        }));
        const newOrder = {
            id: id,
            buyerId: seletedOrder.buyerId,
            totalPrice: seletedOrder.totalPrice,
            orderStatus: "PENDING",
            items: newOrderItems,
        };
        if(payment == 'Now'){
            newOrder.orderStatus= "CHECKOUT"
        }
        else if(payment == 'Cancel'){
            newOrder.orderStatus="CANCEL"
        }
        purchaseItemsFetchHandler(newOrder);
    }
    useEffect(() => {
        orderFetchHandler();
    }, []);

    const payChangeHandler = (event) => {
        //console.log(orders.id);
        console.log(event.target.value);
        setPayment(event.target.value);
    }

    return (
        <Fragment>
            <div className="container">
            <h3>Your Orders:</h3>
            {orders.length === 0 && <span>You have no orders</span>}
            <hr/>
            <div>
            <table className="table table-bordered table-striped table-hover table-light">
                <thead className="thead-dark">
                    <tr>
                    <th>Order Id</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Ordered On</th>
                    <th>Ordered Products</th>
                    <th colSpan={2}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                
                     {orders.map(orders => (
                            
                        <tr key={orders.id}>
                            <td>{orders.id}</td>
                            <td>{orders.totalPrice}</td>
                            <td>
                                {orders.orderStatus}</td>
                            <td>{orders.createdOn}</td>
                            <td>
                                <Link className="btn btn-info" to={`/products/edit/${orders.id}`}>List all ordered products</Link>
                            </td>
                            <td>
                                <div className="col-sm-10"> 
                                    <select name = "paynow" id = "paynow" onChange = {payChangeHandler}
                                    className="form-select" disabled={orders.orderStatus == "SUCCESS" || orders.orderStatus == "CANCEL"}>
                                        <option value="Select Payment">Select Payment</option>
                                        <option value="Now">Pay Now</option>
                                        <option value="Later">Pay Later</option>
                                        <option value="Cancel">Cancel</option>
                                    </select>
                                    </div>
                            </td>
                            <td>
                                <button className="btn btn-primary" onClick = {()=>purchaseItemsHandler(orders.id)}
                                disabled={orders.orderStatus == "SUCCESS" || orders.orderStatus == "CANCEL"}>Submit</button>
                            </td>
                        </tr>
                        ))
                    } 
                </tbody>
            </table>
        </div>
        <div>

        </div>
        <button className="btn btn-primary" onClick = {goBackToBuyers}>Go Back</button>
    
            </div>
        </Fragment>
    )
}

export default Orders;