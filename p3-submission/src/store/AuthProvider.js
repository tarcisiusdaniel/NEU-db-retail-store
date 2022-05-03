import { useEffect, useState } from "react"
import { AuthContext } from "./context"

const AuthProvider = (props) => {
    const[isLoggedIn, setIsLoggedIn] = useState(false);
    const[userAuthInfo, setUserAuthInfo] = useState({});
    const[userType, setUserType] = useState('');

    useEffect(() => {
        const localStorageIsLoggedIn = localStorage.getItem('isLoggedIn');
        const localStorageIsBuyer = localStorage.getItem('userType');
        const localStorageUserAuthInfo = localStorage.getItem('userAuthInfo');

        if (localStorageIsLoggedIn === '1') {
            // console.log('hey');
            setIsLoggedIn(true);
            setUserType(localStorageIsBuyer);
            // if (localStorageIsBuyer === '1') {
            //     setIsBuyer(true);
            // } else if (localStorageIsBuyer === '0') {
            //     setIsBuyer(false);
            // }
            // console.log(JSON.parse(localStorageUserAuthInfo));
            // console.log(JSON.parse(localStorageUserAuthInfo));

            setUserAuthInfo(JSON.parse(localStorageUserAuthInfo));
        }
    },[]);

    const loginHandler = (username, password, userType, userAuthInfo) => {
        localStorage.setItem('isLoggedIn', '1');
        // set of local storage item from the userAuthInfo
        
        setIsLoggedIn(true);
        localStorage.setItem('userType', userType);
        setUserType(userType);
        // if (userType === 'BUYER') {
            
        //     setIsBuyer(true);
        // } else if (userType === 'SELLER') {
        //     localStorage.setItem('isBuyer', '0');
        //     setIsBuyer(false);
        // }
        localStorage.setItem('userAuthInfo', JSON.stringify(userAuthInfo));
        setUserAuthInfo(userAuthInfo);
    }

    const logoutHandler = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userType');
        localStorage.removeItem('userAuthInfo');
        setIsLoggedIn(false);
        setUserType('');
        setUserAuthInfo({});
    }

    return (
        <AuthContext.Provider value = {{
            isLogin: isLoggedIn,
            userAuthInfo: userAuthInfo,
            userType: userType,
            onLogin: loginHandler,
            onLogout: logoutHandler,
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;