/**
 * 检测dom是否在滚动容器可视区域内
 * @param  {HTMLElement} dom
 * @Param  {HTMLElment}  scrollContainer 滚动
 * @return {Boolean}     true表示dom在滚动容器可视区域内，false表示dom不在滚动容器可视区域内
 */
const isInScrollContainerArea = (dom, scrollContainer = document.documentElement) => {
    const {
        left, top, width, height
    } = dom.getBoundingClientRect();
    const {clientWidth, clientHeight} = scrollContainer;

    // 水平方向: (-width, clientWidth)
    // 垂直方向：(-height, clientHeight)
    return (left > -width && left < clientWidth) && (top > -height && top < clientHeight);
};

export default isInScrollContainerArea;