const {REGEX, STORE_NAME, PATH} = require('./constants');

module.exports = {
    props: {
        hash: '#!',
        mode: '',
        base: '/'
    },
    $routes: [],
    $config(options) {
        this.props.mode = options && options.mode && options.mode === 'history'
        && !!(history.pushState) ? 'history' : 'hash';
        this.props.base = options && options.base ? '/' + this.$clearSlashes(options.base) + '/' : '/';
        return this;
    },
    $getFragment() {
        let fragment = '';
        if (this.props.mode === 'history') {
            fragment = this.$clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.props.base !== '/' ? fragment.replace(this.props.base, '') : fragment;
        } else {
            let match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.$clearSlashes(fragment);
    },
    $clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },
    $add: function (re, view) {
        this.$routes.push({re, view});
        return this;
    },
    $remove(param) {
        for (let i = 0, r; i < this.$routes.length, r = this.$routes[i]; i++) {
            if (r.re.toString() === param.toString()) {
                this.$routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    $flush() {
        this.routes = [];
        this.props.mode = '';
        this.props.base = '/';
        return this;
    },
    $check(f) {
        let fragment = f || this.$getFragment();
        for (let i = 0; i < this.$routes.length; i++) {
            let match = fragment.match(this.$routes[i].re);
            if (match) {
                match.shift();
                this.$setView(this.$routes[i].view);
                return this;
            }
        }
        return this;
    },
    $listen() {
        let current = this.$getFragment();
        let fn = () => {
            if (current !== this.$getFragment()) {
                current = this.$getFragment();
                this.$check(current);
            }
        };
        clearInterval(this.$interval);
        this.$interval = setInterval(fn, 50);
        return this;
    },
    $navigate(path) {
        path = path ? path : '';
        if (this.props.mode === 'history') {
            history.pushState(null, null, this.props.base + this.$clearSlashes(path));
        } else {
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + path;
        }
        return this;
    },
    store: STORE_NAME,
    autoCreateChildren: false,
    $currentView: null,
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
    /*$router(e) {
        //let url = location.hash.slice(1) || '/';
        let path = decodeURI(location.pathname);
        console.log(location)
        if (this.$routes.hasOwnProperty(path)) {
            this.$setView(this.$routes[path]);
        } else if (this.$routes.hasOwnProperty(PATH.NOT_FOUND)) {
            this.$setView(this.$routes[PATH.NOT_FOUND]);
        } else {
            this.$removeCurrentView();
        }
    },*/
    onAppReady() {
        this.rawChildren.forEach(item => {
            const route = item.match(REGEX.ROUTE);
            if (route) {
                this.$add(route[1], item);
            }
        });

        setTimeout(()=>{
            this.$navigate('/about')
        },100);
       /* window.addEventListener('popstate', (e) => this.$router(e));
        window.addEventListener('DOMContentLoaded', (e) => this.$router(e));
        document.querySelectorAll('[nav-link]').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                let path = item.pathname;
                history.pushState(null, null, path)
            })
        });*/
        //window.addEventListener('hashchange', ()=> this.$router());
        //window.addEventListener('load', ()=> this.$router());
    }
};


