import { createContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import accountApi, { MULTIPART_SETTINGS } from '../../Api/AccountApi';
import { useLocation } from '../../Helpers/useLocation';
import Login from '../../Screens/Login';
import { formatAccountInfo } from '../../Helpers';

const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const [accountInfo, setAccountInfo] = useState(null);
    const [isAccountChecked, setIsAccountChecked] = useState(false);
    const [accountToken, setAccountToken] = useState(null);
    const [entrances, setEntrances] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [achievements, setAchievements] = useState([]);

    const currentUserPosition = useLocation();

    // SET ACCOUNT TOKEN
    const setAccountStorageToken = async accountToken => {
        await SecureStore.setItemAsync('accountToken', JSON.stringify(accountToken));
        setAccountToken(accountToken);
    };


    // CREATE PROFILE
    const createProfile = () => {
        accountApi.post('/create')
            .then(response => {
                setAccountStorageToken({
                    token: response.data.token,
                    type: 'local'
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    // UPDATE PROFILE
    const updateProfile = ({ data, successCallback, errorCallback }) => {
        accountApi.post(`${accountInfo.id}/edit`, { token: accountToken.token, ...data }) 
            .then(() => {
                setAccountInfo({ ...accountInfo, ...data })
                successCallback();
            }).catch(error => {
                errorCallback(error)
            })
    }

    // USER LOGIN 
    const userLogin = () => {
        accountApi.post('/login', { token: accountToken.token })
            .then(response => {
                const _accountData = response.data;

                setAccountInfo(formatAccountInfo(_accountData))
                setEntrances(_accountData.entrances);
                setWishlist(_accountData.wishlist || []);
                setAchievements(_accountData.achievements);
            });
    }

    // USER LOGOUT
    const userLogout = () => {
        setAccountStorageToken(null);
        setAccountInfo(null)
        setEntrances([]);
        setWishlist([]);
        setAchievements([]);
    }

    // ADD PEAK
    const addPeak = ({ params, successCallback, assets, errorCallback }) => {
        let formData = new FormData();

        Object.keys(params).forEach(paramName => formData.append(paramName, params[paramName]));

        assets.forEach(asset => {
            formData.append('assets', {
                uri: asset.uri,
                name: asset.fileName,
                type: `image/jpg`
            });
        })

        formData.append('token', accountToken.token);
        formData.append('accountId', accountInfo.id);
        
        accountApi.post('/add_entrance', formData, MULTIPART_SETTINGS)
            .then(response => {
                setEntrances(response.data.entrances);
                successCallback && successCallback()
            })
            .catch(error => {
                console.log(error);
                errorCallback && errorCallback(error)
            })
    }

    // TOGGLE PEAK IN WISHLIST
    const togglePeakInWishlist = ({ params, successCallback = () => null, errorCallback = () => null }) => {
        const url = wishlist.includes(params.peakId ) ? 'remove_peak_from_wishlist' : 'add_peak_to_wishlist';

        accountApi.post(url, {
            token: accountToken.token,
            accountId: accountInfo.id,
            ...params,
        })
            .then(response => {
                setWishlist(response.data.wishlist);
                successCallback();
            })
            .catch(error => {
                errorCallback(error)
            })
    }

    // GET ACCOUNT TOKEN
    useEffect(() => {
        (async () => {
            let accountToken = await SecureStore.getItemAsync('accountToken');
            accountToken && setAccountToken(JSON.parse(accountToken));
            setIsAccountChecked(true);
        })();
    }, []);

    // TRIGGER USER LOGIN
    useEffect(() => { accountToken && userLogin() }, [accountToken]);

    if (!isAccountChecked || (accountToken && !accountInfo)) return null;

    return (
        <AccountContext.Provider
            value={{
                ...accountInfo,
                token: accountToken ? accountToken.token : null,
                entrances, wishlist, achievements,
                currentUserPosition,
                updateProfile,
                userLogout,
                addPeak,
                togglePeakInWishlist
            }}
        >
            {accountInfo ? children : <Login setAccountStorageToken={setAccountStorageToken} createProfile={createProfile} />}
        </AccountContext.Provider>
    );
}

export default AccountContext;