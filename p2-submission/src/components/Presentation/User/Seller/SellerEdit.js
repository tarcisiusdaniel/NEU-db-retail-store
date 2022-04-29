import { Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SellerEdit = (props) => {
    const { username, password, usertype, seller_id } = useParams();
    const navigate = useNavigate();
    const updateSellerHandler = (event) => {
        //cal the API to update seller info
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}`);
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
                <input name = "update_seller_password" />
                <br />
                <label htmlFor="update_seller_address">Seller Address:</label>
                <input name = "update_seller_address" />
                <br />
                <button type = "submit">Update Seller</button>
            </form>
        </Fragment>
    )
}   

export default SellerEdit;
