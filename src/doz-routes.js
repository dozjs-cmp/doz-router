const {REGEX, STORE_NAME, PATH} = require('./constants');

module.exports = {
    store: STORE_NAME,
    autoCreateChildren: false,
    $currentView: null,
    $routes: {},
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
    $router(e) {
        //let url = location.hash.slice(1) || '/';
        let url = decodeURI(location.pathname);
        console.log(e)
        if (this.$routes.hasOwnProperty(url)) {
            this.$setView(this.$routes[url]);
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
        window.addEventListener('popstate', ()=> this.$router());
        window.addEventListener('DOMContentLoaded', ()=> this.$router());
        //window.addEventListener('hashchange', ()=> this.$router());
        //window.addEventListener('load', ()=> this.$router());
    }
};