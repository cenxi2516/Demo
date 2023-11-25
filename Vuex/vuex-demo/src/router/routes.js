import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import User from '@/views/User.vue'
import NotFound from '@/components/NotFound.vue'
import Loading from '@/components/Loading.vue'


export default [{
    name: 'user', path: '/user', component: User, meta: {
        // 元信息，可自定义字段
        title: '', // 标题
        auth: true, // 是否需要鉴权
    }
}, {
    name: 'login', path: '/login', component: Login, meta: {
        title: '登录', auth: false
    }
}, {
    name: 'home', path: '/', component: Home, meta: {
        title: '首页', auth: true
    }
}, {
    name: 'loading', path: '/loading', component: Loading, meta: {
        title: 'Loading...', auth: false
    }
},
    {
    name: 'notFound', path: '*', component: NotFound, meta: {
        title: '404', auth: false
    }
},

];