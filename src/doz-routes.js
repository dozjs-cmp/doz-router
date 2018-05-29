const {REGEX, STORE_NAME, PATH} = require('./constants');

module.exports = {
    store: STORE_NAME,
    autoCreateChildren: false,
    $currentView: null,
    $currentPath: null,
    $routes: [],
    $route404: '',
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
        return path.toString().replace(/\/$/, '');
    },
    $router() {

        let found = false;
        let path = location.hash.slice(1);
        let pathPart = path.split('?');
        path = this.$trimHash(pathPart[0]) || '/';
        this.$query = pathPart[1] || '';

        this.$routes.forEach(route => {

            let re = new RegExp(route.path + '$');
            let match = path.match(re);

            if (match) {
                found = true;
                this.$currentPath = route.path;
                this.$setView(route.view);
            }
        });

        if (!found) {
            this.$currentPath = null;
            this.$setView(this.$route404);
        }
    },
    onAppReady() {
        this.rawChildren.forEach(item => {
            const route = item.match(REGEX.ROUTE);
            if (route) {
                if (route[1] === PATH.NOT_FOUND) {
                    this.$route404 = item;
                } else {
                    let path = this.$trimHash(route[1]);
                    this.$routes.push({path, view: item});
                }
            }
        });
        window.addEventListener('hashchange', () => this.$router());
        window.addEventListener('load', () => this.$router());
    }
};