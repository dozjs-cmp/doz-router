const {REGEX, PATH, NS} = require('./constants');
const queryToObject = require('./query-to-object');
const clearPath = require('./clear-path');
const normalizePath = require('./normalize-path');

export default {
    props: {
        hash: '#',
        classActiveLink: 'router-link-active',
        linkAttr: 'router-link',
        mode: 'hash',
        /**
         * Base root, works only in "history" mode
         */
        root: '/'
    },

    autoCreateChildren: false,

    onCreate() {
        //custom properties
        this.$_currentView = null;
        this.$_currentViewRaw = '';
        this.$_currentFullPath =  null;
        this.$_currentPath =  null;
        this.$_routes = [];
        this.$_paramMap = {};
        this.$_param = {};
        this.$_routeNotFound = '';
        this.$_query = {};
        this.$_queryRaw = '';
        this.$_link = {};
        this.$_pauseHashListener = false;
    },

    /**
     * Remove current view
     */
    $removeView() {
        if (this.$_currentView) {
            this.$_currentView.destroy();
            this.$_currentView = null;
        }
    },

    /**
     * Set current view
     * @param view {string} component string
     * @param [cb] {string} callback function name
     * @param [preserve] {boolean} preserve view
     */
    $setView(view, cb, preserve) {
        const sameView = this.$_currentViewRaw === view;
        if (cb && sameView) {
            let childCmp = this.$_currentView.children[0];
            let cbFunc = childCmp[cb];
            if (typeof cbFunc === 'function') {
                cbFunc.call(childCmp, this);
            }
        } else if (preserve && sameView) {
            this.$_currentView.children[0].render();
        } else {
            this.$removeView();
            this.$_currentView = this.mount(view);
        }
        this.$_currentViewRaw = view;
    },

    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     */
    $query(property) {
        return this.$_query[property];
    },

    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     */
    $param(property) {
        return this.$_param[property];
    },
    /**
     * Navigate route
     * @param path {string} path to navigate
     * @param [params] {object} optional params
     */
    $navigate(path, params) {
        if (this.props.mode === 'history') {
            history.pushState(path, null, normalizePath(this.props.root + path));
            this.$_navigate(path, params);
        } else {
            this.$_pauseHashListener = true;
            window.location.href = this.props.hash + path;
            this.$_navigate(path, params);
            this.$_pauseHashListener = false;
        }
    },

    /**
     * Navigate route
     * @param path {string} path to navigate
     * @param [params] {object} optional params
     * @returns {boolean}
     * @private
     * @ignore
     */
    $_navigate(path, params) {
        let found = false;
        let hashPath = window.location.hash.slice(this.props.hash.length);
        let historyPath = window.location.pathname + window.location.search;
        let fullPath;

        path = path || hashPath;

        if (this.props.mode === 'history')
            path = historyPath;

        fullPath =  path;

        let pathPart = path.split('?');
        path = clearPath(pathPart[0]);

        if (this.$_currentFullPath === fullPath)
            return false;

        this.$_queryRaw = pathPart[1] || '';

        for (let i = 0; i < this.$_routes.length; i++) {
            let route = this.$_routes[i];
            let re = new RegExp('^' + route.path + '$');
            let match = path.match(re);

            if (match) {
                found = true;

                if (typeof params === 'object') {
                    this.$_param = Object.assign({}, params);
                } else {
                    let param = this.$_paramMap[route.path];
                    this.$_query = queryToObject(this.$_queryRaw);
                    match.slice(1).forEach((value, i) => {
                        this.$_param[param[i]] = value;
                    });
                }

                this.$_currentPath = path;
                this.$_currentFullPath = fullPath;
                this.$setView(route.view, route.cb, route.preserve);

                break;
            }
        }

        if (!found) {
            this.$_currentPath = null;
            this.$_currentFullPath = null;
            this.$setView(this.$_routeNotFound || `"${path}" not found`);
        }

        this.$activeLink();

        return found;
    },

    /**
     * Active current link
     */
    $activeLink() {
        Object.keys(this.$_link).forEach(link => {
            const checkAlsoQuery = Boolean(this.$_link[link].length > 1 && this.$_queryRaw);

            this.$_link[link].forEach(el => {
                let queryEq = true;
                if (checkAlsoQuery)
                    queryEq = new RegExp(`${this.$_queryRaw}$`, 'g').test(el.href);
                if (link === this.$_currentPath && queryEq)
                    el.classList.add(this.props.classActiveLink);
                else
                    el.classList.remove(this.props.classActiveLink);
            });
        });
    },

    /**
     * Add a new route
     * @param route {string} route path
     * @param view {string} component string
     */
    $add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this.$_routeNotFound = view;
        } else {
            let param = [];
            let path = clearPath(route);
            path = path.replace(/:(\w+)/g, (match, capture) => {
                param.push(capture);
                return '([\\w-]+)';
            });
            this.$_paramMap[path] = param;

            let cbChange = view.match(REGEX.CHANGE);
            if (cbChange) {
                cbChange = cbChange[1]
            }

            const preserve = REGEX.IS_PRESERVE.test(view);

            this.$_routes.push({path, view, cb: cbChange, preserve});
        }
    },

    /**
     * Remove a route
     * @param path {string} route path
     */
    $remove(path) {
        for (let i = 0; i < this.$_routes.length; i++) {
            let route = this.$_routes[i];
            if (route.path === clearPath(path)) {
                this.$_routes.splice(i, 1);
            }
        }
    },

    /**
     * Bind all link to routing controller
     */
    $bindLink() {
        this.$_link = {};
        document.querySelectorAll(`[${this.props.linkAttr}]`).forEach(el => {
            let path = el.pathname || el.href;

            if (this.props.mode === 'history') {
                el.addEventListener('click', e => {
                    e.preventDefault();
                    let _path = path + el.search;
                    history.pushState(_path, null, normalizePath(this.props.root + _path));
                    this.$_navigate(_path);
                });
            } else {
                el.href = this.props.hash + path + el.search;
            }
            let pathPart = path.split('?');
            path = clearPath(pathPart[0]);
            if (typeof this.$_link[path] === 'undefined') {
                this.$_link[path] = [el];
            } else {
                this.$_link[path].push(el);
            }
        });
    },

    onAppReady() {

        window.removeEventListener('popstate', window[NS.popstate]);
        window[NS.popstate] = e => {
            this.$_navigate(e.state)
        };

        window.removeEventListener('hashchange', window[NS.hashchange]);
        window[NS.hashchange] = () => {
            if (!this.$_pauseHashListener)
                this.$_navigate()
        };

        window.removeEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);
        window[NS.DOMContentLoaded] = () => {
            this.$_navigate()
        };

        this.rawChildren.forEach(view => {
            const route = view.match(REGEX.ROUTE);
            if (route) {
                this.$add(route[1], view)
            }
        });

        this.$bindLink();

        if (this.props.mode === 'history') {
            window.addEventListener('popstate', window[NS.popstate]);
        } else {
            window.addEventListener('hashchange', window[NS.hashchange]);
        }
        window.addEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);

    },

    onMountAsync() {
        this.$_navigate()
    }
};