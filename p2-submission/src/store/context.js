import React from 'react';

export const AuthContext = React.createContext({
    isLogin: false,
    userAuthInfo: {},
    userType: '',
    onLogout: () => {},
    onLogin: (email, password, userType, userAuthInfo) => {},
});

export const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => {},
    removeItem: (id) => {},
    removeAllItems: () => {},
});