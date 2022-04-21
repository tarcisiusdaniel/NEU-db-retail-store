import { Fragment } from 'react';

const EditScreen = (props) => {
    return (
        <Fragment>
            <h1>Edit Screen</h1>
            <h3>Users:</h3>
            <ul>
                <li>
                    <a href = '/edit_screen/seller'>Edit Screen for Seller's Table</a>
                </li>
            </ul>
            <h3>Domains:</h3>
            <ul>
                <li>
                    <a href = '/edit_screen/products'>Edit Screen for Product's Table</a>
                </li>
                <li>
                    <a href = '/edit_screen/cart'>Edit Screen for Cart's Table</a>
                </li>
            </ul>
        </Fragment>
    );
}

export default EditScreen;