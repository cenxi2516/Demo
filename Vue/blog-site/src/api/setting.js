import request from './request';

export const getSetting = async () => {
    const url = '/api/setting';
    return await request.get(url);
};