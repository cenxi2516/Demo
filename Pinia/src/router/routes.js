import Counter from '@/views/Counter.vue'
import ToDoList from '@/views/ToDoList.vue'

const routes = [
    {
        name: 'home',
        path: '/',
        redirect: '/counter',
        children: [
            {
                name: 'counter',
                path: '/counter',
                component: Counter,
            },
            {
                name: 'todoList',
                path: '/todoList',
                component: ToDoList,
            },
        ],
    },
];


export default routes;