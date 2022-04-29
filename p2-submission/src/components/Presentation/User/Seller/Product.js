import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Product = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();

    const editProductHandler = () => {
        // console.log(+props.prod.id);
        let prodId = +props.prod.id;
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/product/edit/prid=+${prodId}`);
    }

    const deleteProductHandler = () => {
        setIsDeleted(true);
    }   

    return (
        <Fragment>
            <div>
                Product Name: {props.prod.productName}
                <br />
                Manufacturer: {props.prod.manufacturerName}
                <br />
                Quantity: {props.prod.quantity}
                <br />
                Price: {props.prod.price}
            </div>
            <div>
                <button onClick = {editProductHandler} disabled = {isDeleted}>Edit</button>
                <button onClick = {deleteProductHandler}>Delete</button>
            </div>
            <div>
                {isDeleted && <span>Deleted</span>}
            </div>
        </Fragment>
    );
}

export default Product;