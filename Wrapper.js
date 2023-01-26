import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getUserLocationRequest } from './src/Store/actions'
import LoginRouter from './src/Screens/Account/LoginRouter';
import Router from './Router';

export default () => {
    const dispatch = useDispatch();

    const { isLoggedIn } = useSelector(state => state.account);

    useEffect(() => { dispatch(getUserLocationRequest()); }, []);

    if (!isLoggedIn) return <LoginRouter />;

    return <Router />;
}