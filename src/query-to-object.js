module.exports = function (query) {
    if (query && /=/.test(query)) {
        const str = '{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}';
        return JSON.parse(str, function (key, value) {
            return key === '' ? value : decodeURIComponent(value)
        });
    } else
        return {};
};