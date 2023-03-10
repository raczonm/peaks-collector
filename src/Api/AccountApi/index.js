import axios from 'axios';

const accountApi = axios.create({
    baseURL: 'http://188.68.231.174:3000/account',
    timeout: 100000
});

export const MULTIPART_SETTINGS = {  headers: {
    'Accept': 'application/json',
    'Content-Type': 'multipart/form-data'
}};

export default accountApi;
