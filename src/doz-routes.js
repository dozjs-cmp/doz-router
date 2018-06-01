const {REGEX, PATH} = require('./constants');

module.exports = {
    autoCreateChildren: false,
    $currentView: null,
    $currentPath: null,
    $routes: [],
    $paramMap: {},
    $param: {},
    $routeNotFound: '',
    $query: '',
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
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    $navigate(path) {

        let found = false;
        path = path || window.location.hash.slice(1);
        let pathPart = path.split('?');
        path = this.$trimHash(pathPart[0]);
        this.$query = pathPart[1] || '';

        for (let i = 0; i < this.$routes.length; i++) {
            let route = this.$routes[i];
            let re = new RegExp('^' + route.path + '$');
            let match = path.match(re);

            if (match) {
                let param = this.$paramMap[route.path];

                match.slice(1).forEach((value, i) => {
                    this.$param[param[i]] = value;
                });

                found = true;
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