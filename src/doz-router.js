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
    $currentView: null,
    $currentPath: null,
    $routes: [],
    $paramMap: {},
    $param: {},
    $routeNotFound: '',
    $query: {},
    $queryRaw: '',
    $link: {},

    $removeCurrentView() {
        if (this.$currentView) {
            this.$currentView.destroy();
            this.$currentView = null;
        }
    },

    $setView(view) {
        this.$removeCurrentView();
        this.$currentView = this.mount(view);
    },

    $navigate(path, params) {
        let found = false;
        path = path || window.location.hash.slice(this.props.hash.length);
        let pathPart = path.split('?');
        path = clearPath(pathPart[0]);
        this.$queryRaw = pathPart[1] || '';

        for (let i = 0; i < this.$routes.length; i++) {
            let route = this.$routes[i];
            let re = new RegExp('^' + route.path + '$');
            let match = path.match(re);

            if (match) {
                found = true;

                if (typeof params === 'object') {
                    this.$param = Object.assign({}, params);
                } else {
                    let param = this.$paramMap[route.path];
                    this.$query = queryToObject(this.$queryRaw);
                    match.slice(1).forEach((value, i) => {
                        this.$param[param[i]] = value;
                    });
                }

                this.$currentPath = path;
                this.$setView(route.view);

                break;
            }
        }

        if (!found) {
            this.$currentPath = null;
            this.$setView(this.$routeNotFound);
        }

        this.$activeLink();
    },

    $activeLink() {
        Object.keys(this.$link).forEach(link => {
            this.$link[link].forEach(el => {
                if (link === this.$currentPath)
                    el.classList.add(this.props.classActiveLink);
                else
                    el.classList.remove(this.props.classActiveLink);
            });
        });
    },

    $add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this.$routeNotFound = view;
        } else {
            let param = [];
            let path = clearPath(route);
            path = path.replace(/:(\w+)/g, (match, capture) => {
                param.push(capture);
                return '([\\w-]+)';
            });
            this.$paramMap[path] = param;
            this.$routes.push({path, view});
        }
    },

    $remove(path) {
        for (let i = 0; i < this.$routes.length; i++) {
            let route = this.$routes[i];
            if (route.path === clearPath(path)) {
                this.$routes.splice(i, 1);
            }
        }
    },

    $bindLink() {
        this.$link = {};
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
            if (typeof this.$link[path] === 'undefined') {
                this.$link[path] = [el];
            } else {
                this.$link[path].push(el);
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