import request from './request';

// 提交评论
export const postComment = async (commentInfo) => {
    const url = '/api/comment';
    return await request.post(url, commentInfo);
};

// 分页获取评论
export const getPageComment = async (page = 1, limit = 10, blogId = "-1") => {
    const url = '/api/comment';
    return await request.get(url, {
        params: {
            page,
            limit,
            blogId
        }
    });
};