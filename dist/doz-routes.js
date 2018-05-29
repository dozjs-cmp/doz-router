// [DOZ-ROUTES]  Build version: 0.0.0  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DozRoutes", [], factory);
	else if(typeof exports === 'object')
		exports["DozRoutes"] = factory();
	else
		root["DozRoutes"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(1);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(2),
    REGEX = _require.REGEX,
    STORE_NAME = _require.STORE_NAME,
    PATH = _require.PATH;

module.exports = {
    props: {
        hash: '#!',
        mode: '',
        base: '/'
    },
    $routes: [],
    $config: function $config(options) {
        this.props.mode = options && options.mode && options.mode === 'history' && !!history.pushState ? 'history' : 'hash';
        this.props.base = options && options.base ? '/' + this.$clearSlashes(options.base) + '/' : '/';
        return this;
    },
    $getFragment: function $getFragment() {
        var fragment = '';
        if (this.props.mode === 'history') {
            fragment = this.$clearSlashes(decodeURI(location.pathname + location.search));
            fragment = fragment.replace(/\?(.*)$/, '');
            fragment = this.props.base !== '/' ? fragment.replace(this.props.base, '') : fragment;
        } else {
            var match = window.location.href.match(/#(.*)$/);
            fragment = match ? match[1] : '';
        }
        return this.$clearSlashes(fragment);
    },
    $clearSlashes: function $clearSlashes(path) {
        return path.toString().replace(/\/$/, '').replace(/^\//, '');
    },

    $add: function $add(re, view) {
        this.$routes.push({ re: re, view: view });
        return this;
    },
    $remove: function $remove(param) {
        for (var i = 0, r; i < this.$routes.length, r = this.$routes[i]; i++) {
            if (r.re.toString() === param.toString()) {
                this.$routes.splice(i, 1);
                return this;
            }
        }
        return this;
    },
    $flush: function $flush() {
        this.routes = [];
        this.props.mode = '';
        this.props.base = '/';
        return this;
    },
    $check: function $check(f) {
        var fragment = f || this.$getFragment();
        for (var i = 0; i < this.$routes.length; i++) {
            var match = fragment.match(this.$routes[i].re);
            if (match) {
                match.shift();
                this.$setView(this.$routes[i].view);
                return this;
            }
        }
        return this;
    },
    $listen: function $listen() {
        var _this = this;

        var current = this.$getFragment();
        var fn = function fn() {
            if (current !== _this.$getFragment()) {
                current = _this.$getFragment();
                _this.$check(current);
            }
        };
        clearInterval(this.$interval);
        this.$interval = setInterval(fn, 50);
        return this;
    },
    $navigate: function $navigate(path) {
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
    $removeCurrentView: function $removeCurrentView() {
        if (this.$currentView) {
            this.$currentView.destroy();
            this.$currentView = null;
        }
    },
    $setView: function $setView(view) {
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
    onAppReady: function onAppReady() {
        var _this2 = this;

        this.rawChildren.forEach(function (item) {
            var route = item.match(REGEX.ROUTE);
            if (route) {
                _this2.$add(route[1], item);
            }
        });

        setTimeout(function () {
            _this2.$navigate('/about');
        }, 100);
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

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    REGEX: {
        ROUTE: /d:route(?:\s+)?=(?:\s+)?"(.*)"/
    },
    PATH: {
        NOT_FOUND: '/*'
    },
    STORE_NAME: 'doz-routes'
};

/***/ })
/******/ ]);
}); 