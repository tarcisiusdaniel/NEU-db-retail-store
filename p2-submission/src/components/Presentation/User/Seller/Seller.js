import { Fragment, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Product from "./Product";

const Seller = (props) => {
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();
    const [sellerInfo, setSellerInfo] = useState({});
    const [sellerProducts, setSellerProducts] = useState([]);

    const dummySellerInfo = {
        id: 2,
        user: {
            email: 'tarcisiusdaniel@gmail.com',
            firstName: 'Tarcisius',
            lastName: 'Hartanto',
            userName: 'tarcih',
            password: 'somepassword',
        },
        address: '10721 Meridian Ave N',
    }

    const dummyProducts = [
        {
            id: 1,
            productName: 'Product 1',
            manufacturerName: 'Manufacturer 1',
            quantity: 20,
            price: 5,
        },
        {
            id: 2,
            productName: 'Product 2',
            manufacturerName: 'Manufacturer 2',
            quantity: 30,
            price: 15,
        },
        {
            id: 3,
            productName: 'Product 3',
            manufacturerName: 'Manufacturer 3',
            quantity: 40,
            price: 25,
        },
        {
            id: 4,
            productName: 'Product 4',
            manufacturerName: 'Manufacturer 4',
            quantity: 50,
            price: 35,
        },
        {
            id: 5,
            productName: 'Product 5',
            manufacturerName: 'Manufacturer 5',
            quantity: 60,
            price: 45,
        },
    ]   

    // function fetchSellerInfoAndProduct() {
    //     setSellerInfo(dummySellerInfo);
    //     setSellerProducts(dummyProducts);
    // }

    // useEffect(() => {
    //     // change this to a function that calls the API to get the seller info
    //     let fetchData = setTimeout(() => fetchSellerInfoAndProduct(), 1000);
    //     // change this to a function that calls the API to get the seller's products
    //     return () => {
    //         clearTimeout(fetchData);
    //     }
    // }, []);

    const navigateToUpdateSellerHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/acc_info/edit/slid=+${sellerInfo.id}`);
    }

    const navigateToAddProductHandler = () => {
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/product/add`);
    }

    console.log(sellerInfo);
    console.log(sellerProducts);

    return (
        <Fragment>
            <h1>Hello {props.sellerName}</h1>
            <div>
                <button onClick = {navigateToUpdateSellerHandler}>Update Seller Info</button>
                <button onClick = {navigateToAddProductHandler}>Post Poroduct</button>
            </div>
            <br /><br />
            <div>
                This is your seller account information:
                <ul>
                    <li>Email: {dummySellerInfo.user.email}</li>
                    <li>First Name: {dummySellerInfo.user.firstName}</li>
                    <li>Last Name: {dummySellerInfo.user.lastName}</li>
                    <li>User Name: {dummySellerInfo.user.userName}</li>
                    <li>Address: {dummySellerInfo.address}</li>
                </ul>
            </div>
            
            <br />
            <span>Your products:</span>
            <ul>
                {dummyProducts.map((product) =>
                    <li key = {product.id}>
                        <Product prod = {product}/>
                    </li>
                )}
            </ul>
        </Fragment>
    )
}

export default Seller;