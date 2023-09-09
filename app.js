import Doz from 'doz';
import DozRouter from "./index.js";

Doz.component('home-page', {
    template(h) {
        return h`
                <div>I'm home page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('about-page', {
    template(h) {
        return h`
                <div>I'm about page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('extension-page', {
    template(h) {
        return h`
                <div>I'm .html page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('contact-page', {
    template(h) {
        return h`
                <div>I'm contact page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('profile-page', {
    template(h) {
        return h`
                <div>I'm profile me page</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('user-details-page', {
    template(h) {
        return h`
                <div>I'm user page with id "${this.props.id}", <a href="javascript:history.back()">back</a></div>
            `
    },
    onCreate() {
        this.props.id = this.router.param('id');
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('search-page', {
    template(h) {
        return h`
                <div>I'm search page with query "${this.props.query}"</div>
            `
    },
    onCreate() {
        this.props.query = this.router.query('t');
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('user-page', {
    template(h) {
        return h`
                <div>I'm user page index, <a href="#/user/10">show id 10</a></div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('section-page', {
    template(h) {
        let id = this.router.param('id');
        return h`
                <div>I'm section page index ${id}</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('wild-page', {
    template(h) {
        let currentPath = this.router.currentPath();
        return h`
                <div>I'm wild page: ${currentPath}</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('not-found-page', {
    template(h) {
        return h`
                <div>404 page not found</div>
            `
    },
    onCreate() {
        console.log(this.tag, 'created')
    },
    onDestroy() {
        console.log(this.tag, 'destroyed')
    }
});

Doz.component('other-buttons', {
    template(h) {
        return h`
                <div style="color: #fff; margin: 20px">Navigate by "navigate" method</div>
                <div>
                    <button onclick="${() => this.router.navigate('/about')}">About</button>
                    <button onclick="${() => this.router.navigate('/profile/me')}">Profile</button>
                    <button onclick="${() => this.router.navigate('/search/?t=hello')}">Search hello</button>
                </div>
                <div style="color: #fff; margin: 20px">Path</div>
                <div>
                    <button onclick="${() => alert(this.router.currentPath())}">Get current path</button>
                </div>
            `
    }
});

class Main extends Doz.Component {
    template(h){
        return h`
            <nav>
                <a data-router-link href="/">Home</a>
                <a data-router-link href="/about">About</a>
                <a data-router-link href="/profile/me">Profile</a>
                <a data-router-link href="/profile.html">.html</a>
                <a data-router-link href="/user/">User</a>
                <a data-router-link href="/search/?t=hello">Search hello</a>
                <a data-router-link href="/search/?t=ciao">Search ciao</a>
                <a data-router-link href="/contact">Contact</a>
                <a data-router-link href="/not-found-page-bla-bla">Not found</a>
                <a data-router-link href="/section/1">Section 1</a>
                <a data-router-link href="/section/2">Section 2</a>
                <a data-router-link href="/section/3">Section 3</a>
                <a data-router-link href="/section/4">Section 4</a>
                <a data-router-link href="/wild/">Wild card *</a>
                <a data-router-link href="/wild/sub-path">Wild card sub-path</a>
            </nav>
            <other-buttons></other-buttons>
            <div class="container">
                <${DozRouter}>
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
                    <wild-page route="/wild/*" preserve></wild-page>
                </>
            </div>
        `
    }
}

Doz.appCreate('#app', Main)