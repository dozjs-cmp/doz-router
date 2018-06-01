const DozRoutes = require('../src/doz-routes');
const be = require('bejs');

// Mock
const navLink = `
    <nav>
        <a nav-link href="#/">Home</a> |
        <a id="about" nav-link href="#/about">About</a> |
        <a nav-link href="#/profile/me">Profile</a> |
        <a nav-link href="#/search/">Search</a> |
        <a id="user" nav-link href="#/user/10">User</a> |
        <a nav-link href="#/news/20/green/title">Category</a>
    </nav>
`;

DozRoutes.mount = function () {
    return {
        destroy() {
        }
    }
};

DozRoutes.rawChildren = [
    '<div-1 d:route="/"></div-1>',
    '<div-2 d:route="/about/"></div-2>',
    '<div-3 d:route="/profile/me"></div-3>',
    '<div-4 d:route="/search/"></div-4>',
    '<div-5 d:route="/user/:id"></div-5>',
    '<div-6 d:route="/news/:id/:cat/title/"></div-6>',
    '<div-7 d:route="*"></div-7>',
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

    describe('$setView', function () {
        it('should be ok', function () {
            DozRoutes.$setView('<div></div>');
        });
    });

    describe('on ready', function () {
        before(function () {
            document.body.innerHTML = navLink;
        });
        it('should be ok', function () {
            DozRoutes.onAppReady();
            DozRoutes.$navigate('/about/');
            be.err.true(document.getElementById('about').classList.contains('nav-link-active'));
            DozRoutes.$navigate('/user/10');
            be.err.true(document.getElementById('user').classList.contains('nav-link-active'));
            be.err.false(document.getElementById('about').classList.contains('nav-link-active'));
        });
    });

    describe('$navigate', function () {
        it('should be "/"', function () {
            DozRoutes.$navigate('/');
            be.err.equal(DozRoutes.$currentPath, '');
        });

        it('should be "/about/"', function () {
            DozRoutes.$navigate('/about/');
            be.err.equal(DozRoutes.$currentPath, 'about');
        });

        it('should be "/profile/me"', function () {
            DozRoutes.$navigate('/profile/me');
            be.err.equal(DozRoutes.$currentPath, 'profile/me');
        });

        it('should be "/search/?t=hello"', function () {
            DozRoutes.$navigate('/search/?a=hello&b=world');
            be.err.equal(DozRoutes.$query.a, 'hello');
            be.err.equal(DozRoutes.$query.b, 'world');
        });

        it('should be "/user/:id"', function () {
            DozRoutes.$navigate('/user/10');
            be.err.equal(DozRoutes.$param.id, '10');
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
