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
    store: STORE_NAME,
    autoCreateChildren: false,
    $currentView: null,
    $currentPath: null,
    $routes: [],
    $route404: '',
    $query: '',
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
    $trimHash: function $trimHash(path) {
        return path.toString().replace(/\/$/, '');
    },
    $router: function $router() {
        var _this = this;

        var found = false;
        var path = location.hash.slice(1);
        var pathPart = path.split('?');
        path = this.$trimHash(pathPart[0]) || '/';
        this.$query = pathPart[1] || '';

        this.$routes.forEach(function (route) {

            var re = new RegExp(route.path + '$');
            var match = path.match(re);

            if (match) {
                found = true;
                _this.$currentPath = route.path;
                _this.$setView(route.view);
            }
        });

        if (!found) {
            this.$currentPath = null;
            this.$setView(this.$route404);
        }
    },
    onAppReady: function onAppReady() {
        var _this2 = this;

        this.rawChildren.forEach(function (item) {
            var route = item.match(REGEX.ROUTE);
            if (route) {
                if (route[1] === PATH.NOT_FOUND) {
                    _this2.$route404 = item;
                } else {
                    var path = _this2.$trimHash(route[1]);
                    _this2.$routes.push({ path: path, view: item });
                }
            }
        });
        window.addEventListener('hashchange', function () {
            return _this2.$router();
        });
        window.addEventListener('load', function () {
            return _this2.$router();
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
    },
    STORE_NAME: 'doz-routes'
};

/***/ })
/******/ ]);
}); 