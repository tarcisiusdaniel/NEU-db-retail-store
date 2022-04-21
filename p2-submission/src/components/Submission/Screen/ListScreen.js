import { Fragment } from 'react';

const ListScreen = (props) => {
    return (
        <Fragment>
            <h1>List Screen</h1>
            <h3>Users:</h3>
            <ul>
                <li>
                    <a href = '/list_screen/seller'>List Screen for Seller's Table</a>
                </li>
            </ul>
            <h3>Domains:</h3>
            <ul>
                <li>
                    <a href = '/list_screen/product'>List Screen for Product's Table</a>
                </li>
                <li>
                    <a href = '/list_screen/cart'>List Screen for Cart's Table</a>
                </li>
            </ul>
        </Fragment>
    );
}

export default ListScreen;