module.exports = function (query) {
    const obj = {};
    if (!query) return obj;
    const data = query.split('&');
    for (let i = 0, dataLength = data.length; i < dataLength; i++) {
        const dataPart = data[i].split('=');
        if (dataPart.length) {
            const first = dataPart.splice(0, 1)[0];
            obj[first] = decodeURIComponent(dataPart.join('='));
        }
    }

    return obj;
};