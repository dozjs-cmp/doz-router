import DozRouter from '../src'
import be from 'bejs'

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
    '<div-1 route="/"></div-1>',
    '<div-2 route="/about/"></div-2>',
    '<div-3 route="/profile/me"></div-3>',
    '<div-4 route="/search/"></div-4>',
    '<div-8 route="/user/"></div-8>',
    '<div-5 route="/user/:id"></div-5>',
    '<div-6 route="/news/:id/:cat/title/"></div-6>',
    '<div-7 route="*"></div-7>',
];

describe('doz-router', function () {

    before(function () {
        this.jsdom = require('jsdom-global')();
        DozRouter.onCreate();
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
            DozRouter.$_navigate('/about/');
            be.err.true(document.getElementById('about').classList.contains('router-link-active'));
            DozRouter.$_navigate('/user/10');
            be.err.true(document.getElementById('user').classList.contains('router-link-active'));
            be.err.false(document.getElementById('about').classList.contains('router-link-active'));
        });
    });

    describe('$_navigate', function () {
        it('should be "/"', function () {
            DozRouter.$_navigate('/');
            be.err.equal(DozRouter.$_currentPath, '');
        });

        it('should be "/about/"', function () {
            DozRouter.$_navigate('/about/');
            be.err.equal(DozRouter.$_currentPath, 'about');
        });

        it('should be "/profile/me"', function () {
            DozRouter.$_navigate('/profile/me');
            be.err.equal(DozRouter.$_currentPath, 'profile/me');
        });

        it('should be "/search/?t=hello"', function () {
            DozRouter.$_navigate('/search/?a=hello&b=world');
            be.err.equal(DozRouter.$_query.a, 'hello');
            be.err.equal(DozRouter.$_query.b, 'world');
        });

        it('should be "/user/:id"', function () {
            DozRouter.$_navigate('/user/10');
            be.err.equal(DozRouter.$_param.id, '10');
        });

        it('should be pass id as param', function () {
            DozRouter.$_navigate('/user/', {id: 10});
            be.err.equal(DozRouter.$_param.id, 10);
        });

        it('should be "/news/:id/:cat/title/"', function () {
            DozRouter.$_navigate('/news/25/green/title/');
            be.err.equal(DozRouter.$_currentPath, 'news/25/green/title');
        });

        it('should be "/not-found"', function () {
            DozRouter.$_navigate('/not-found');
            be.err.equal(DozRouter.$_currentPath, null);
        });
    });
});
