import request from "./request";


export const getBanner = async () => {
    const url = '/api/banner';

    return await request.get(url);
};