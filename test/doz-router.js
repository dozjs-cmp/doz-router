const DozRouter = require('../src/doz-router');
const be = require('bejs');

// Mock
const navLink = `
    <nav>
        <a router-link href="/">Home</a> |
        <a id="about" router-link href="/about">About</a> |
        <a router-link href="/profile/me">Profile</a> |
        <a router-link href="/search/">Search</a> |
        <a id="user" router-link href="/user/10">User</a> |
        <a router-link href="/news/20/green/title">Category</a>
    </nav>
`;

DozRouter.mount = function () {
    return {
        destroy() {
        }
    }
};

DozRouter.rawChildren = [
    '<div-1 d:route="/"></div-1>',
    '<div-2 d:route="/about/"></div-2>',
    '<div-3 d:route="/profile/me"></div-3>',
    '<div-4 d:route="/search/"></div-4>',
    '<div-8 d:route="/user/"></div-8>',
    '<div-5 d:route="/user/:id"></div-5>',
    '<div-6 d:route="/news/:id/:cat/title/"></div-6>',
    '<div-7 d:route="*"></div-7>',
];

describe('doz-router', function () {

    this.timeout(5000);

    before(function () {
        this.jsdom = require('jsdom-global')();
        DozRouter.onAppReady();
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
            DozRouter.$setView('<div></div>');
        });
    });

    describe('on ready', function () {
        before(function () {
            document.body.innerHTML = navLink;
        });
        it('should be ok', function () {
            DozRouter.onAppReady();
            DozRouter.$navigate('/about/');
            be.err.true(document.getElementById('about').classList.contains('router-link-active'));
            DozRouter.$navigate('/user/10');
            be.err.true(document.getElementById('user').classList.contains('router-link-active'));
            be.err.false(document.getElementById('about').classList.contains('router-link-active'));
        });
    });

    describe('$navigate', function () {
        it('should be "/"', function () {
            DozRouter.$navigate('/');
            be.err.equal(DozRouter.$currentPath, '');
        });

        it('should be "/about/"', function () {
            DozRouter.$navigate('/about/');
            be.err.equal(DozRouter.$currentPath, 'about');
        });

        it('should be "/profile/me"', function () {
            DozRouter.$navigate('/profile/me');
            be.err.equal(DozRouter.$currentPath, 'profile/me');
        });

        it('should be "/search/?t=hello"', function () {
            DozRouter.$navigate('/search/?a=hello&b=world');
            be.err.equal(DozRouter.$query.a, 'hello');
            be.err.equal(DozRouter.$query.b, 'world');
        });

        it('should be "/user/:id"', function () {
            DozRouter.$navigate('/user/10');
            be.err.equal(DozRouter.$param.id, '10');
        });

        it('should be pass id as param', function () {
            DozRouter.$navigate('/user/', {id: 10});
            be.err.equal(DozRouter.$param.id, 10);
        });

        it('should be "/news/:id/:cat/title/"', function () {
            DozRouter.$navigate('/news/25/green/title/');
            be.err.equal(DozRouter.$currentPath, 'news/25/green/title');
        });

        it('should be "/not-found"', function () {
            DozRouter.$navigate('/not-found');
            be.err.equal(DozRouter.$currentPath, null);
        });
    });
});
