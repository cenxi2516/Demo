import request from './request';

// 获取所有博客分类
export const getBlogTypes = async () => {
    const url = '/api/blogtype'
    return await request.get(url);
};

// 分页获取博客, categoryId为-1获取全部分类的博客文章
export const getPageBlogs = async (page = 1, limit = 10, categoryId = -1) => {
    const url = '/api/blog';
    return await request.get(url, {
        params: {
            page, limit, categoryId
        }
    })
};

// 获取单个博客
export const getSingleBlog = async (blogId) => {
    const url = '/api/blog';
    return await request.get(url, {
        params: {
            blogId
        }
    })
};