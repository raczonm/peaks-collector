import { CREATE_ACCOUNT_SUCCESS, UPDATE_ACCOUNT_SUCCESS, CHANGE_PASSWORD_SUCCESS, LOGOUT_SUCCESS, LOGIN_SUCCESS } from '../../actions/actionTypes';

const initialState = {
    isLoggedIn: false,
    id: null,
    token: null,
    info: {},
}

const formatData = account => ({
    name: account.name || account.defaultName,
    email: account.email,
    avatarUrl: account.avatarUrl,
    birthdate: account.birthdate,
    description: account.description,
    language: account.language,
    country: account.homeCountry
});

export default function(state = initialState, { type, payload }) {
    switch (type) {
        case CREATE_ACCOUNT_SUCCESS:
        case UPDATE_ACCOUNT_SUCCESS:
        case CHANGE_PASSWORD_SUCCESS:
        case LOGIN_SUCCESS:
            const { account } = payload;

            return { 
                isLoggedIn: true,
                isPremium: account.isPremium,
                isRegistered: account.isRegistered,
                id: account._id,
                token: account.token,
                info: formatData(account)
            };
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
};