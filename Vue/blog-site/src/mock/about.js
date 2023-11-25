import {mock} from 'mockjs'

mock('/api/about', 'get', {
    code: 0, msg: "", data: 'https://www.taobao.com'
});