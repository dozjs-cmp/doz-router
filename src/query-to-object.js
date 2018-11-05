module.exports = function (query) {
    if (query && /=/.test(query))
        return JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
            return key === '' ? value : decodeURIComponent(value)
        });
    else
        return {};
};