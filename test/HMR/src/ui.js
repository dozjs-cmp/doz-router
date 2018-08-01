import {component} from 'doz'
import DozRouter from '../../../'
import './cmp/about-page'
import './cmp/contact-page'
import './cmp/extension-page'
import './cmp/home-page'
import './cmp/navigate-buttons'
import './cmp/not-found-page'
import './cmp/profile-page'
import './cmp/search-page'
import './cmp/section-page'
import './cmp/user-details-page'
import './cmp/user-page'

component('doz-router', DozRouter);

component('app-ui', {
    template() {
        return `
            <nav>
                <a router-link href="/">Home</a>
                <a router-link href="/about">About</a>
                <a router-link href="/profile/me">Profile</a>
                <a router-link href="/profile.html">.html</a>
                <a router-link href="/user/">User</a>
                <a router-link href="/search/?t=hello">Search hello</a>
                <a router-link href="/search/?t=ciao">Search ciao</a>
                <a router-link href="/contact">Contact</a>
                <a router-link href="/not-found-page-bla-bla">Not found</a>
                <a router-link href="/section/1">Section 1</a>
                <a router-link href="/section/2">Section 2</a>
                <a router-link href="/section/3">Section 3</a>
                <a router-link href="/section/4">Section 4</a>
            </nav>
            <navigate-buttons></navigate-buttons>
            <div class="container">
                <doz-router d:id="router">
                    <home-page route="/"></home-page>
                    <about-page route="/about"></about-page>
                    <contact-page route="/contact"></contact-page>
                    <extension-page route="/profile.html"></extension-page>
                    <profile-page route="/profile/me"></profile-page>
                    <search-page route="/search"></search-page>
                    <user-page route="/user/"></user-page>
                    <user-details-page route="/user/:id"></user-details-page>
                    <not-found-page route="*"></not-found-page>
                    <section-page route="/section/:id" preserve></section-page>
                </doz-router>
            </div>
        `
    }
});

if (module.hot) {
    module.hot.dispose(function () {

    })
}
