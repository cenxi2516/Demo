let routeTitle = '', dataTitle = '';


const setTitle = () => {
    let title = '';
    if (routeTitle && dataTitle) {
        title = `${routeTitle}-${dataTitle}`;
    } else if (routeTitle && !dataTitle) {
        title = routeTitle;
    } else if (!routeTitle && dataTitle) {
        title = dataTitle;
    }

    document.title = title;
};

export const setRouteTitle = title => {
    routeTitle = title ?? '';
    setTitle();
};

export const setDataTitle = title => {
    dataTitle = title ?? '';
    setTitle();
};