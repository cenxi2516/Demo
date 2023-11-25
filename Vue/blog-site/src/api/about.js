import request from './request';

export const getAbout = async () => {
    const url = '/api/about';
    return await request.get(url);
};