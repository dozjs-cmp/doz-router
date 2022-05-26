const {REGEX, PATH, NS, PRERENDER, SSR, LS_LAST_PATH} = require('./constants');
const queryToObject = require('./query-to-object');
const clearPath = require('./clear-path');
const normalizePath = require('./normalize-path');
const Doz = require('doz');

function deprecate(prev, next) {
    console.warn('[DEPRECATION]', `"${prev}" is deprecated use "${next}" instead`);
}

export default {
    name: 'doz-router',

    props: {
        hash: '#',
        classActiveLink: 'router-link-active',
        linkAttr: 'data-router-link',
        isLinkAttr: 'data-is-router-link',
        mode: 'hash',
        /**
         * Base root, works only in "history" mode
         */
        root: '/',
        initialRedirect: ''
    },

    autoCreateChildren: false,

    onBeforeCreate() {
        var locationParts = location.search.split('?')
        if (locationParts[1]) {
            this._query = queryToObject(locationParts[1]);
            this._queryRaw = locationParts[1];
        } else {
            this._query = {};
            this._queryRaw = '';
        }
    },

    onCreate() {

        //custom properties
        this._currentView = null;
        this._currentViewRaw = '';
        this._currentFullPath = null;
        this._currentPath = null;
        this._routes = [];
        this._paramMap = {};
        this._param = {};
        this._routeNotFound = '';
        //this._query = {};
        //this._queryRaw = '';
        this._link = {};
        this._pauseHashListener = false;
        this._noDestroy = this.props.hasOwnProperty('noDestroy');
        this._noDestroyedInstances = {};
        this._lastUrl = '';

        if (typeof Doz.mixin === 'function') {
            Doz.mixin({
                router: this
            })
        }

        this._LS_LAST_PATH = this.props.initialRedirectLastKeyName || LS_LAST_PATH;

        if (this.props.hasOwnProperty('initialRedirectLast')) {
            if (window.localStorage && window.localStorage.getItem(this._LS_LAST_PATH)) {
                this._lastUrl = window.localStorage.getItem(this._LS_LAST_PATH);
            }
        }
    },
    /**
     * Remove current view
     */
    removeView() {
        if (this._currentView) {
            if (this._noDestroy) {
                let noDestroyInstance = this._currentView.unmount();
                this._noDestroyedInstances[noDestroyInstance.rawChildren[0]] = noDestroyInstance;
            } else {
                this._currentView.destroy();
            }
            this._currentView = null;
            this.flushDeadLink();
        }
    },

    /**
     * Set current view
     * @param view {string} component string
     * @param [cb] {string} callback function name
     * @param [preserve] {boolean} preserve view
     */
    setView(view, cb, preserve) {

        const sameView = this._currentViewRaw === view;
        if (cb && sameView) {
            let childCmp = this._currentView.children[0];
            let cbFunc = childCmp[cb];
            if (typeof cbFunc === 'function') {
                cbFunc.call(childCmp, this);
            }
        } else if (preserve && sameView) {
            this._currentView.children[0].render();
        } else {
            this.removeView();
            this._currentView = this._noDestroy && this._noDestroyedInstances[view]
                ? this._noDestroyedInstances[view].mount()
                : this.mount(view);
        }
        this._currentViewRaw = view;
    },

    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     */
    query(property) {
        return this._query[property];
    },

    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     */
    param(property) {
        return this._param[property];
    },

    /**
     * Navigate route
     * @param path {string} path to navigate
     * @param [params] {object} optional params
     * @param [forceReplaceState] {boolean}
     */
    navigate(path, params, forceReplaceState) {
        if (this.props.mode === 'history') {

            if (window[PRERENDER]) {
                history.pushState(path, null, normalizePath(window[PRERENDER].replace(location.origin, '') + path));
            } else {
                if (forceReplaceState)
                    return history.replaceState(path, null, normalizePath(this.props.root + path));
                else
                    history.pushState(path, null, normalizePath(this.props.root + path));
            }
            this._navigate(path, params);
        } else {
            this._pauseHashListener = true;
            window.location.href = this.props.hash + path;
            this._navigate(path, params);
            this._pauseHashListener = false;
        }
    },

    /**
     * Returns current path
     * @param full {boolean}
     * @returns {*}
     */
    currentPath(full = true) {
        return full
            ? this._currentFullPath
            : this._currentPath
    },

    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     * @deprecated in favor of query
     */
    $query(property) {
        deprecate('$query', 'query');
        return this.query(property);
    },

    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     * @deprecated in favor of param
     */
    $param(property) {
        deprecate('$param', 'param');
        return this.param(property);
    },

    /**
     * Navigate route
     * @param args
     * @deprecated in favor of navigate
     */
    $navigate(...args) {
        deprecate('$navigate', 'navigate');
        this.navigate.apply(this, args)
    },

    /**
     * Returns current path
     * @param args
     * @returns {*}
     */
    $currentPath(...args) {
        deprecate('$currentPath', 'currentPath');
        return this.currentPath.apply(this, args)
    },

    /**
     * Navigate route
     * @param path {string|null} path to navigate
     * @param [params] {object} optional params
     * @param [initial=false] {boolean}
     * @returns {boolean}
     * @ignore
     */
    _navigate(path, params, initial = false) {
        let found = false;
        let hashPath = window.location.hash.slice(this.props.hash.length);
        let historyPath = window.location.pathname + window.location.search;
        let fullPath;
        let originPath = path;

        path = path || hashPath;

        if (this.props.mode === 'history')
            path = historyPath;

        if (!window[PRERENDER] && !window[SSR]) {
            if ((originPath === '/' || originPath === '' || originPath === null) && initial && this._lastUrl) {
                let _lastUrl = this._lastUrl;
                if (this.props.root && _lastUrl) {
                    let _root = this.props.root.replace(/\//g, '\\/');
                    _lastUrl = _lastUrl.replace(new RegExp('^' + _root, ''), '');
                }
                return this.navigate(_lastUrl);
            }

            if ((path === '/' || path === '') && initial && this.props.initialRedirect) {
                return this.navigate(this.props.initialRedirect);
            }
        }

        path = window[SSR] || path;

        if (window[PRERENDER]) {
            path = (location.origin + path).replace(window[PRERENDER], '');
        }

        path = this.electronFixer(path);

        fullPath = path;

        let pathPart = path.split('?');
        path = clearPath(pathPart[0]);

        if (this._currentFullPath === fullPath)
            return false;

        this._queryRaw = pathPart[1] || '';

        let re;

        if ((path === '/' || path === '') && initial && this.props.initialRedirect) {
            path = normalizePath(clearPath(this.props.root) + this.props.initialRedirect);
        }

        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];

            if (route.path === '*') {
                if (path) {
                    re = new RegExp('.+');
                } else {
                    re = new RegExp('^$')
                }
            } else {
                re = new RegExp('^\/?' + route.path + '$');
            }

            let match = path.match(re);

            if (match) {
                found = true;

                if (params && typeof params === 'object') {
                    this._param = Object.assign({}, params);
                } else {
                    let param = this._paramMap[route.path];
                    this._query = queryToObject(this._queryRaw);
                    match.slice(1).forEach((value, i) => {
                        this._param[param[i]] = value;
                    });
                }

                this._currentPath = path;
                this._currentFullPath = fullPath;
                this.setView(route.view, route.cb, route.preserve);
                if (window.localStorage) {
                    window.localStorage.setItem(this._LS_LAST_PATH, fullPath);
                }

                break;
            }
        }

        if (!found) {
            this._currentPath = null;
            this._currentFullPath = null;
            this.setView(this._routeNotFound || `"${path}" not found`);
        }

        this.activeLink();

        return found;
    },

    /**
     * Active current link
     */
    activeLink() {
        Object.keys(this._link).forEach(link => {
            //const checkAlsoQuery = Boolean(this._link[link].length > 1 && this._queryRaw);
            const checkAlsoQuery = Boolean(this._link[link].size > 1 && this._queryRaw);

            this._link[link].forEach(el => {
                let queryEq = true;
                if (checkAlsoQuery)
                    queryEq = new RegExp(`${this._queryRaw}$`, 'g').test(el.href);

                link = this.electronFixer(link);

                let linkRadixEq = false;
                if (el.dataset.routerLinkRadix !== undefined && link && this._currentPath) {
                    let linkParts = link.split('/');
                    let currentLinkParts = this._currentPath.split('/');
                    linkRadixEq = linkParts[0] === currentLinkParts[0];
                }

                if ((link === this._currentPath || linkRadixEq) && queryEq)
                    el.classList.add(this.props.classActiveLink);
                else
                    el.classList.remove(this.props.classActiveLink);
            });
        });
    },

    electronFixer(path) {
        if (location.protocol === 'file:' && path.includes(':'))
            path = path.substr(3);
        return path;
    },

    /**
     * Add a new route
     * @param route {string} route path
     * @param view {string} component string
     */
    add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this._routeNotFound = view;
        } else {
            let param = [];
            let path = clearPath(route);
            path = path.replace(/:(\w+)/g, (match, capture) => {
                param.push(capture);
                return '([\\w-]+)';
            });

            // Wild card
            path = path.replace(/\/\*/g, '(?:/.*)?');
            this._paramMap[path] = param;

            /*
            let cbChange = view.match(REGEX.CHANGE);
            if (cbChange) {
                cbChange = cbChange[1]
            }

            const preserve = REGEX.IS_PRESERVE.test(view);
            */

            let cbChange = null;
            let preserve = false;

            if (typeof view === 'string') {
                cbChange = view.match(REGEX.CHANGE);
                preserve = REGEX.IS_PRESERVE.test(view);
            } else {
                cbChange = view.props['route-change'];
                preserve = view.props['preserve'];
            }

            if (cbChange) {
                cbChange = cbChange[1];
            }

            // Manage fake boolean attribute
            if (preserve === '')
                preserve = true;

            this._routes.push({path, view, cb: cbChange, preserve});
        }
    },

    /**
     * Remove a route
     * @param path {string} route path
     */
    remove(path) {
        for (let i = 0; i < this._routes.length; i++) {
            let route = this._routes[i];
            if (route.path === clearPath(path)) {
                this._routes.splice(i, 1);
            }
        }
    },

    checkIfAlreadyRootExists() {

    },

    /**
     * Bind all link to routing controller
     */
    bindLink() {
        //window.document.querySelectorAll(`[${this.props.linkAttr}]:not([${this.props.isLinkAttr}])`).forEach(el => {
        window.document.querySelectorAll(`[${this.props.linkAttr}]`).forEach(el => {
            let path = el.pathname || el.href;

            el.dataset.isRouterLink = 'true';

            if (this.props.mode === 'history') {

                if (el.dataset.routerAnchorLink === undefined) {
                    if (el.pathname) {
                        path = el.pathname = normalizePath(this.props.root + el.pathname);
                    } else if (el.href) {
                        path = el.href = normalizePath(this.props.root + el.href);
                    }
                }

                let _path = path + el.search;

                //console.log('_path', path)
                el.dataset.routerPath = _path;
                if (window[PRERENDER]) {
                    //el.href = this.props.root + path + el.search;
                } else {
                    if (!el.dataset.routerListener) {
                        el.addEventListener('click', e => {
                            e.preventDefault();
                            let routerPath = el.dataset.routerPath;
                            history.pushState(routerPath, null, routerPath);
                            this._navigate(routerPath);
                        });
                        el.dataset.routerListener = 'true';
                    }
                    /*el.onclick = e => {
                        e.preventDefault();
                        history.pushState(_path, null, _path);
                        this._navigate(_path);
                    };*/
                }
            } else {
                el.href = this.props.hash + path + el.search;
            }

            let pathPart = path.split('?');
            path = clearPath(pathPart[0]);
            if (typeof this._link[path] === 'undefined') {
                //this._link[path] = [el];
                this._link[path] = new Set();
                this._link[path].add(el);
            } else {
                //this._link[path].push(el);
                if (!this._link[path].has(el))
                    this._link[path].add(el);
            }
        });
    },

    flushDeadLink() {
        Object.keys(this._link).forEach((link) => {
            if(this._link[link]) {
                this._link[link].forEach((el) => {
                    if(!el.isConnected) {
                        this._link[link].delete(el)
                    }
                })
            }
        });
    },

    init() {
        window.removeEventListener('popstate', window[NS.popstate]);
        window[NS.popstate] = e => {
            let route = e.state;
            if(route == null && this.props.initialRedirect)
                return this.navigate(this.props.initialRedirect, {}, true);
            this._navigate(route);
        };

        window.removeEventListener('hashchange', window[NS.hashchange]);
        window[NS.hashchange] = () => {
            if (!this._pauseHashListener)
                this._navigate()
        };

        window.removeEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);
        window[NS.DOMContentLoaded] = () => {
            this._navigate(null, null, true)
        };

        if (this.rawChildrenObject && this.rawChildrenObject.length) {
            this.rawChildrenObject.forEach(view => {
                if (!view || typeof view !== 'object') return;
                let route = view.props.route;
                //console.log(route, view)
                if (route) {
                    this.add(route, view);
                }
            });
        } else {
            this.rawChildren.forEach(view => {
                let route = view.match(REGEX.ROUTE);
                if (route) {
                    this.add(route[1], view);
                }
            });
        }

        this.bindLink();

        if (this.props.mode === 'history') {
            window.addEventListener('popstate', window[NS.popstate]);
        } else {
            window.addEventListener('hashchange', window[NS.hashchange]);
        }

        window.addEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);
    },

    onAppReady() {
        this.init();
    },

    onMountAsync() {
        this._navigate(null, null, true)
    }
};