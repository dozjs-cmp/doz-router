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
        setTimeout(()=>{
            this.jsdom()
        },100);
    });

    beforeEach(function () {
        //document.body.innerHTML = '';
    });

    describe('$trimHash', function () {
        it('should be remove last slash', function () {
            be.err.equal(DozRoutes.$trimHash('/hello/'), 'hello');
        });
    });

    describe('$setView', function () {
        it('should be ok', function () {
            DozRoutes.$setView('<div></div>');
        });
    });

    describe('$navigate', function () {
        it('should be "/home"', function () {
            DozRoutes.$navigate('/home');
            be.err.equal(DozRoutes.$currentPath, 'home');
        });

        it('should be "/about/"', function () {
            DozRoutes.$navigate('/about/');
            be.err.equal(DozRoutes.$currentPath, 'about');
        });

        it('should be "/profile/me"', function () {
            DozRoutes.$navigate('/profile/me');
            be.err.equal(DozRoutes.$currentPath, 'profile/me');
        });

        it('should be "/user/:id"', function () {
            DozRoutes.$navigate('/user/10');
            be.err.equal(DozRoutes.$currentPath, 'user/10');
        });

        it('should be "/news/:id/:cat/title/"', function () {
            DozRoutes.$navigate('/news/25/green/title/');
            be.err.equal(DozRoutes.$currentPath, 'news/25/green/title');
        });

        it('should be "/not-found"', function () {
            DozRoutes.$navigate('/not-found');
            be.err.equal(DozRoutes.$currentPath, null);
        });
    });
});
