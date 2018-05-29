const DozRoutes = require('../src/doz-routes');
const be = require('bejs');

// Mock
DozRoutes.mount = function () {
    return {
        destroy() {
        }
    }
};

DozRoutes.rawChildren = [
    '<div-1 d:route="/home"></div-1>',
    '<div-2 d:route="/about/"></div-2>',
    '<div-3 d:route="/profile/me"></div-3>',
    '<div-4 d:route="/user/:id"></div-4>',
    '<div-5 d:route="/news/:id/:cat/title/"></div-5>',
    '<div-6 d:route="*"></div-6>',
];

describe('doz-routes', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
        DozRoutes.onAppReady();
    });

    after(function () {
        this.jsdom()
    });

    beforeEach(function () {
        document.body.innerHTML = '';
    });

    describe('$trimHash', function () {
        it('should be remove last slash', function () {
            be.err.equal(DozRoutes.$trimHash('/hello/'), '/hello');
        });
    });

    describe('$setView', function () {
        it('should be ok', function () {
            DozRoutes.$setView('<div></div>');
        });
    });

    describe('$router', function () {
        it('should be "/home"', function () {
            location.hash = '/home';
            DozRoutes.$router();
            be.err.equal(DozRoutes.$currentPath, '/home');
        });

        it('should be "/about/"', function () {
            location.hash = '/about/';
            DozRoutes.$router();
            be.err.equal(DozRoutes.$currentPath, '/about');
        });

        it('should be "/profile/me"', function () {
            location.hash = '/profile/me';
            DozRoutes.$router();
            be.err.equal(DozRoutes.$currentPath, '/profile/me');
        });

        it('should be "/not-found"', function () {
            location.hash = '/not-found';
            DozRoutes.$router();
            be.err.equal(DozRoutes.$currentPath, null);
        });
    });
});
