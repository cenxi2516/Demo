import Vue from "vue";

/* 获取组件渲染根元素，并未挂载到页面
* @param {Object} Comp 组件配置对象
* @param {Object} props 组件属性props
* @returns
*/
const getComponentRootDom = (Comp, props = {}) => {
    const vm = new Vue({
        render: h => h(Comp, {
            props
        })
    });

    vm.$mount();

    return vm.$el;
};

export default getComponentRootDom;