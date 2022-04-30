import { React, Fragment, useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";
import { dummyProducts, dummySellerInfo } from "../Dummies/DummyData";
import { AuthContext } from "../../../../store/context";

const Seller = (props) => {
    const authCtx = useContext(AuthContext);
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [sellerData, setSellerData] = useState({
        id: null,
        user: {
            id: null,
            email: null,
            firstName: null,
            lastName: null,
            userName: null,
            password: null,
        },
        address: null,
    });
    const [loadSellersProduct, setLoadSellersProduct] = useState(false);
    const [sellersProduct, setSellersProduct] = useState([]);

    async function sellerFetchHandler() {
        if (authCtx.userAuthInfo.id === undefined || authCtx.userAuthInfo.id === null ) {
            return;
        }
        setIsLoading(true);
        // console.log("hello from seller")
        // console.log(authCtx.userAuthInfo.id);
        const sellerFetch = await fetch(`http://localhost:8080/seller/find/${authCtx.userAuthInfo.id}`);
        const sellerFetchedData = await sellerFetch.json();
        // console.log(sellerFetchedData);
        setSellerData(sellerFetchedData);
        setIsLoading(false);
    }

    async function sellersProductFetchHandler() {
        if (authCtx.userAuthInfo.id === undefined || authCtx.userAuthInfo.id === null ) {
            return;
        }
        setLoadSellersProduct(true);
        const sellersProdFetch = await fetch(`http://localhost:8080/product/findBySellerId/${authCtx.userAuthInfo.id}`);
        const sellersProdData = await sellersProdFetch.json();
        // console.log(sellersProdData);
        setSellersProduct(sellersProdData);
        setLoadSellersProduct(false);
    }

    useEffect(() => {
        sellerFetchHandler();
        sellersProductFetchHandler();
    }, [authCtx]);

    const navigateToUpdateSellerHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/uid=+${authCtx.userAuthInfo.user.id}/acc_info/edit/slid=+${authCtx.userAuthInfo.id}`);
    }

    const navigateToAddProductHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/slid=+${authCtx.userAuthInfo.id}/product/add`);
    }

    return (
        <Fragment>
            <h1>Hello {sellerData.user.firstName}</h1>
            <div>
                <button onClick = {navigateToUpdateSellerHandler}>Update Seller Info</button>
                <button onClick = {navigateToAddProductHandler}>Post Poroduct</button>
            </div>
            <br /><br />
                {
                    (isLoading && sellerData !== {}) ? 
                        <div>
                            <span>Loading...</span> 
                        </div>
                    :
                    <div>
                        <span>This is your seller account information:</span>
                        <ul>
                            <li>Email: {sellerData.user.email}</li>
                            <li>First Name: {sellerData.user.firstName}</li>
                            <li>Last Name: {sellerData.user.lastName}</li>
                            <li>User Name: {sellerData.user.userName}</li>
                            <li>Address: {sellerData.address}</li>
                        </ul>
                    </div>
                }
            <br />
            <span>Your products:</span>
            <ul>
                { loadSellersProduct ? <span>Loading...</span> :
                sellersProduct.map((product) =>
                    <li key = {product.id}>
                        <Product prod = {product} sellerId = {sellerData.id}/>
                    </li>
                )
                }
            </ul>
        </Fragment>
    )
}

export default Seller;