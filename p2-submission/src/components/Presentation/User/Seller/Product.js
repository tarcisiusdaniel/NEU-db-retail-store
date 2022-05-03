import { Fragment, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Product = (props) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const navigate = useNavigate();
    const { username, password, usertype } = useParams();

    const editProductHandler = () => {
        // console.log(+props.prod.id);
        let prodId = +props.prod.id;
        navigate(`/un=+${username}/pw=+${password}/ut=+${usertype}/product/edit/slid=+${+props.sellerId}/prid=+${prodId}`);
    }

    async function deleteProductFetchHandler(id) {
        let prodId = +props.prod.id;
        const productDeleteFetch = await fetch(`http://localhost:8080/product/delete/${prodId}/${props.sellerId}`);
        if (productDeleteFetch.ok) {
            setIsDeleted(true);
        }
        else if (!productDeleteFetch.ok) {
            setIsDeleted(false);
        }
    }

    const deleteProductHandler = () => {
        deleteProductFetchHandler(+props.userId);
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
                <button className="btn btn-primary" onClick = {editProductHandler} disabled = {isDeleted}>Edit</button>
                <button className="btn btn-primary m-3" onClick = {deleteProductHandler}>Delete</button>
            </div>
            <div>
                {isDeleted && <span>Deleted</span>}
            </div>
        </Fragment>
    );
}

export default Product;