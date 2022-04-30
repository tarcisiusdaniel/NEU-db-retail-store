import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SellerEdit = (props) => {
    const { username, password, usertype, user_id, seller_id } = useParams();
    const navigate = useNavigate();
    const [updateStatus, setUpdateStatus] = useState(true);

    async function updateSellerFetchHandler(updatedSeller) {
        const response = await fetch(`http://localhost:8080/seller/update/${updatedSeller.id}`, {
            method: 'POST',
            body: JSON.stringify(updatedSeller),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
        }
        else if (!response.ok) {
            setUpdateStatus(false);
        }
    }

    const updateSellerHandler = (event) => {
        //cal the API to update seller info
        event.preventDefault();
        const updatedSeller = {
            id: +seller_id,
            user: {
                id: +user_id,
                firstName: event.target[1].value,
                lastName: event.target[2].value,
                userName: event.target[3].value,
                password: event.target[4].value,
                email: event.target[0].value,
            },
            address: event.target[5].value,
        }
        updateSellerFetchHandler(updatedSeller);
    }

    return (
        <Fragment>
            <h2>Edit the information for Seller with id {seller_id}</h2>
            <form onSubmit = {updateSellerHandler}>
                <label htmlFor="update_seller_email">Seller Email:</label>
                <input name = "update_seller_email" />
                <br />
                <label htmlFor="update_seller_firstname">Seller First Name:</label>
                <input name = "update_seller_firstname" />
                <br />
                <label htmlFor="update_seller_lastname">Seller Last Name:</label>
                <input name = "update_seller_lastname" />
                <br />
                <label htmlFor="update_seller_username">Seller User Name:</label>
                <input name = "update_seller_username" />
                <br />
                <label htmlFor="update_seller_password">Seller Password:</label>
                <input name = "update_seller_password" type = "password"/>
                <br />
                <label htmlFor="update_seller_address">Seller Address:</label>
                <input name = "update_seller_address" />
                <br />
                <button type = "submit">Update Seller</button>
            </form>
            {!updateStatus && <span>Update failed</span>}
        </Fragment>
    )
}   

export default SellerEdit;
