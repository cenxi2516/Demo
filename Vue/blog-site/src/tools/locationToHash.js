const locationToHash = () => {
    const targetHash = location.hash;

    requestAnimationFrame(() => {
        location.hash = '';
        requestAnimationFrame(() => {
            location.hash = targetHash;
        });
    });
};

export default locationToHash;