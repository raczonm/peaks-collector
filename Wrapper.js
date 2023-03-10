import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLocationRequest } from './src/Store/actions'
import LoginRouter from './src/Screens/Account/LoginRouter';
import Router from './Router';

export default () => {
    const dispatch = useDispatch();

    const { isLoggedIn, token } = useSelector(state => state.account);

    useEffect(() => { dispatch(getUserLocationRequest()); }, []);

    if (!isLoggedIn || !token) return <LoginRouter />;

    return <Router />;
}