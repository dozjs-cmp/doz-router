// [DOZ-ROUTER]  Build version: 0.0.0  
 (function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("DozRouter", [], factory);
	else if(typeof exports === 'object')
		exports["DozRouter"] = factory();
	else
		root["DozRouter"] = factory();
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
    PATH = _require.PATH;

var queryToObject = __webpack_require__(3);
var clearPath = __webpack_require__(4);

module.exports = {
    props: {
        hash: '#',
        classActiveLink: 'nav-link-active',
        linkAttr: 'nav-link'
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
    $navigate: function $navigate(path) {
        var _this = this;

        var found = false;
        path = path || window.location.hash.slice(this.props.hash.length);
        var pathPart = path.split('?');
        path = clearPath(pathPart[0]);
        this.$queryRaw = pathPart[1] || '';

        for (var i = 0; i < this.$routes.length; i++) {
            var route = this.$routes[i];
            var re = new RegExp('^' + route.path + '$');
            var match = path.match(re);

            if (match) {
                var _ret = function () {
                    found = true;
                    var param = _this.$paramMap[route.path];
                    _this.$query = queryToObject(_this.$queryRaw);
                    match.slice(1).forEach(function (value, i) {
                        _this.$param[param[i]] = value;
                    });

                    _this.$currentPath = path;
                    _this.$setView(route.view);

                    return 'break';
                }();

                if (_ret === 'break') break;
            }
        }

        if (!found) {
            this.$currentPath = null;
            this.$setView(this.$routeNotFound);
        }

        this.$activeLink();
    },
    $activeLink: function $activeLink() {
        var _this2 = this;

        Object.keys(this.$link).forEach(function (link) {
            _this2.$link[link].forEach(function (el) {
                if (link === _this2.$currentPath) el.classList.add(_this2.props.classActiveLink);else el.classList.remove(_this2.props.classActiveLink);
            });
        });
    },
    $add: function $add(route, view) {
        if (route === PATH.NOT_FOUND) {
            this.$routeNotFound = view;
        } else {
            var param = [];
            var path = clearPath(route);
            path = path.replace(/:(\w+)/g, function (match, capture) {
                param.push(capture);
                return '([\\w-]+)';
            });
            this.$paramMap[path] = param;
            this.$routes.push({ path: path, view: view });
        }
    },
    $bindLink: function $bindLink() {
        var _this3 = this;

        document.querySelectorAll('[' + this.props.linkAttr + ']').forEach(function (el) {
            var path = el.pathname || el.href;
            var pathPart = path.split('?');
            el.href = _this3.props.hash + path + el.search;
            path = clearPath(pathPart[0]);
            if (typeof _this3.$link[path] === 'undefined') {
                _this3.$link[path] = [el];
            } else {
                _this3.$link[path].push(el);
            }
        });
    },
    onAppReady: function onAppReady() {
        var _this4 = this;

        this.rawChildren.forEach(function (view) {
            var route = view.match(REGEX.ROUTE);
            if (route) {
                _this4.$add(route[1], view);
            }
        });

        this.$bindLink();

        window.addEventListener('hashchange', function () {
            return _this4.$navigate();
        });
        window.addEventListener('load', function () {
            return _this4.$navigate();
        });
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
        NOT_FOUND: '*'
    }
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (query) {
    if (query) return JSON.parse('{"' + query.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === '' ? value : decodeURIComponent(value);
    });else return {};
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (path) {
    return path.toString().replace(/\/+$/, '').replace(/^\//, '');
};

/***/ })
/******/ ]);
}); 