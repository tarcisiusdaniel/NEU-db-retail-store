import { useEffect, useReducer, useState } from 'react';
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
    else if (action.type === "RECOVER") {
        return action.cartState
    }
    else if (action.type === "RESET") {
        return defaultCartState
    }
    return defaultCartState;
}

const CartProvider = (props) => {
    const[cartState, setCartState] = useReducer(cartReducer, defaultCartState);
    const[recordItems, setRecordItems] = useState([]);
    const[recordTotalAmount, setRecordTotalAmount] = useState(0);

    useEffect(() => {
        console.log('hello');
        const recoveredCartState = JSON.parse(localStorage.getItem('cartState'));
        console.log(recoveredCartState);
        setCartState({
            type: 'RECOVER',
            cartState: recoveredCartState
        });
    }, []);

    useEffect(() => {
        const timeout = setTimeout(localStorage.setItem('cartState', JSON.stringify(cartState)), 500);
        
        // console.log("ngentot");
        
        // console.log(recoveredCartState.items);
        // setCartState({
        //     type: 'RECOVER',
        //     cartState: recoveredCartState
        // });

        return(() => {
            clearTimeout(timeout);
        })
    },[cartState]);

    const addItemHandler = async (item) => {
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

    const removeAllItemsHandler = () => {
        setCartState({
            type: 'RESET',
        });
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemHandler,
        removeItem: removeItemHandler,
        removeAllItems: removeAllItemsHandler,
    };

    return (
        <CartContext.Provider value = {cartContext}>
            {props.children}
        </CartContext.Provider>
    );
};

export default CartProvider;