import { useReducer } from 'react';
import { CartContext } from "./context";

const defaultCartState = {
    items: [],
    totalAmount: 0,
}

const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const newTotalAmount = state.totalAmount + (action.item.price * action.item.amount);
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );
        const existingCartItem = state.items[existingCartItemIndex]; 
        let newItem;
        let newItems;

        if (existingCartItem) {
            newItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            newItems = [...state.items];
            newItems[existingCartItemIndex] = newItem;
        } else {
            newItems = state.items.concat(action.item);
        }
        return {
            items: newItems,
            totalAmount: newTotalAmount
        };
    }
    else if (action.type === 'REMOVE') {
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );
        const existingCartItem = state.items[existingCartItemIndex];
        const newTotalAmount = state.totalAmount - existingCartItem.price;
        let newItems;
        if (existingCartItem.amount === 1) {
            newItems = state.items.filter(item => item.id !== action.id);
        } else {
            const newItem = {...existingCartItem, amount: existingCartItem.amount - 1};
            newItems = [...state.items];
            newItems[existingCartItemIndex] = newItem;
        }

        return {
            items: newItems,
            totalAmount: newTotalAmount
        };
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const[cartState, setCartState] = useReducer(cartReducer, defaultCartState);

    const addItemHandler = (item) => {
        // console.log(item);
        setCartState({
            type: 'ADD',
            item: item,
        });
    }

    const removeItemHandler = (id) => {
        setCartState({
            type: 'REMOVE',
            id: id,
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
    };

    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;