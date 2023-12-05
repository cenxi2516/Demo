const generateId = () =>  Date.now() + Math.random().toString(36).slice(2, 6);

export default generateId;