import React from 'react';

export const AuthContext = React.createContext({
    isLogin: false,
    userAuthInfo: {},
    userType: '',
    onLogout: () => {},
    onLogin: (email, password, userType, userAuthInfo) => {},
});