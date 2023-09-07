export default function (path) {
    return path.toString().replace(/\/+$/, '').replace(/^\//, '');
};