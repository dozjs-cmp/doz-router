const {REGEX, PATH} = require('./constants');

module.exports = {
    props: {
        hash: '#'
    },
    autoCreateChildren: false,
    $currentView: null,
    $currentPath: null,
    $routes: [],
    $paramMap: {},
    $param: {},
    $routeNotFound: '',
    $query: {},
    $queryRaw: '',
    $queryToObject(query) {
        if (query)
            return JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
                return key === '' ? value : decodeURIComponent(value)
            });
        else
            return {};
    },
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
    $trimHash(path) {
        return path.toString().replace(/\/+$/, '').replace(/^\//, '');
    },
    $navigate(path) {

        let found = false;
        path = path || window.location.hash.slice(this.props.hash.length);
        let pathPart = path.split('?');
        path = this.$trimHash(pathPart[0]);
        this.$queryRaw = pathPart[1] || '';

        for (let i = 0; i < this.$routes.length; i++) {
            let route = this.$routes[i];
            let re = new RegExp('^' + route.path + '$');
            let match = path.match(re);

            if (match) {
                found = true;
                let param = this.$paramMap[route.path];
                this.$query = this.$queryToObject(this.$queryRaw);
                match.slice(1).forEach((value, i) => {
                    this.$param[param[i]] = value;
                });

                this.$currentPath = path;
                this.$setView(route.view);
                break;
            }
        }

        if (!found) {
            this.$currentPath = null;
            this.$setView(this.$routeNotFound);
        }
    },
    onAppReady() {
        this.rawChildren.forEach(item => {
            const route = item.match(REGEX.ROUTE);
            if (route) {
                if (route[1] === PATH.NOT_FOUND) {
                    this.$routeNotFound = item;
                } else {
                    let param = [];
                    let path = this.$trimHash(route[1]);
                    path = path.replace(/:(\w+)/g, (match, capture) => {
                        param.push(capture);
                        return '([\\w-]+)';
                    });
                    this.$paramMap[path] = param;
                    this.$routes.push({path, view: item});
                }
            }
        });
        window.addEventListener('hashchange', () => this.$navigate());
        window.addEventListener('load', () => this.$navigate());
    }
};