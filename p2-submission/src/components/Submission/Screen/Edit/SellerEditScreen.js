import { Fragment, useState } from "react";

const SellerEditScreen = (props) => {
    const [sellerReadData, setSellerReadData] = useState(null);
    const [sellerUpdateData, setSellerUpdateData] = useState(null);
    const [sellerDeleteData, setSellerDeleteData] = useState(null);
    const [sellerCreateData, setSellerCreateData] = useState(null);

    const sellerReadingHandler = (event) => {
        event.preventDefault();
        sellerReadingFetchHandler(+event.target[0].value);
    }

    async function sellerReadingFetchHandler(id) {
        try {
            const sellerReadFetch = await fetch(`http://localhost:8080/seller/find/${id}`);
            const sellerReadFetchedData = await sellerReadFetch.json();
            setSellerReadData(sellerReadFetchedData);
        } catch (e) {
            console.log("error catched");
            setSellerReadData(null);
        }
    }

    async function getSellerUserId(sellerId) {
        const sellerReadFetch = await fetch(`http://localhost:8080/seller/find/${sellerId}`);
        const sellerReadFetchedData = await sellerReadFetch.json();
        return +sellerReadFetchedData.user.id;
    }

    const sellerUpdateHandler = (event) => {
        event.preventDefault();
        const sellerUserId = getSellerUserId(+event.target[0].value)
            .then((sellerId) =>{
                    const updatedSeller = {
                        id: event.target[0].value,
                        user: {
                            id: sellerId,
                            firstName: event.target[2].value,
                            lastName: event.target[3].value,
                            userName: event.target[4].value,
                            password: event.target[5].value,
                            email: event.target[1].value,
                        },
                        address: event.target[6].value,
                    }
                sellerUpdateFetchHandler(+event.target[0].value, updatedSeller);
            });
    }

    async function sellerUpdateFetchHandler(id, updatedSeller) {
        console.log(JSON.stringify(updatedSeller));
        const response = await fetch(`http://localhost:8080/seller/update/${id}`, {
            method: 'POST',
            body: JSON.stringify(updatedSeller),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setSellerUpdateData(true);
        }
        else if (!response.ok) {
            setSellerUpdateData(false);
        }
    }

    const sellerDeleteHandler = (event) => {
        event.preventDefault();
        console.log(event.target[0].value);
        sellerDeleteFetchHandler(+event.target[0].value);
    }

    async function sellerDeleteFetchHandler(id) {
        const sellerReadFetch = await fetch(`http://localhost:8080/seller/delete/${id}`);
        if (sellerReadFetch.ok) {
            setSellerDeleteData(true);
        }
        else if (!sellerReadFetch.ok) {
            setSellerDeleteData(false);
        }
    }

    const sellerCreateHandler = (event) => {
        event.preventDefault();
        const createdSeller = {
            user: {
                firstName: event.target[1].value,
                lastName: event.target[2].value,
                userName: event.target[3].value,
                password: event.target[4].value,
                email: event.target[0].value,
            },
            address: event.target[5].value,
        }
        sellerCreateFetchHandler(createdSeller);
    }

    async function sellerCreateFetchHandler(createdSeller) {
        const response = await fetch(`http://localhost:8080/seller/create`, {
            method: 'POST',
            body: JSON.stringify(createdSeller),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            setSellerCreateData(true);
        }
        else if (!response.ok) {
            setSellerCreateData(false);
        }
    }

    return (
        <Fragment>
            <div>
                <h1>Edit Screen For Seller's Table</h1>
                    <h3><b>Reading</b></h3>
                        <form onSubmit = {sellerReadingHandler}>
                            <label htmlFor="seller_id">Seller ID</label>
                            <input name = "seller_id" />
                            <button type = "submit">Submit ID</button>
                        </form>
                        <p>
                            {sellerReadData === null ? 
                                <p>No data available</p>
                                :
                                <ul>
                                    <li>Email: {sellerReadData.user.email}</li>
                                    <li>First Name: {sellerReadData.user.firstName}</li>
                                    <li>Last Name: {sellerReadData.user.lastName}</li>
                                    <li>User Name: {sellerReadData.user.userName}</li>
                                    <li>Address: {sellerReadData.address}</li>
                                </ul>
                            }
                        </p>
                    <h3><b>Update</b></h3>
                        <form onSubmit = {sellerUpdateHandler}>
                            <label htmlFor="update_seller_id">Seller ID</label>
                            <input name = "update_seller_id" />
                            <br />
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
                        <br />
                        {sellerUpdateData === null && <span></span>}
                        {sellerUpdateData === true && <span>Updated</span>}
                        {sellerUpdateData === false && <span>Fail to Update</span>}
                    <h3><b>Deleting</b></h3>
                        <form onSubmit = {sellerDeleteHandler}>
                            <label htmlFor="delete_seller_id">Seller ID</label>
                            <input name = "delete_seller_id" />
                            <br />
                            <button type = "submit">Delete Seller</button>
                        </form>
                        <br />
                        {sellerDeleteData === null && <span></span>}
                        {sellerDeleteData === true && <span>Deleted</span>}
                        {sellerDeleteData === false && <span>Fail to Delete</span>}
                    <h3><b>Creating</b></h3>
                        <form onSubmit = {sellerCreateHandler}>
                            <label htmlFor= "create_seller_email">Seller Email:</label>
                            <input name = "create_seller_email" />
                            <br />
                            <label htmlFor= "create_seller_firstname">Seller First Name:</label>
                            <input name = "create_seller_firstname" />
                            <br />
                            <label htmlFor= "create_seller_lastname">Seller Last Name:</label>
                            <input name = "create_seller_lastname" />
                            <br />
                            <label htmlFor= "create_seller_username">Seller User Name:</label>
                            <input name = "create_seller_username" />
                            <br />
                            <label htmlFor= "create_seller_password">Seller Password:</label>
                            <input name = "create_seller_password" />
                            <br />
                            <label htmlFor= "create_seller_address">Seller Address:</label>
                            <input name = "create_seller_address" />
                            <br />
                            <button type = "submit">Create Seller</button>
                        </form>
                        <br />
                        {sellerCreateData === null && <span></span>}
                        {sellerCreateData === true && <span>Created</span>}
                        {sellerCreateData === false && <span>Fail to Create</span>}
                        <br /><br />
                    <a href = "/list_screen/seller">Go To Seller's List Screen</a>
                    
            </div>
        </Fragment>
    )
}

export default SellerEditScreen;