import NProgress from "nprogress";

NProgress.configure({
    easing: 'ease', speed: 500,
    showSpinner: false
});

export default (loadComponent) => async () => {
    NProgress.start()
    const Component = await loadComponent();
    NProgress.done();

    return Component
};