// [DozRouter]  Build version: 1.6.4  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("doz"));
	else if(typeof define === 'function' && define.amd)
		define("DozRouter", ["doz"], factory);
	else if(typeof exports === 'object')
		exports["DozRouter"] = factory(require("doz"));
	else
		root["DozRouter"] = factory(root["Doz"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE__0__) {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _doz = __webpack_require__(0);

var _doz2 = _interopRequireDefault(_doz);

var _src = __webpack_require__(2);

var _src2 = _interopRequireDefault(_src);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// expose component to global scope
function register() {
    if (typeof window !== 'undefined') {
        _doz2.default.component('doz-router', _src2.default);
    }
}

register();

exports.default = _src2.default;


if (false) {}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _require = __webpack_require__(3),
    REGEX = _require.REGEX,
    PATH = _require.PATH,
    NS = _require.NS,
    PRERENDER = _require.PRERENDER,
    SSR = _require.SSR;

var queryToObject = __webpack_require__(4);
var clearPath = __webpack_require__(5);
var normalizePath = __webpack_require__(6);
var Doz = __webpack_require__(0);

function deprecate(prev, next) {
    console.warn('[DEPRECATION]', '"' + prev + '" is deprecated use "' + next + '" instead');
}

exports.default = {
    props: {
        hash: '#',
        classActiveLink: 'router-link-active',
        linkAttr: 'data-router-link',
        isLinkAttr: 'data-is-router-link',
        mode: 'hash',
        /**
         * Base root, works only in "history" mode
         */
        root: '/',
        initialRedirect: ''
    },

    autoCreateChildren: false,

    onCreate: function onCreate() {

        //custom properties
        this._currentView = null;
        this._currentViewRaw = '';
        this._currentFullPath = null;
        this._currentPath = null;
        this._routes = [];
        this._paramMap = {};
        this._param = {};
        this._routeNotFound = '';
        this._query = {};
        this._queryRaw = '';
        this._link = {};
        this._pauseHashListener = false;
        this._noDestroy = this.props.hasOwnProperty('noDestroy');
        this._noDestroyedInstances = {};

        if (typeof Doz.mixin === 'function') {
            Doz.mixin({
                router: this
            });
        }
    },

    /**
     * Remove current view
     */
    removeView: function removeView() {
        if (this._currentView) {
            if (this._noDestroy) {
                var noDestroyInstance = this._currentView.unmount();
                this._noDestroyedInstances[noDestroyInstance.rawChildren[0]] = noDestroyInstance;
            } else {
                this._currentView.destroy();
            }
            this._currentView = null;
        }
    },


    /**
     * Set current view
     * @param view {string} component string
     * @param [cb] {string} callback function name
     * @param [preserve] {boolean} preserve view
     */
    setView: function setView(view, cb, preserve) {

        var sameView = this._currentViewRaw === view;
        if (cb && sameView) {
            var childCmp = this._currentView.children[0];
            var cbFunc = childCmp[cb];
            if (typeof cbFunc === 'function') {
                cbFunc.call(childCmp, this);
            }
        } else if (preserve && sameView) {
            this._currentView.children[0].render();
        } else {
            this.removeView();
            this._currentView = this._noDestroy && this._noDestroyedInstances[view] ? this._noDestroyedInstances[view].mount() : this.mount(view);
        }
        this._currentViewRaw = view;
    },


    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     */
    query: function query(property) {
        return this._query[property];
    },


    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     */
    param: function param(property) {
        return this._param[property];
    },


    /**
     * Navigate route
     * @param path {string} path to navigate
     * @param [params] {object} optional params
     * @param [forceReplaceState] {boolean}
     */
    navigate: function navigate(path, params, forceReplaceState) {
        if (this.props.mode === 'history') {

            if (window[PRERENDER]) {
                history.pushState(path, null, normalizePath(window[PRERENDER].replace(location.origin, '') + path));
            } else {
                if (forceReplaceState) return history.replaceState(path, null, normalizePath(this.props.root + path));else history.pushState(path, null, normalizePath(this.props.root + path));
            }
            this._navigate(path, params);
        } else {
            this._pauseHashListener = true;
            window.location.href = this.props.hash + path;
            this._navigate(path, params);
            this._pauseHashListener = false;
        }
    },


    /**
     * Returns current path
     * @param full {boolean}
     * @returns {*}
     */
    currentPath: function currentPath() {
        var full = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        return full ? this._currentFullPath : this._currentPath;
    },


    /**
     * Get query url
     * @param property {string} property name
     * @returns {*}
     * @deprecated in favor of query
     */
    $query: function $query(property) {
        deprecate('$query', 'query');
        return this.query(property);
    },


    /**
     * Get param url
     * @param property {string} property name
     * @returns {*}
     * @deprecated in favor of param
     */
    $param: function $param(property) {
        deprecate('$param', 'param');
        return this.param(property);
    },


    /**
     * Navigate route
     * @param args
     * @deprecated in favor of navigate
     */
    $navigate: function $navigate() {
        deprecate('$navigate', 'navigate');

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        this.navigate.apply(this, args);
    },


    /**
     * Returns current path
     * @param args
     * @returns {*}
     */
    $currentPath: function $currentPath() {
        deprecate('$currentPath', 'currentPath');

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return this.currentPath.apply(this, args);
    },


    /**
     * Navigate route
     * @param path {string|null} path to navigate
     * @param [params] {object} optional params
     * @param [initial=false] {boolean}
     * @returns {boolean}
     * @ignore
     */
    _navigate: function _navigate(path, params) {
        var _this = this;

        var initial = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


        var found = false;
        var hashPath = window.location.hash.slice(this.props.hash.length);
        var historyPath = window.location.pathname + window.location.search;
        var fullPath = void 0;

        path = path || hashPath;

        if (this.props.mode === 'history') path = historyPath;

        if (!window[PRERENDER] && !window[SSR]) if ((path === '/' || path === '') && initial && this.props.initialRedirect) return this.navigate(this.props.initialRedirect);

        path = window[SSR] || path;

        if (window[PRERENDER]) {
            path = (location.origin + path).replace(window[PRERENDER], '');
        }

        path = this.electronFixer(path);

        fullPath = path;

        var pathPart = path.split('?');
        path = clearPath(pathPart[0]);

        if (this._currentFullPath === fullPath) return false;

        this._queryRaw = pathPart[1] || '';

        var re = void 0;

        if ((path === '/' || path === '') && initial && this.props.initialRedirect) {
            path = normalizePath(clearPath(this.props.root) + this.props.initialRedirect);
        }

        for (var i = 0; i < this._routes.length; i++) {
            var route = this._routes[i];

            if (route.path === '*') {
                if (path) {
                    re = new RegExp('.+');
                } else {
                    re = new RegExp('^$');
                }
            } else {
                re = new RegExp('^\/?' + route.path + '$');
            }

            var match = path.match(re);

            if (match) {
                found = true;

                if (params && (typeof params === 'undefined' ? 'undefined' : _typeof(params)) === 'object') {
                    this._param = Object.assign({}, params);
                } else {
                    (function () {
                        var param = _this._paramMap[route.path];
                        _this._query = queryToObject(_this._queryRaw);
                        match.slice(1).forEach(function (value, i) {
                            _this._param[param[i]] = value;
                        });
                    })();
                }

                this._currentPath = path;
                this._currentFullPath = fullPath;
                this.setView(route.view, route.cb, route.preserve);

                break;
            }
        }

        if (!found) {
            this._currentPath = null;
            this._currentFullPath = null;
            this.setView(this._routeNotFound || '"' + path + '" not found');
        }

        this.activeLink();

        return found;
    },


    /**
     * Active current link
     */
    activeLink: function activeLink() {
        var _this2 = this;

        Object.keys(this._link).forEach(function (link) {
            var checkAlsoQuery = Boolean(_this2._link[link].length > 1 && _this2._queryRaw);

            _this2._link[link].forEach(function (el) {
                var queryEq = true;
                if (checkAlsoQuery) queryEq = new RegExp(_this2._queryRaw + '$', 'g').test(el.href);

                link = _this2.electronFixer(link);

                if (link === _this2._currentPath && queryEq) el.classList.add(_this2.props.classActiveLink);else el.classList.remove(_this2.props.classActiveLink);
            });
        });
    },
    electronFixer: function electronFixer(path) {
        if (location.protocol === 'file:' && path.includes(':')) path = path.substr(3);
        return path;
    },


    /**
     * Add a new route
     * @param route {string} route path
     * @param view {string} component string
     */
    add: function add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this._routeNotFound = view;
        } else {
            var param = [];
            var path = clearPath(route);
            path = path.replace(/:(\w+)/g, function (match, capture) {
                param.push(capture);
                return '([\\w-]+)';
            });

            // Wild card
            path = path.replace(/\/\*/g, '(?:/.*)?');
            this._paramMap[path] = param;

            /*
            let cbChange = view.match(REGEX.CHANGE);
            if (cbChange) {
                cbChange = cbChange[1]
            }
              const preserve = REGEX.IS_PRESERVE.test(view);
            */

            var cbChange = null;
            var preserve = false;

            if (typeof view === 'string') {
                cbChange = view.match(REGEX.CHANGE);
                preserve = REGEX.IS_PRESERVE.test(view);
            } else {
                cbChange = view.props['route-change'];
                preserve = view.props['preserve'];
            }

            if (cbChange) {
                cbChange = cbChange[1];
            }

            this._routes.push({ path: path, view: view, cb: cbChange, preserve: preserve });
        }
    },


    /**
     * Remove a route
     * @param path {string} route path
     */
    remove: function remove(path) {
        for (var i = 0; i < this._routes.length; i++) {
            var route = this._routes[i];
            if (route.path === clearPath(path)) {
                this._routes.splice(i, 1);
            }
        }
    },


    /**
     * Bind all link to routing controller
     */
    bindLink: function bindLink() {
        var _this3 = this;

        window.document.querySelectorAll('[' + this.props.linkAttr + ']:not([' + this.props.isLinkAttr + '])').forEach(function (el) {
            var path = el.pathname || el.href;

            el.dataset.isRouterLink = 'true';

            if (_this3.props.mode === 'history') {

                if (el.pathname) {
                    path = el.pathname = normalizePath(_this3.props.root + el.pathname);
                } else if (el.href) {
                    path = el.href = normalizePath(_this3.props.root + el.href);
                }

                var _path = path + el.search;

                if (window[PRERENDER]) {
                    //el.href = this.props.root + path + el.search;
                } else {
                    el.addEventListener('click', function (e) {
                        e.preventDefault();
                        history.pushState(_path, null, _path);
                        _this3._navigate(_path);
                    });
                }
            } else {
                el.href = _this3.props.hash + path + el.search;
            }

            var pathPart = path.split('?');
            path = clearPath(pathPart[0]);
            if (typeof _this3._link[path] === 'undefined') {
                _this3._link[path] = [el];
            } else {
                _this3._link[path].push(el);
            }
        });
    },
    onAppReady: function onAppReady() {
        var _this4 = this;

        window.removeEventListener('popstate', window[NS.popstate]);
        window[NS.popstate] = function (e) {
            var route = e.state;
            if (route == null && _this4.props.initialRedirect) return _this4.navigate(_this4.props.initialRedirect, {}, true);
            _this4._navigate(route);
        };

        window.removeEventListener('hashchange', window[NS.hashchange]);
        window[NS.hashchange] = function () {
            if (!_this4._pauseHashListener) _this4._navigate();
        };

        window.removeEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);
        window[NS.DOMContentLoaded] = function () {
            _this4._navigate(null, null, true);
        };

        console.log(this.rawChildrenObject);

        if (this.rawChildrenObject && this.rawChildrenObject.length) {
            this.rawChildrenObject.forEach(function (view) {
                var route = view.props.route;
                //console.log(route, view)
                if (route) {
                    _this4.add(route, view);
                }
            });
        } else {
            this.rawChildren.forEach(function (view) {
                var route = view.match(REGEX.ROUTE);
                if (route) {
                    _this4.add(route[1], view);
                }
            });
        }

        /*
        this.rawChildren.forEach(view => {
            const route = view.match(REGEX.ROUTE);
            if (route) {
                this.add(route[1], view)
            }
        });
        */
        /* console.log(this.rawChildren);
         console.log(this.parent);*/
        //console.log(this.parent._prev.children)
        //console.log(JSON.stringify(this.parent._prev.children, null, 4));

        this.bindLink();

        if (this.props.mode === 'history') {
            window.addEventListener('popstate', window[NS.popstate]);
        } else {
            window.addEventListener('hashchange', window[NS.hashchange]);
        }

        window.addEventListener('DOMContentLoaded', window[NS.DOMContentLoaded]);
    },
    onMountAsync: function onMountAsync() {
        this._navigate(null, null, true);
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
    REGEX: {
        ROUTE: /route(?:\s+)?=(?:\s+)?"(.*?)"/,
        CHANGE: /route-change(?:\s+)?=(?:\s+)?"(.*?)"/,
        IS_PRESERVE: /\spreserve[>\s=]/
    },
    PATH: {
        NOT_FOUND: '*'
    },
    NS: {
        hashchange: '___doz_router___hashchangeListener',
        popstate: '___doz_router___popstateListener',
        DOMContentLoaded: '___doz_router___DOMContentLoadedListener'
    },
    PRERENDER: '__DOZ_PRERENDER_PUBLIC_URL__',
    SSR: '__DOZ_SSR_PATH__'
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (query) {
    var obj = {};
    if (!query) return obj;
    var data = query.split('&');
    for (var i = 0, dataLength = data.length; i < dataLength; i++) {
        var dataPart = data[i].split('=');
        if (dataPart.length) {
            var first = dataPart.splice(0, 1)[0];
            obj[first] = decodeURIComponent(dataPart.join('='));
        }
    }

    return obj;
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
    return path.toString().replace(/\/+$/, '').replace(/^\//, '');
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
    return path.replace(/\/{2,}/g, '/');
};

/***/ })
/******/ ]);
}); 