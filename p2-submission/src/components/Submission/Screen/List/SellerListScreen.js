import { Fragment, useState, useEffect } from "react";

const SellerListScreen = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    const [sellerData, setSellerData] = useState([]);

    async function sellerFetchHandler() {
        setIsLoading(true);
        const sellerFetch = await fetch('http://localhost:8080/seller/findAll');
        const sellerFetchedData = await sellerFetch.json();
        // console.log(sellerFetchedData);
        setSellerData(sellerFetchedData);
        setIsLoading(false);
    }

    useEffect(() => {
        sellerFetchHandler();
    }, []);

    const sellerRenderedView = sellerData.map((seller) => 
        <li key = {seller.id}>
            <span><b>For seller with id of {seller.id}</b></span>
            <ul>
                <li>Email: {seller.user.email}</li>
                <li>First Name: {seller.user.firstName}</li>
                <li>Last Name: {seller.user.lastName}</li>
                <li>User Name: {seller.user.userName}</li>
                <li>Address: {seller.address}</li>
            </ul>
        </li>
    );

    return (
        <Fragment>
            <div>
                <h1>List Screen For Seller's Table</h1>
                <a href = "/">Go To Home Page</a>
                {isLoading && sellerData.length === 0 && <p>Loading...</p>}
                {!isLoading && sellerData.length === 0 && <h3>There are no sellers</h3>}
                {!isLoading && sellerData.length !== 0 && <h3>There are {sellerData.length} sellers:</h3>}
                {sellerRenderedView}
                {!isLoading && <a href = '/edit_screen/seller'>Edit a seller record or create a new seller</a>}
            </div>
        </Fragment>
    )
}

export default SellerListScreen;