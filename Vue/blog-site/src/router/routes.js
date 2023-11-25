import Home from '@/views/Home';
import {asyncLoadComponent} from '@/tools'

const Blog = asyncLoadComponent(() => import('@/views/Blog'));
const About = asyncLoadComponent(() => import('@/views/About'));
const Project = asyncLoadComponent(() => import('@/views/Project'));
const Message = asyncLoadComponent(() => import('@/views/Message'));
const NotFound = asyncLoadComponent(() => import('@/components/NotFound'));
const Article = asyncLoadComponent(() => import('@/views/Blog/Article'));

const routes = [
    {
        name: 'home', path: '/', component: Home, meta: {
            title: '首页'
        }
    },
    {
        name: 'blog-detail',
        path: '/blog/detail/:blogId',
        component: Article,
        meta: {
            title: '文章详情'
        }
    },
    {
        name: 'blog', path: '/blog', component: Blog,
        meta: {
            title: '文章'
        },
        children: [
            {
                name: 'blog-cate',
                path: 'cate/:categoryId',
                component: Blog,
                meta: {
                    title: '文章'
                }
            }
        ]
    },
    {
        name: 'about', path: '/about', component: About, meta: {
            title: '关于我'
        }
    },
    {
        name: 'project', path: '/project', component: Project, meta: {
            title: '项目&效果'
        }
    },
    {
        name: 'message', path: '/message', component: Message, meta: {
            title: '留言板'
        }
    },
    {
        name: 'notFound', path: '*', component: NotFound, meta: {
            title: '404'
        }
    }
];

export default routes;