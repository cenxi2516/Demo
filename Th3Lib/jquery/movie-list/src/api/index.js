import axios from 'axios';

const defaultConfig = {};

const instance = axios.create(defaultConfig);

instance.interceptors.request.use( (config) => {

    return config;
}, (error) => {

});

instance.interceptors.response.use( (response) => {

    return response.data;
}, (error) => {

});

export const SUCCESS_CODE = 0;

export default instance;