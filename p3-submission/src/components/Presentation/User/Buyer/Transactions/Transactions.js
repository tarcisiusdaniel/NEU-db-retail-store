import { Fragment, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
// {
//     id: 1,
//     status: null,
//     order: 1
// }
const Transactions = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const { username, password, usertype, buyer_id } = useParams();
    const navigate = useNavigate();
    const goBackToBuyers = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`)
    }
    async function transactionFetchHandler() {
        setIsLoading(true);
        const transactionFetch = await fetch(`http://localhost:8080/transaction/findByBuyerId/${buyer_id}`);
        const transactionFetchedData = await transactionFetch.json();
        console.log(transactionFetchedData);
        setTransactions(transactionFetchedData);
        setIsLoading(false);
    }
    useEffect(() => {
        transactionFetchHandler();
    }, []);
    return (
        <Fragment>
            <div className="container">
            <h3>Your Transactions</h3>
            {transactions.length === 0 && <span>You have no transactions</span>}
            <hr/>
            <div>
            <table className="table table-bordered table-striped table-hover table-light">
                <thead className="thead-dark">
                    <tr>
                    <th>Order Id</th>
                    <th>Status</th>
                    <th>Shipment Provider</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                
                     {
                        transactions.map(transactions => (
                            
                        <tr key={transactions.id}>
                            <td>{transactions.order}</td>
                            <td>{transactions.status}</td>
                            <td>{transactions.shipment_provider}</td>
                            <td>{transactions.total_price}</td>
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

export default Transactions;