export default function (path) {
    return path.replace(/\/{2,}/g, '/');
};