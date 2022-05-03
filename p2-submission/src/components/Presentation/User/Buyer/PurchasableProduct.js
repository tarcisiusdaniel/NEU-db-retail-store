import { Fragment, useContext } from "react"
import { CartContext } from "../../../../store/context";

const PurchasableProduct = (props) => {
    const cartCtx = useContext(CartContext);
    const addToCartHandler = (event) => {
        event.preventDefault();
        console.log(+event.target[0].value);
        cartCtx.addItem({
            id: props.product.id,
            name: props.product.productName,
            manufacturer: props.product.manufacturerName,
            amount: +event.target[0].value,
            price: props.product.price,
            category: props.product.category,
        })
    }



    return(
        <Fragment>
            <div>

                Product Name: {props.product.productName}
                <br />
                Manufacturer: {props.product.manufacturerName}
                <br />
                Category: {props.product.category}
                <br />
                Price: {props.product.price}
            </div>
            <div>
                <form onSubmit = {addToCartHandler}>
                    
                    <input type = "number" min = '1' max = '3' step = '0' defaultValue = '1'/>
                    <button className="btn btn-primary m-3" type = "submit">
                        Add To Cart</button>
                </form>
            </div>
        </Fragment>
    );
}

export default PurchasableProduct;