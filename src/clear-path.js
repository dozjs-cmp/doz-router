module.exports = function (path) {
    return path.toString().replace(/\/+$/, '').replace(/^\//, '');
};