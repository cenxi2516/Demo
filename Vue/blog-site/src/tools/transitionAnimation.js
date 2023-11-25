const transitionAnimation = (beforeState, afterState) => {
    requestAnimationFrame(() => {
        beforeState();
        requestAnimationFrame(() => afterState());
    });
};


export default transitionAnimation;