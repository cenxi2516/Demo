const urlParamsParse = url => {
    const urlParams = new URLSearchParams(url.split('?')[1]);

    return Object.fromEntries(urlParams);
};


export default urlParamsParse;