import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import delay from './delay'

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 50
});

export default (callback) => async() => {
    NProgress.start();
    await delay(2000);
    const Comp = await callback();
    NProgress.done();

    return Comp;
};