module.exports = function (query) {
    if (query)
        return JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
            return key === '' ? value : decodeURIComponent(value)
        });
    else
        return {};
};