import { Fragment, useState } from "react";
// {
//     id: 1,
//     status: null,
//     order: 1
// }
const Transactions = (props) => {
    const [transactions, setTransactions] = useState([]);
    return (
        <Fragment>
            <h1>Your Transactions</h1>
            {transactions.length === 0 && <span>You have no transactions</span>}
        </Fragment>
    )
}

export default Transactions;