module.exports = {
    REGEX: {
        ROUTE: /route(?:\s+)?=(?:\s+)?"(.*)"/,
        CHANGE: /route-change(?:\s+)?=(?:\s+)?"(.*?)"/,
        IS_PRESERVE: /\spreserve[>\s=]/
    },
    PATH: {
        NOT_FOUND: '*'
    }
};