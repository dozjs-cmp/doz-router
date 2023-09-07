export const REGEX = {
    ROUTE: /route(?:\s+)?=(?:\s+)?"(.*?)"/,
    CHANGE: /route-change(?:\s+)?=(?:\s+)?"(.*?)"/,
    IS_PRESERVE: /\spreserve[>\s=]/
};

export const PATH = {
    NOT_FOUND: '*'
};
export const NS = {
    hashchange: '___doz_router___hashchangeListener',
    popstate: '___doz_router___popstateListener',
    DOMContentLoaded: '___doz_router___DOMContentLoadedListener',
};
export const PRERENDER = '__DOZ_PRERENDER_PUBLIC_URL__';
export const SSR = '__DOZ_SSR_PATH__';
export const LS_LAST_PATH = 'dozRouterLastPath';
