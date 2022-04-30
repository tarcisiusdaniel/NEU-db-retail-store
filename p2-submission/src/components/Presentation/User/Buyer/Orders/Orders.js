import { Fragment, useState } from "react";
// {
//     id: 18,
//     buyerId: 2,
//     totalPrice: 12,
//     orderStatus: "PENDING",
//     items: [ ]
// },
const Orders = (props) => {
    const [orders, setOrders] = useState([]);
    return (
        <Fragment>
            <h1>Your Orders:</h1>
            {orders.length === 0 && <span>You have no orders</span>}
        </Fragment>
    )
}

export default Orders;