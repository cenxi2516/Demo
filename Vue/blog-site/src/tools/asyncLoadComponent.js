import {start, done} from 'nprogress';
import 'nprogress/nprogress.css';

export default (callback) => {
    return async() => {
        start();

        const AsyncComponent = await callback();

        done();

        return AsyncComponent;
    };
}