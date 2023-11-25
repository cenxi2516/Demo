import xhr from '@/api';

const url = '/api/movies';

export const getMovies =  async (page = 1, size = 10) => {
    return await xhr.get(url, {
        params: {
            page,
            size
        }
    });
};