const getHashValue = () => location.hash.replace(/^#\/?/, '');

export default getHashValue;