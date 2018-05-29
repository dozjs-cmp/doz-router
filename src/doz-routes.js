const {REGEX, STORE_NAME, PATH} = require('./constants');

module.exports = {
    store: STORE_NAME,
    autoCreateChildren: false,
    $currentView: null,
    $routes: {},
    $query: '',
    $removeCurrentView() {
        if (this.$currentView) {
            this.$currentView.destroy();
            this.$currentView = null;
        }
    },
    $setView(path) {
        this.$removeCurrentView();
        this.$currentView = this.mount(path);
    },
    $trimHash(path) {
        return path.toString().replace(/\/$/, '');
    },
    $router() {
        let path = location.hash.slice(1);
        let pathPart = path.split('?');
        path = this.$trimHash(pathPart[0]) || '/';
        this.$query = pathPart[1] || '';

        if (this.$routes.hasOwnProperty(path)) {
            this.$setView(this.$routes[path]);
        } else if (this.$routes.hasOwnProperty(PATH.NOT_FOUND)){
            this.$setView(this.$routes[PATH.NOT_FOUND]);
        } else {
            this.$removeCurrentView();
        }
    },
    onAppReady() {
        this.rawChildren.forEach(item => {
            const route = item.match(REGEX.ROUTE);
            if (route) {
                this.$routes[route[1]] = item;
            }
        });
        window.addEventListener('hashchange', ()=> this.$router());
        window.addEventListener('load', ()=> this.$router());
    }
};