const {REGEX, PATH} = require('./constants');
const queryToObject = require('./query-to-object');
const clearPath = require('./clear-path');

module.exports = {
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

    //custom properties
    $_currentView: null,
    $_currentPath: null,
    $_routes: [],
    $_paramMap: {},
    $_param: {},
    $_routeNotFound: '',
    $_query: {},
    $_queryRaw: '',
    $_link: {},

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
     */
    $setView(view) {
        this.$removeView();
        this.$_currentView = this.mount(view);
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
     * @returns {boolean}
     */
    $navigate(path, params) {
        let found = false;
        path = path || window.location.hash.slice(this.props.hash.length);
        let pathPart = path.split('?');
        path = clearPath(pathPart[0]);
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
                this.$setView(route.view);

                break;
            }
        }

        if (!found) {
            this.$_currentPath = null;
            this.$setView(this.$_routeNotFound);
        }

        this.$activeLink();

        return found;
    },

    /**
     * Active current link
     */
    $activeLink() {
        Object.keys(this.$_link).forEach(link => {
            this.$_link[link].forEach(el => {
                if (link === this.$_currentPath)
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
            this.$_routes.push({path, view});
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
                    history.pushState(_path, null, this.props.root + _path);
                    this.$navigate(_path);
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
        this.rawChildren.forEach(view => {
            const route = view.match(REGEX.ROUTE);
            if (route) {
                this.$add(route[1], view)
            }
        });

        this.$bindLink();
        window.addEventListener('popstate', (e) => {
            this.$navigate(e.state)
        });
        window.addEventListener('hashchange', () => this.$navigate());
        window.addEventListener('DOMContentLoaded', () => this.$navigate());
    }
};