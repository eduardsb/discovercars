import axios from 'axios';
import config from 'react-native-config';

import strings from '../utils/localization';
import { type APIError } from './api/types/apiError';

const baseUrl = config.API_ENDPOINT;

export const apiGet = (path: string): unknown => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'get',
            url: baseUrl + path,
            headers: { Accept: 'application/json' },
        })
            .then(response => resolve(response.data))
            .catch(error => reject(parseError(error)));
    });
};

export const apiPost = (path: string, data: object): unknown => {
    return new Promise((resolve, reject) => {
        axios({
            method: 'post',
            url: baseUrl + path,
            data: data,
            headers: { Accept: 'application/json' },
        })
            .then(response => resolve(response.data))
            .catch(error => reject(parseError(error)));
    });
};

const parseError = (error: APIError) => {
    const serverError = {
        title:
            error?.title && error.title == 'Network Error'
                ? strings.apiService.errors.noConnection
                : strings.apiService.errors.defaultError,
        status: error?.status ? error.status : 503,
    };
    return serverError;
};
