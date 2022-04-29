import { Fragment } from "react"

const PurchasableProduct = (props) => {
    const addToCartHandler = (event) => {
        event.preventDefault();
    }

    return(
        <Fragment>
            <div>
                Product Name: {props.product.productName}
                <br />
                Manufacturer: {props.product.manufacturerName}
                <br />
                Quantity: {props.product.quantity}
                <br />
                Price: {props.product.price}
            </div>
            <div>
                <form onSubmit = {addToCartHandler}>
                    <input type = "number" min = '0' max = '3' step = '0' defaultValue = '0'/>
                    <button type = "submit">Add To Cart</button>
                </form>
            </div>
        </Fragment>
    );
}

export default PurchasableProduct;