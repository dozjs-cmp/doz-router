module.exports = {
    $currentView: null,
    $routes: {},
    $REGEX: {
        ROUTE: /d:route(?:\s+)?=(?:\s+)?"(.*)"/
    },
    $removeCurrentView() {
        if (this.$currentView) {
            this.$currentView.destroy();
            this.$currentView = null;
        }
    },
    $router() {
        let url = location.hash.slice(1) || '/';
        if (this.$routes.hasOwnProperty(url)) {
            this.$removeCurrentView();
            this.$currentView = this.mount(this.$routes[url]);
        } else {
            this.$removeCurrentView();
        }
    },
    autoCreateChildren: false,
    onAppReady() {
        this.rawChildren.forEach(item => {
            const route = item.match(this.$REGEX.ROUTE);
            if (route) {
                this.$routes[route[1]] = item;
            }
        });
        window.addEventListener('hashchange', ()=> this.$router());
        window.addEventListener('load', ()=> this.$router());
    }
};